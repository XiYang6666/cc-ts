/**
 * A collection of helper methods for working with shell completion.
 *
 * Most programs may be completed using the {@link build} helper method, rather
 * than manually switching on the argument index.
 *
 * Note, the helper functions within this module do not accept an argument
 * index, and so are not directly usable with the
 * {@link shell.setCompletionFunction}. Instead, wrap them using {@link build},
 * or your own custom function.
 *
 * @example
 * - Register a completion handler for `example.lua` which prompts for a choice of options, followed by a directory, and then multiple files.
 * ```ts
 * import * as completion from "cc.shell.completion";
 * // Assuming 'shell' and 'read' are available globally or imported from 'shell' and '_G' respectively.
 * declare const shell: any;
 * declare function read(...args: any[]): any;
 *
 * const complete = completion.build(
 *   Object.assign([completion.choice, ["get", "put"]], {}), // Example of passing arguments to choice
 *   completion.dir,
 *   Object.assign([completion.file], { many: true }) // Example of setting 'many' property
 * );
 * shell.setCompletionFunction("example.lua", complete);
 * read(undefined, undefined, shell.complete, "example ");
 * ```
 * @see {@link cc.completion} For more general helpers, suitable for use with
 * `_G.read`.
 * @see {@link shell.setCompletionFunction}
 * @changed 1.85.0 New in version 1.85.0
 *
 * @noSelf
 */
declare module "cc.shell.completion" {
  /**
   * A function that provides completion candidates for shell arguments.
   * @param shell The shell object.
   * @param text The current text to complete.
   * @param previous The shell arguments before this one.
   * @returns A list of completion candidates (suffixes of matching items).
   */
  type ShellCompletionFunction = (
    shell: unknown,
    text: string,
    previous: string[]
  ) => string[];

  /**
   * A tuple representing a completion function and its additional arguments for
   * `build`. The first element is the completion function, followed by any
   * additional arguments. If this table is the last argument to `build`, it may
   * also set the `many` key to `true`, which states this function should be
   * used to complete any remaining arguments.
   */
  type ShellCompletionTable = [ShellCompletionFunction, ...any[]] & {
    many?: boolean;
  };

  /**
   * An argument type for the `build` function.
   */
  type BuildArgument =
    | undefined
    | ShellCompletionFunction
    | ShellCompletionTable;

  /**
   * Complete the name of a file relative to the current working directory.
   * @param shell The shell we're completing in.
   * @param text Current text to complete.
   * @returns A list of suffixes of matching files.
   */
  export function file(shell: unknown, text: string): string[];

  /**
   * Complete the name of a directory relative to the current working directory.
   * @param shell The shell we're completing in.
   * @param text Current text to complete.
   * @returns A list of suffixes of matching directories.
   */
  export function dir(shell: unknown, text: string): string[];

  /**
   * Complete the name of a file or directory relative to the current working
   * directory.
   * @param shell The shell we're completing in.
   * @param text Current text to complete.
   * @param previous The shell arguments before this one.
   * @param add_space Whether to add a space after the completed item.
   * @returns A list of suffixes of matching files and directories.
   */
  export function dirOrFile(
    shell: unknown,
    text: string,
    previous: string[],
    add_space?: boolean
  ): string[];

  /**
   * Complete the name of a program.
   * @param shell The shell we're completing in.
   * @param text Current text to complete.
   * @returns A list of suffixes of matching programs.
   * @see {@link shell.completeProgram}
   */
  export function program(shell: unknown, text: string): string[];

  /**
   * Complete arguments of a program.
   * @param shell The shell we're completing in.
   * @param text Current text to complete.
   * @param previous The shell arguments before this one.
   * @param starting Which argument index this program and args start at.
   * @returns A list of suffixes of matching programs or arguments.
   * @changed 1.97.0 New in version 1.97.0
   */
  export function programWithArgs(
    shell: unknown,
    text: string,
    previous: string[],
    starting: number
  ): string[];

  /**
   * Wraps `help.completeTopic` as a build compatible function.
   */
  export const help: ShellCompletionFunction;

  /**
   * Wraps `cc.completion.choice` as a build compatible function.
   */
  export const choice: ShellCompletionFunction;

  /**
   * Wraps `cc.completion.peripheral` as a build compatible function.
   */
  export const peripheral: ShellCompletionFunction;

  /**
   * Wraps `cc.completion.side` as a build compatible function.
   */
  export const side: ShellCompletionFunction;

  /**
   * Wraps `cc.completion.setting` as a build compatible function.
   */
  export const setting: ShellCompletionFunction;

  /**
   * Wraps `cc.completion.command` as a build compatible function.
   */
  export const command: ShellCompletionFunction;

  /**
   * A helper function for building shell completion arguments.
   *
   * This accepts a series of single-argument completion functions, and combines
   * them into a function suitable for use with
   * {@link shell.setCompletionFunction}.
   *
   * @param args Every argument to `build` represents an argument to the program
   *             you wish to complete. Each argument can be one of three types:
   *             - `undefined`: This argument will not be completed. - A
   *             function: This argument will be completed with the given
   *             function. It is called with the shell object, the string to
   *             complete and the arguments before this one. - A table (tuple):
   *             This acts as a more powerful version of the function case. The
   *             table must have a function as the first item - this will be
   *             called with the shell, string and preceding arguments as above,
   *             but also followed by any additional items in the table. This
   *             provides a more convenient interface to pass options to your
   *             completion functions. If this table is the last argument, it
   *             may also set the `many` key to `true`, which states this
   *             function should be used to complete any remaining arguments.
   * @returns A combined completion function.
   */
  export function build(...args: BuildArgument[]): ShellCompletionFunction;
}
