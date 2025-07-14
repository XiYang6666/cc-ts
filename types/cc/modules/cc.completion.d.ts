/**
 * A collection of helper methods for working with input completion, such as
 * that require by _G.read.
 * @see {@link cc.shell.completion} For additional helpers to use with
 * shell.setCompletionexport function.
 * @changed 1.85.0 New in version 1.85.0
 *
 * @noSelf
 */
declare module "cc.completion" {
  /**
   * Complete from a choice of one or more strings.
   * @param text The input string to complete.
   * @param choices The list of choices to complete from.
   * @param add_space Whether to add a space after the completed item.
   * @returns A list of suffixes of matching strings.
   * @example
   * - Call _G.read, completing the names of various animals.
   * ```ts
   * import * as completion from "cc.completion";
   * const animals = ["dog", "cat", "lion", "unicorn"];
   * read(undefined, undefined, (text) => completion.choice(text, animals));
   * ```
   */
  export function choice(
    text: string,
    choices: string[],
    add_space?: boolean
  ): string[];

  /**
   * Complete the name of a currently attached peripheral.
   * @param text The input string to complete.
   * @param add_space Whether to add a space after the completed name.
   * @returns A list of suffixes of matching peripherals.
   * @example
   * ```ts
   * const completion = require("cc.completion");
   * read(undefined, undefined, completion.peripheral);
   * ```
   */
  export function peripheral(text: string, add_space?: boolean): string[];

  /**
   * Complete the side of a computer.
   * @param text The input string to complete.
   * @param add_space Whether to add a space after the completed side.
   * @returns A list of suffixes of matching sides.
   * @example
   * ```ts
   * const completion = require("cc.completion");
   * read(undefined, undefined, completion.side);
   * ```
   */
  export function side(text: string, add_space?: boolean): string[];

  /**
   * Complete a setting.
   * @param text The input string to complete.
   * @param add_space Whether to add a space after the completed settings.
   * @returns A list of suffixes of matching settings.
   * @example
   * ```ts
   * const completion = require("cc.completion");
   * read(undefined, undefined, completion.setting);
   * ```
   */
  export function setting(text: string, add_space?: boolean): string[];

  /**
   * Complete the name of a Minecraft command.
   * @param text The input string to complete.
   * @param add_space Whether to add a space after the completed command.
   * @returns A list of suffixes of matching commands.
   * @example
   * ```ts
   * const completion = require("cc.completion");
   * read(undefined, undefined, completion.command);
   * ```
   */
  export function command(text: string, add_space?: boolean): string[];
}