/**
 * Multishell allows multiple programs to be run at the same time.
 *
 * When multiple programs are running, it displays a tab bar at the top of the
 * screen, which allows you to switch between programs. New programs can be
 * launched using the `fg` or `bg` programs, or using the `shell.openTab` and
 * {@link multishell.launch} functions.
 *
 * Each process is identified by its ID, which corresponds to its position in
 * the tab list. As tabs may be opened and closed, this ID is not constant over
 * a program's run. As such, be careful not to use stale IDs.
 *
 * As with `shell`, `multishell` is not a "true" API. Instead, it is a standard
 * program, which launches a shell and injects its API into the shell's
 * environment. This API is not available in the global environment, and so is
 * not available to APIs.
 * @changed 1.6 New in version 1.6
 *
 * @noSelf
 */
declare namespace multishell {
  /**
   * Get the currently visible process. This will be the one selected on the tab
   * bar.
   *
   * Note, this is different to {@link multishell.getCurrent}, which returns the
   * process which is currently executing.
   * @returns The currently visible process's index.
   * @see {@link multishell.setFocus}
   */
  function getFocus(): number;

  /**
   * Change the currently visible process.
   * @param n The process index to switch to.
   * @returns If the process was changed successfully. This will return `false`
   * if there is no process with this id.
   * @see {@link multishell.getFocus}
   */
  function setFocus(n: number): boolean;

  /**
   * Get the title of the given tab.
   *
   * This starts as the name of the program, but may be changed using
   * {@link multishell.setTitle}.
   * @param n The process index.
   * @returns The current process title, or `undefined` if the process doesn't
   * exist.
   */
  function getTitle(n: number): string | undefined;

  /**
   * Set the title of the given process.
   * @param n The process index.
   * @param title The new process title.
   * @example
   * - Change the title of the current process
   * ```ts
   * multishell.setTitle(multishell.getCurrent(), "Hello");
   * ```
   * @see {@link multishell.getTitle}
   */
  function setTitle(n: number, title: string): void;

  /**
   * Get the index of the currently running process.
   * @returns The currently running process.
   */
  function getCurrent(): number;

  /**
   * Start a new process, with the given environment, program and arguments.
   *
   * The returned process index is not constant over the program's run. It can
   * be safely used immediately after launching (for instance, to update the
   * title or switch to that tab). However, after your program has yielded, it
   * may no longer be correct.
   * @param tProgramEnv The environment to load the path under.
   * @param sProgramPath The path to the program to run.
   * @param args Additional arguments to pass to the program.
   * @returns The index of the created process.
   * @example
   * - Run the "hello" program, and set its title to "Hello!"
   * ```ts
   * const id = multishell.launch({}, "/rom/programs/fun/hello.lua");
   * multishell.setTitle(id, "Hello!");
   * ```
   * @see {@link os.run}
   */
  function launch(
    tProgramEnv: Record<string, any>,
    sProgramPath: string,
    ...args: any[]
  ): number;

  /**
   * Get the number of processes within this multishell.
   * @returns The number of processes.
   */
  function getCount(): number;
}
