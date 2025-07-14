/**
 * A pretty printer for rendering data structures in an aesthetically pleasing
 * manner.
 *
 * In order to display something using `cc.pretty`, you build up a series of
 * documents. These behave a little bit like strings; you can concatenate them
 * together and then print them to the screen.
 *
 * However, documents also allow you to control how they should be printed.
 * There are several functions (such as {@link nest} and {@link group}) which
 * allow you to control the "layout" of the document. When you come to display
 * the document, the 'best' (most compact) layout is used.
 *
 * The structure of this module is based on A Prettier Printer.
 *
 * @example
 * - Print a table to the terminal
 * ```ts
 * import * as pretty from "cc.pretty";
 * pretty.pretty_print([1, 2, 3]);
 * ```
 * @example
 * - Build a custom document and display it
 * ```ts
 * import * as pretty from "cc.pretty";
 * pretty.print(pretty.group(pretty.concat(pretty.text("hello"), pretty.space_line, pretty.text("world"))));
 * ```
 * @changed 1.87.0 New in version 1.87.0
 *
 * @noSelf
 */
declare module "cc.pretty" {
  /**
   * A document containing formatted text, with multiple possible layouts.
   *
   * Documents effectively represent a sequence of strings in alternative
   * layouts, which we will try to print in the most compact form necessary.
   */
  interface Doc {}

  /**
   * An empty document.
   */
  export const empty: Doc;

  /**
   * A document with a single space in it.
   */
  export const space: Doc;

  /**
   * A line break. When collapsed with {@link group}, this will be replaced with
   * {@link empty}.
   */
  export const line: Doc;

  /**
   * A line break. When collapsed with {@link group}, this will be replaced with
   * {@link space}.
   */
  export const space_line: Doc;

  /**
   * Create a new document from a string.
   *
   * If your string contains multiple lines, {@link group} will flatten the
   * string into a single line, with spaces between each line.
   *
   * @param text The string to construct a new document with.
   * @param colour The colour this text should be printed with. If not given, we
   * default to the current colour.
   * @returns The document with the provided text.
   * @example
   * - Write some blue text.
   * ```ts
   * import * as pretty from "cc.pretty";
   * // Assuming 'colours' is available globally or imported from 'cc'
   * declare const colours: { blue: number };
   * pretty.print(pretty.text("Hello!", colours.blue));
   * ```
   */
  export function text(text: string, colour?: number): Doc;

  /**
   * Concatenate several documents together. This behaves very similar to string
   * concatenation.
   *
   * In Lua, this also supports the `..` operator. In TypeScript, use this
   * function directly.
   *
   * @param docs The documents to concatenate.
   * @returns The concatenated documents.
   * @example
   * ```ts
   * import * as pretty from "cc.pretty";
   * const doc1 = pretty.text("doc1");
   * const doc2 = pretty.text("doc2");
   * print(pretty.concat(doc1, " - ", doc2));
   * ```
   */
  export function concat(...docs: (Doc | string)[]): Doc;

  /**
   * Indent later lines of the given document with the given number of spaces.
   *
   * For instance, nesting the document
   * ```
   * foo
   * bar
   * ```
   * by two spaces will produce
   * ```
   * foo
   *   bar
   * ```
   *
   * @param depth The number of spaces with which the document should be
   * indented.
   * @param doc The document to indent.
   * @returns The nested document.
   * @example
   * ```ts
   * import * as pretty from "cc.pretty";
   * print(pretty.nest(2, pretty.text("foo\\nbar")));
   * ```
   */
  export function nest(depth: number, doc: Doc): Doc;

  /**
   * Builds a document which is displayed on a single line if there is enough
   * room, or as normal if not.
   *
   * @param doc The document to group.
   * @returns The grouped document.
   * @example
   * - Uses group to show things being displayed on one or multiple lines.
   * ```ts
   * import * as pretty from "cc.pretty";
   * const doc = pretty.group(pretty.concat(pretty.text("Hello"), pretty.space_line, pretty.text("World")));
   * print(pretty.render(doc, 5)); // On multiple lines
   * print(pretty.render(doc, 20)); // Collapsed onto one.
   * ```
   */
  export function group(doc: Doc): Doc;

  /**
   * Display a document on the terminal.
   *
   * @param doc The document to render.
   * @param ribbon_frac The maximum fraction of the width that we should write
   * in. Defaults to `0.6`.
   */
  export function write(doc: Doc, ribbon_frac?: number): void;

  /**
   * Display a document on the terminal with a trailing new line.
   *
   * @param doc The document to render.
   * @param ribbon_frac The maximum fraction of the width that we should write
   * in. Defaults to `0.6`.
   */
  export function print(doc: Doc, ribbon_frac?: number): void;

  /**
   * Render a document, converting it into a string.
   *
   * @param doc The document to render.
   * @param width The maximum width of this document. Note that long strings
   * will not be wrapped to fit this width - it is only used for finding the
   * best layout.
   * @param ribbon_frac The maximum fraction of the width that we should write
   * in. Defaults to `0.6`.
   * @returns The rendered document as a string.
   */
  export function render(
    doc: Doc,
    width?: number,
    ribbon_frac?: number
  ): string;

  /**
   * Pretty-print an arbitrary object, converting it into a document.
   *
   * This can then be rendered with {@link write} or {@link print}.
   *
   * @param obj The object to pretty-print.
   * @param options Controls how various properties are displayed.
   * @returns The object formatted as a document.
   * @example
   * - Display a table on the screen
   * ```ts
   * import * as pretty from "cc.pretty";
   * pretty.print(pretty.pretty([1, 2, 3]));
   * ```
   * @see {@link pretty_print} for a shorthand to prettify and print an object.
   * @changed 1.88.0 Added `options` argument.
   */
  export function pretty(obj: any, options?: PrettyPrintOptions): Doc;

  /**
   * Controls how various properties are displayed when pretty-printing.
   * @internal
   */
  interface PrettyPrintOptions {
    /**
     * Show the arguments to a function if known (false by default).
     */
    function_args?: boolean;
    /**
     * Show where the function was defined, instead of `function: xxxxxxxx`
     * (false by default).
     */
    function_source?: boolean;
  }

  /**
   * A shortcut for calling {@link pretty} and {@link print} together.
   *
   * @param obj The object to pretty-print.
   * @param options Controls how various properties are displayed.
   * @param ribbon_frac The maximum fraction of the width that we should write
   * in. Defaults to `0.6`.
   * @example
   * - Display a table on the screen.
   * ```ts
   * import * as pretty from "cc.pretty";
   * pretty.pretty_print([1, 2, 3]);
   * ```
   * @see {@link pretty}
   * @see {@link print}
   * @changed 1.99 New in version 1.99
   */
  export function pretty_print(
    obj: any,
    options?: PrettyPrintOptions,
    ribbon_frac?: number
  ): void;
}
