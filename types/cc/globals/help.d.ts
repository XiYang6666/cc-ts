/**
 * Find help files on the current computer.
 * @changed 1.2 New in version 1.2
 * 
 * @noSelf
 */
declare namespace help {
  /**
   * Returns a colon-separated list of directories where help files are searched
   * for. All directories are absolute.
   *
   * @returns The current help search path, separated by colons.
   * @see {@link help.setPath}
   */
  function path(): string;

  /**
   * Sets the colon-separated list of directories where help files are searched
   * for to `newPath`.
   *
   * @param newPath The new path to use.
   * @example
   * - Set help path to a single directory.
   * ```ts
   * help.setPath("/disk/help/");
   * ```
   * @example
   * - Append a new directory to the existing help path.
   * ```ts
   * help.setPath(help.path() + ":/myfolder/help/");
   * ```
   * @see {@link help.path}
   */
  function setPath(newPath: string): void;

  /**
   * Returns the location of the help file for the given topic.
   *
   * @param topic The topic to find.
   * @returns The path to the given topic's help file, or `undefined` if it
   * cannot be found.
   * @example
   * ```ts
   * help.lookup("disk");
   * ```
   * @changed 1.80pr1 Now supports finding `.txt` files.
   * @changed 1.97.0 Now supports finding Markdown files.
   */
  function lookup(topic: string): string | undefined;

  /**
   * Returns a list of topics that can be looked up and/or displayed.
   *
   * @returns A list of topics in alphabetical order.
   * @example
   * ```ts
   * help.topics();
   * ```
   */
  function topics(): string[];

  /**
   * Returns a list of topic endings that match the prefix. Can be used with
   * `read` to allow input of a help topic.
   *
   * @param prefix The prefix to match.
   * @returns A list of matching topics.
   * @changed 1.74 New in version 1.74
   */
  function completeTopic(prefix: string): string[];
}
