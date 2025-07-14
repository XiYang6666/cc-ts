/**
 * Various utilities for working with strings and text.
 *
 * @see {@link textutils} For additional string related utilities.
 * @changed 1.95.0 New in version 1.95.0
 *
 * @noSelf
 */
declare module "cc.strings" {
  /**
   * Wraps a block of text, so that each line fits within the given width.
   *
   * This may be useful if you want to wrap text before displaying it to a
   * monitor or printer without using print.
   *
   * @param text The string to wrap.
   * @param width The width to constrain to, defaults to the width of the
   * terminal.
   * @returns The wrapped input string as a list of lines.
   * @example
   * - Wrap a string and write it to the terminal.
   * ```ts
   * // Assuming 'term' is available globally or imported.
   * declare const term: any;
   * term.clear();
   * const lines = require("cc.strings").wrap("This is a long piece of text", 10);
   * for (let i = 0; i < lines.length; i++) {
   *   term.setCursorPos(1, i + 1); // Lua arrays are 1-indexed, TS are 0-indexed. Adjust for display.
   *   term.write(lines[i]);
   * }
   * ```
   */
  export function wrap(text: string, width?: number): string[];

  /**
   * Makes the input string a fixed width. This either truncates it, or pads it
   * with spaces.
   *
   * @param line The string to normalise.
   * @param width The width to constrain to, defaults to the width of the
   * terminal.
   * @returns The string with a specific width.
   * @example
   * ```ts
   * require("cc.strings").ensure_width("a short string", 20);
   * ```
   * @example
   * ```ts
   * require("cc.strings").ensure_width("a rather long string which is truncated", 20);
   * ```
   */
  export function ensure_width(line: string, width?: number): string;

  /**
   * Split a string into parts, each separated by a deliminator.
   *
   * For instance, splitting the string "a b c" with the deliminator " ", would
   * return a table with three strings: "a", "b", and "c".
   *
   * By default, the deliminator is given as a Lua pattern. Passing `true` to
   * the `plain` argument will cause the deliminator to be treated as a literal
   * string.
   *
   * @param str The string to split.
   * @param deliminator The pattern to split this string on.
   * @param plain Treat the deliminator as a plain string, rather than a
   * pattern. Defaults to `false`.
   * @param limit The maximum number of elements in the returned list.
   * @returns The list of split strings.
   * @example
   * - Split a string into words.
   * ```ts
   * require("cc.strings").split("This is a sentence.", "%s+");
   * ```
   * @example
   * - Split a string by "-" into at most 3 elements.
   * ```ts
   * require("cc.strings").split("a-separated-string-of-sorts", "-", true, 3);
   * ```
   * @see {@link LuaTable.concat} To join strings together.
   * @changed 1.112.0 New in version 1.112.0
   */
  export function split(
    str: string,
    deliminator: string,
    plain?: boolean,
    limit?: number
  ): string[];
}
