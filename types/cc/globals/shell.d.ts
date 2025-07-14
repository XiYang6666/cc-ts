/**
 * The shell API provides access to CraftOS's command line interface.
 *
 * It allows you to start programs, add completion for a program, and much more.
 *
 * `shell` is not a "true" API. Instead, it is a standard program, which injects
 * its API into the programs that it launches. This allows for multiple shells
 * to run at the same time, but means that the API is not available in the
 * global environment, and so is unavailable to other APIs.
 *
 * ### Programs and the program path
 * When you run a command with the shell, either from the prompt or from Lua
 * code, the shell API performs several steps to work out which program to run:
 *
 * 1. Firstly, the shell attempts to resolve aliases. This allows us to use
 *    multiple names for a single command. For example, the `list` program has
 *    two aliases: `ls` and `dir`. When you write `ls /rom`, that's expanded to
 *    `list /rom`.
 *
 * 2. Next, the shell attempts to find where the program actually is. For this,
 *    it uses the program path. This is a colon separated list of directories,
 *    each of which is checked to see if it contains the program. `list` or
 *    `list.lua` doesn't exist in `.` (the current directory), so the shell now
 *    looks in `/rom/programs`, where `list.lua` can be found!
 *
 * 3. Finally, the shell reads the file and checks if the file starts with a
 *    `#!`. This is a hashbang, which says that this file shouldn't be treated
 *    as Lua, but instead passed to another program, the name of which should
 *    follow the `#!`.
 *
 * @changed 1.103.0 Added support for hashbangs.
 *
 * @noSelf
 */
declare namespace shell {
  /**
   * Run a program with the supplied arguments.
   *
   * Unlike {@link shell.run}, each argument is passed to the program verbatim.
   * While `shell.run("echo", "b c")` runs `echo` with `b` and `c`,
   * `shell.execute("echo", "b c")` runs `echo` with a single argument `b c`.
   *
   * @param command The program to execute.
   * @param args Arguments to this program.
   * @returns Whether the program exited successfully.
   * @example
   * - Run `paint my-image` from within your program:
   * ```ts
   * shell.execute("paint", "my-image");
   * ```
   * @changed 1.88.0 New in version 1.88.0
   */
  function execute(command: string, ...args: string[]): boolean;

  /**
   * Run a program with the supplied arguments.
   *
   * All arguments are concatenated together and then parsed as a command line.
   * As a result, `shell.run("program a b")` is the same as
   * `shell.run("program", "a", "b")`.
   *
   * @param args The program to run and its arguments.
   * @returns Whether the program exited successfully.
   * @example
   * - Run `paint my-image` from within your program:
   * ```ts
   * shell.run("paint", "my-image");
   * ```
   * @see {@link shell.execute} Run a program directly without parsing the
   * arguments.
   * @changed 1.80pr1 Programs now get their own environment instead of sharing
   * the same one.
   * @changed 1.83.0 `arg` is now added to the environment.
   */
  function run(...args: string[]): boolean;

  /**
   * Exit the current shell.
   *
   * This does not terminate your program, it simply makes the shell terminate
   * after your program has finished. If this is the toplevel shell, then the
   * computer will be shutdown.
   */
  function exit(): void;

  /**
   * Return the current working directory. This is what is displayed before the
   * `>` of the shell prompt, and is used by {@link shell.resolve} to handle
   * relative paths.
   *
   * @returns The current working directory.
   * @see {@link shell.setDir} To change the working directory.
   */
  function dir(): string;

  /**
   * Set the current working directory.
   *
   * @param dir The new working directory.
   * @throws If the path does not exist or is not a directory.
   * @example
   * - Set the working directory to "rom"
   * ```ts
   * shell.setDir("rom");
   * ```
   */
  function setDir(dir: string): void;

  /**
   * Get the path where programs are located.
   *
   * The path is composed of a list of directory names in a string, each
   * separated by a colon (`:`). On normal turtles will look in the current
   * directory (`.`), `/rom/programs` and `/rom/programs/turtle` folder, making
   * the path `.:/rom/programs:/rom/programs/turtle`.
   *
   * @returns The current shell's path.
   * @see {@link shell.setPath} To change the current path.
   */
  function path(): string;

  /**
   * Set the current program path.
   *
   * Be careful to prefix directories with a `/`. Otherwise they will be
   * searched for from the current directory, rather than the computer's root.
   *
   * @param path The new program path.
   * @changed 1.2 New in version 1.2
   */
  function setPath(path: string): void;

  /**
   * Resolve a relative path to an absolute path.
   *
   * The `fs` and `io` APIs work using absolute paths, and so we must convert
   * any paths relative to the current directory to absolute ones. This does
   * nothing when the path starts with `/`.
   *
   * @param path The path to resolve.
   * @returns The absolute path.
   * @example
   * - Resolve `startup.lua` when in the `rom` folder.
   * ```ts
   * shell.setDir("rom");
   * print(shell.resolve("startup.lua"));
   * // => rom/startup.lua
   * ```
   */
  function resolve(path: string): string;

  /**
   * Resolve a program, using the program path and list of aliases.
   *
   * @param command The name of the program.
   * @returns The absolute path to the program, or `undefined` if it could not
   * be found.
   * @example
   * - Locate the `hello` program.
   * ```ts
   * shell.resolveProgram("hello");
   * // => rom/programs/fun/hello.lua
   * ```
   * @changed 1.2 New in version 1.2
   * @changed 1.80pr1 Now searches for files with and without the `.lua`
   * extension.
   */
  function resolveProgram(command: string): string | undefined;

  /**
   * Return a list of all programs on the path.
   *
   * @param include_hidden Include hidden files. Namely, any which start with
   * `.`.
   * @returns A list of available programs.
   * @example
   * ```ts
   * textutils.tabulate(shell.programs());
   * ```
   * @changed 1.2 New in version 1.2
   */
  function programs(include_hidden?: boolean): string[];

  /**
   * Complete a shell command line.
   *
   * This accepts an incomplete command, and completes the program name or
   * arguments. For instance, `l` will be completed to `ls`, and `ls ro` will be
   * completed to `ls rom/`.
   *
   * Completion handlers for your program may be registered with
   * {@link shell.setCompletionFunction}.
   *
   * @param sLine The input to complete.
   * @returns The list of possible completions, or `undefined`.
   * @see {@link _G.read} For more information about completion.
   * @see {@link shell.completeProgram}
   * @see {@link shell.setCompletionFunction}
   * @see {@link shell.getCompletionInfo}
   * @changed 1.74 New in version 1.74
   */
  function complete(sLine: string): string[] | undefined;

  /**
   * Complete the name of a program.
   *
   * @param program The name of a program to complete.
   * @returns A list of possible completions.
   * @see {@link cc.shell.completion.program}
   */
  function completeProgram(program: string): string[];

  /**
   * A function used to provide auto-completion information for a program.
   *
   * The completion function accepts four arguments:
   * - The current shell. As completion functions are inherited, this is not
   *   guaranteed to be the shell you registered this function in.
   * - The index of the argument currently being completed.
   * - The current argument. This may be the empty string.
   * - A list of the previous arguments.
   *
   * For instance, when completing `pastebin put rom/st`, our `pastebin`
   * completion function will receive the shell API, an index of `2`, `rom/st`
   * as the current argument, and a "previous" table of `{ "put" }`. This
   * function may then wish to return a table containing `artup.lua`, indicating
   * the entire command should be completed to `pastebin put rom/startup.lua`.
   *
   * Your completion entries may also be followed by a space, if you wish to
   * indicate another argument is expected.
   *
   * @param shell The current shell API object.
   * @param index The index of the argument currently being completed (1-based).
   * @param argument The current argument string.
   * @param previous A list of the previous arguments.
   * @returns A list of possible completion candidates, or `undefined`.
   * @internal
   */
  type ShellCompletionFunction = (
    shell: typeof globalThis.shell,
    index: number,
    argument: string,
    previous: string[]
  ) => string[] | undefined;

  /**
   * Set the completion function for a program. When the program is entered on
   * the command line, this program will be called to provide auto-complete
   * information.
   *
   * @param program The path to the program. This should be an absolute path
   * without the leading `/`.
   * @param complete The completion function.
   * @see {@link cc.shell.completion} Various utilities to help with writing
   * completion functions.
   * @see {@link shell.complete}
   * @see {@link _G.read} For more information about completion.
   * @changed 1.74 New in version 1.74
   */
  function setCompletionFunction(
    program: string,
    complete: ShellCompletionFunction
  ): void;

  /**
   * Get a table containing all completion functions.
   *
   * This should only be needed when building custom shells. Use
   * {@link shell.setCompletionFunction} to add a completion function.
   *
   * @returns A table mapping the absolute path of programs, to their completion
   * functions.
   */
  function getCompletionInfo(): {
    [programPath: string]: { fnComplete: ShellCompletionFunction };
  };

  /**
   * Returns the path to the currently running program.
   *
   * @returns The absolute path to the running program.
   * @changed 1.3 New in version 1.3
   */
  function getRunningProgram(): string;

  /**
   * Add an alias for a program.
   *
   * @param command The name of the alias to add.
   * @param program The name or path to the program.
   * @example
   * - Alias `vim` to the `edit` program
   * ```ts
   * shell.setAlias("vim", "edit");
   * ```
   * @changed 1.2 New in version 1.2
   */
  function setAlias(command: string, program: string): void;

  /**
   * Remove an alias.
   *
   * @param command The alias name to remove.
   */
  function clearAlias(command: string): void;

  /**
   * Get the current aliases for this shell.
   *
   * Aliases are used to allow multiple commands to refer to a single program.
   * For instance, the `list` program is aliased to `dir` or `ls`. Running `ls`,
   * `dir` or `list` in the shell will all run the `list` program.
   *
   * @returns A table, where the keys are the names of aliases, and the values
   * are the path to the program.
   * @see {@link shell.setAlias}
   * @see {@link shell.resolveProgram} This uses aliases when resolving a
   * program name to an absolute path.
   */
  function aliases(): { [aliasName: string]: string };

  /**
   * Open a new multishell tab running a command.
   *
   * This behaves similarly to {@link shell.run}, but instead returns the
   * process index.
   *
   * > [!NOTE] This function is only available if the `multishell` API is.
   *
   * @param args The command line to run.
   * @returns The process index of the new tab.
   * @example
   * - Launch the Lua interpreter and switch to it.
   * ```ts
   * const id = shell.openTab("lua");
   * shell.switchTab(id);
   * ```
   * @see {@link shell.run}
   * @see {@link multishell.launch}
   * @changed 1.6 New in version 1.6
   */
  function openTab(...args: string[]): number;

  /**
   * Switch to the multishell tab with the given index.
   *
   * @param id The tab to switch to.
   * @see {@link multishell.setFocus}
   * @changed 1.6 New in version 1.6
   */
  function switchTab(id: number): void;
}
