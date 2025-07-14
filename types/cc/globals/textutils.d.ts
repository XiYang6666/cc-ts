/**
 * Helpful utilities for formatting and manipulating strings.
 * @changed 1.2 New in version 1.2
 * @noSelf
 */
declare namespace textutils {
  /**
   * Slowly writes string text at current cursor position, character-by-character.
   *
   * Like `_G.write`, this does not insert a newline at the end.
   *
   * @param text The the text to write to the screen
   * @param rate The number of characters to write each second. Defaults to 20.
   * @example
   * ```ts
   * textutils.slowWrite("Hello, world!");
   * textutils.slowWrite("Hello, world!", 5);
   * ```
   * @changed 1.3 New in version 1.3
   */
  function slowWrite(text: string, rate?: number): void;

  /**
   * Slowly prints string text at current cursor position, character-by-character.
   *
   * Like `print`, this inserts a newline after printing.
   *
   * @param sText The the text to write to the screen
   * @param nRate The number of characters to write each second. Defaults to 20.
   * @example
   * ```ts
   * textutils.slowPrint("Hello, world!");
   * textutils.slowPrint("Hello, world!", 5);
   * ```
   */
  function slowPrint(sText: string, nRate?: number): void;

  /**
   * Takes input time and formats it in a more readable format such as 6:30 PM.
   *
   * @param nTime The time to format, as provided by `os.time`.
   * @param bTwentyFourHour Whether to format this as a 24-hour clock (18:30) rather than a 12-hour one (6:30 AM).
   * @returns The formatted time
   * @example
   * - Print the current in-game time as a 12-hour clock.
   * ```ts
   * textutils.formatTime(os.time());
   * ```
   * @example
   * - Print the local time as a 24-hour clock.
   * ```ts
   * textutils.formatTime(os.time("local"), true);
   * ```
   */
  function formatTime(nTime: number, bTwentyFourHour?: boolean): string;

  /**
   * Prints a given string to the display.
   *
   * If the action can be completed without scrolling, it acts much the same as `print`;
   * otherwise, it will throw up a "Press any key to continue" prompt at the bottom of the display.
   * Each press will cause it to scroll down and write a single line more before prompting again, if need be.
   *
   * @param text The text to print to the screen.
   * @param free_lines The number of lines which will be automatically scrolled before the first prompt appears
   *                   (meaning `free_lines + 1` lines will be printed).
   *                   This can be set to the cursor's y position - 2 to always try to fill the screen.
   *                   Defaults to 0, meaning only one line is displayed before prompting.
   * @returns The number of lines printed.
   * @example
   * - Generates several lines of text and then prints it, paging once the bottom of the terminal is reached.
   * ```ts
   * const lines: string[] = [];
   * for (let i = 1; i <= 30; i++) {
   *   lines[i - 1] = `This is line #${i}`;
   * }
   * const message = table.concat(lines, "\n");
   *
   * const [width, height] = term.getCursorPos();
   * textutils.pagedPrint(message, height - 2);
   * ```
   */
  function pagedPrint(text: string, free_lines?: number): number;

  /**
   * Prints tables in a structured form.
   *
   * This accepts multiple arguments, either a table or a number.
   * When encountering a table, this will be treated as a table row, with each column width being auto-adjusted.
   *
   * When encountering a number, this sets the text color of the subsequent rows to it.
   *
   * @param args The rows and text colors to display.
   * @example
   * ```ts
   * textutils.tabulate(
   *   colors.orange, ["1", "2", "3"],
   *   colors.lightBlue, ["A", "B", "C"]
   * );
   * ```
   * @changed 1.3 New in version 1.3
   */
  function tabulate(...args: (string[] | number)[]): void;

  /**
   * Prints tables in a structured form, stopping and prompting for input should
   * the result not fit on the terminal.
   *
   * This functions identically to {@link textutils.tabulate}, but will prompt
   * for user input should the whole output not fit on the display.
   *
   * @param args The rows and text colors to display.
   * @example
   * - Generates a long table, tabulates it, and prints it to the screen.
   * ```ts
   * const rows: [string, number][] = [];
   * for (let i = 1; i <= 30; i++) {
   *   rows.push([`Row #${i}`, math.random(1, 400)]);
   * }
   *
   * textutils.pagedTabulate(colors.orange, ["Column", "Value"], colors.lightBlue, ...rows);
   * ```
   * @see {@link textutils.tabulate}
   * @see {@link textutils.pagedPrint}
   * @changed 1.3 New in version 1.3
   */
  function pagedTabulate(...args: (string[] | number)[]): void;

  /**
   * A table representing an empty JSON array, in order to distinguish it from
   * an empty JSON object.
   *
   * The contents of this table should not be modified.
   * @example
   * ```ts
   * textutils.serialiseJSON(textutils.empty_json_array);
   * ```
   * @see {@link textutils.serialiseJSON}
   * @see {@link textutils.unserialiseJSON}
   */
  const empty_json_array: object;

  /**
   * A table representing the JSON null value.
   *
   * The contents of this table should not be modified.
   * @example
   * ```ts
   * textutils.serialiseJSON(textutils.json_null);
   * ```
   * @see {@link textutils.serialiseJSON}
   * @see {@link textutils.unserialiseJSON}
   */
  const json_null: object;

  /**
   * Options for serialisation.
   * @internal
   */
  interface SerializeOptions {
    /**
     * Do not emit indentation and other whitespace between terms.
     */
    compact?: boolean;
    /**
     * Relax the check for recursive tables, allowing them to appear multiple
     * times (as long as tables do not appear inside themselves).
     */
    allow_repetitions?: boolean;
  }

  /**
   * Convert a Lua object into a textual representation, suitable for saving in
   * a file or pretty-printing.
   *
   * @param t The object to serialise.
   * @param opts Options for serialisation.
   * @returns The serialised representation.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a basic table.
   * ```ts
   * textutils.serialise({ 1, 2, 3, a: 1, ["another key"]: true });
   * ```
   * @example
   * - Demonstrates some of the other options
   * ```ts
   * const tbl = [1, 2, 3];
   * // print(textutils.serialise([tbl, tbl], { allow_repetitions: true }));
   * // print(textutils.serialise(tbl, { compact: true }));
   * ```
   * @see {@link cc.pretty.pretty_print} An alternative way to display a table,
   * often more suitable for pretty printing.
   * @changed 1.3 New in version 1.3
   * @changed 1.97.0 Added `opts` argument.
   */
  function serialize(t: any, opts?: SerializeOptions): string;

  /**
   * Convert a Lua object into a textual representation, suitable for saving in
   * a file or pretty-printing.
   *
   * @param t The object to serialise.
   * @param opts Options for serialisation.
   * @returns The serialised representation.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a basic table.
   * ```ts
   * textutils.serialise({ 1, 2, 3, a: 1, ["another key"]: true });
   * ```
   * @example
   * - Demonstrates some of the other options
   * ```ts
   * const tbl = [1, 2, 3];
   * // print(textutils.serialise([tbl, tbl], { allow_repetitions: true }));
   * // print(textutils.serialise(tbl, { compact: true }));
   * ```
   * @see {@link cc.pretty.pretty_print} An alternative way to display a table,
   * often more suitable for pretty printing.
   * @changed 1.3 New in version 1.3
   * @changed 1.97.0 Added `opts` argument.
   */
  function serialise(t: any, opts?: SerializeOptions): string; // Alias

  /**
   * Converts a serialised string back into a reassembled Lua object.
   *
   * This is mainly used together with {@link textutils.serialise}.
   *
   * @param s The serialised string to deserialise.
   * @returns The deserialised object.
   * @returns `undefined` If the object could not be deserialised.
   * @changed 1.3 New in version 1.3
   */
  function unserialize(s: string): any | undefined;

  /**
   * Converts a serialised string back into a reassembled Lua object.
   *
   * This is mainly used together with {@link textutils.serialise}.
   *
   * @param s The serialised string to deserialise.
   * @returns The deserialised object.
   * @returns `undefined` If the object could not be deserialised.
   * @changed 1.3 New in version 1.3
   */
  function unserialise(s: string): any | undefined; // Alias

  /**
   * Options for JSON serialisation.
   * @internal
   */
  interface SerializeJSONOptions {
    /**
     * Whether to produce NBT-style JSON (non-quoted keys) instead of standard
     * JSON.
     */
    nbt_style?: boolean;
    /**
     * Whether to treat strings as containing UTF-8 characters instead of using
     * the default 8-bit character set.
     */
    unicode_strings?: boolean;
    /**
     * Relax the check for recursive tables, allowing them to appear multiple
     * times (as long as tables do not appear inside themselves).
     */
    allow_repetitions?: boolean;
  }

  /**
   * Returns a JSON representation of the given data.
   *
   * This is largely intended for interacting with various functions from the
   * commands API, though may also be used in making http requests.
   *
   * Lua has a rather different data model to Javascript/JSON. As a result, some
   * Lua values do not serialise cleanly into JSON.
   * - Lua tables can contain arbitrary key-value pairs, but JSON only accepts
   *   arrays, and objects (which require a string key). When serialising a
   *   table, if it only has numeric keys, then it will be treated as an array.
   *   Otherwise, the table will be serialised to an object using the string
   *   keys. Non-string keys (such as numbers or tables) will be dropped.
   * - A consequence of this is that an empty table will always be serialised to
   *   an object, not an array. {@link textutils.empty_json_array} may be used
   *   to express an empty array.
   * - Lua strings are an a sequence of raw bytes, and do not have any specific
   *   encoding. However, JSON strings must be valid unicode. By default,
   *   non-ASCII characters in a string are serialised to their unicode code
   *   point (for instance, `"\xfe"` is converted to `"\u00fe"`). The
   *   `unicode_strings` option may be set to treat all input strings as UTF-8.
   * - Lua does not distinguish between missing keys (`undefined` in JS) and
   *   ones explicitly set to `null`. As a result `{ x = undefined }` is
   *   serialised to `{}`. {@link textutils.json_null} may be used to get an
   *   explicit `null` value (`{ x = textutils.json_null }` will serialise to
   *   `{"x": null}`).
   *
   * @param t The value to serialise. Like {@link textutils.serialise}, this
   * should not contain recursive tables or functions.
   * @param options Options for serialisation.
   * @returns The JSON representation of the input.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a simple object
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] });
   * ```
   * @example
   * - Serialise an object to a NBT-style string
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] }, { nbt_style: true });
   * ```
   * @see {@link textutils.json_null} Use to serialise a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialise a JSON empty
   * array.
   * @changed 1.7 New in version 1.7
   * @changed 1.106.0 Added options overload and `unicode_strings` option.
   * @changed 1.109.0 Added `allow_repetitions` option.
   */
  function serializeJSON(t: any, options?: SerializeJSONOptions): string;

  /**
   * Returns a JSON representation of the given data.
   *
   * This is largely intended for interacting with various functions from the
   * commands API, though may also be used in making http requests.
   *
   * Lua has a rather different data model to Javascript/JSON. As a result, some
   * Lua values do not serialise cleanly into JSON.
   * - Lua tables can contain arbitrary key-value pairs, but JSON only accepts
   *   arrays, and objects (which require a string key). When serialising a
   *   table, if it only has numeric keys, then it will be treated as an array.
   *   Otherwise, the table will be serialised to an object using the string
   *   keys. Non-string keys (such as numbers or tables) will be dropped.
   * - A consequence of this is that an empty table will always be serialised to
   *   an object, not an array. {@link textutils.empty_json_array} may be used
   *   to express an empty array.
   * - Lua strings are an a sequence of raw bytes, and do not have any specific
   *   encoding. However, JSON strings must be valid unicode. By default,
   *   non-ASCII characters in a string are serialised to their unicode code
   *   point (for instance, `"\xfe"` is converted to `"\u00fe"`). The
   *   `unicode_strings` option may be set to treat all input strings as UTF-8.
   * - Lua does not distinguish between missing keys (`undefined` in JS) and
   *   ones explicitly set to `null`. As a result `{ x = undefined }` is
   *   serialised to `{}`. {@link textutils.json_null} may be used to get an
   *   explicit `null` value (`{ x = textutils.json_null }` will serialise to
   *   `{"x": null}`).
   *
   * @param t The value to serialise. Like {@link textutils.serialise}, this
   * should not contain recursive tables or functions.
   * @param bNBTStyle Whether to produce NBT-style JSON (non-quoted keys)
   * instead of standard JSON.
   * @returns The JSON representation of the input.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a simple object
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] });
   * ```
   * @example
   * - Serialise an object to a NBT-style string
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] }, { nbt_style: true });
   * ```
   * @see {@link textutils.json_null} Use to serialise a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialise a JSON empty
   * array.
   * @changed 1.7 New in version 1.7
   * @changed 1.106.0 Added options overload and `unicode_strings` option.
   * @changed 1.109.0 Added `allow_repetitions` option.
   */
  function serializeJSON(t: any, bNBTStyle?: boolean): string;

  /**
   * Returns a JSON representation of the given data.
   *
   * This is largely intended for interacting with various functions from the
   * commands API, though may also be used in making http requests.
   *
   * Lua has a rather different data model to Javascript/JSON. As a result, some
   * Lua values do not serialise cleanly into JSON.
   * - Lua tables can contain arbitrary key-value pairs, but JSON only accepts
   *   arrays, and objects (which require a string key). When serialising a
   *   table, if it only has numeric keys, then it will be treated as an array.
   *   Otherwise, the table will be serialised to an object using the string
   *   keys. Non-string keys (such as numbers or tables) will be dropped.
   * - A consequence of this is that an empty table will always be serialised to
   *   an object, not an array. {@link textutils.empty_json_array} may be used
   *   to express an empty array.
   * - Lua strings are an a sequence of raw bytes, and do not have any specific
   *   encoding. However, JSON strings must be valid unicode. By default,
   *   non-ASCII characters in a string are serialised to their unicode code
   *   point (for instance, `"\xfe"` is converted to `"\u00fe"`). The
   *   `unicode_strings` option may be set to treat all input strings as UTF-8.
   * - Lua does not distinguish between missing keys (`undefined` in JS) and
   *   ones explicitly set to `null`. As a result `{ x = undefined }` is
   *   serialised to `{}`. {@link textutils.json_null} may be used to get an
   *   explicit `null` value (`{ x = textutils.json_null }` will serialise to
   *   `{"x": null}`).
   *
   * @param t The value to serialise. Like {@link textutils.serialise}, this
   * should not contain recursive tables or functions.
   * @param options Options for serialisation.
   * @returns The JSON representation of the input.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a simple object
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] });
   * ```
   * @example
   * - Serialise an object to a NBT-style string
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] }, { nbt_style: true });
   * ```
   * @see {@link textutils.json_null} Use to serialise a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialise a JSON empty
   * array.
   * @changed 1.7 New in version 1.7
   * @changed 1.106.0 Added options overload and `unicode_strings` option.
   * @changed 1.109.0 Added `allow_repetitions` option.
   */
  function serialiseJSON(t: any, options?: SerializeJSONOptions): string; // Alias

  /**
   * Returns a JSON representation of the given data.
   *
   * This is largely intended for interacting with various functions from the
   * commands API, though may also be used in making http requests.
   *
   * Lua has a rather different data model to Javascript/JSON. As a result, some
   * Lua values do not serialise cleanly into JSON.
   * - Lua tables can contain arbitrary key-value pairs, but JSON only accepts
   *   arrays, and objects (which require a string key). When serialising a
   *   table, if it only has numeric keys, then it will be treated as an array.
   *   Otherwise, the table will be serialised to an object using the string
   *   keys. Non-string keys (such as numbers or tables) will be dropped.
   * - A consequence of this is that an empty table will always be serialised to
   *   an object, not an array. {@link textutils.empty_json_array} may be used
   *   to express an empty array.
   * - Lua strings are an a sequence of raw bytes, and do not have any specific
   *   encoding. However, JSON strings must be valid unicode. By default,
   *   non-ASCII characters in a string are serialised to their unicode code
   *   point (for instance, `"\xfe"` is converted to `"\u00fe"`). The
   *   `unicode_strings` option may be set to treat all input strings as UTF-8.
   * - Lua does not distinguish between missing keys (`undefined` in JS) and
   *   ones explicitly set to `null`. As a result `{ x = undefined }` is
   *   serialised to `{}`. {@link textutils.json_null} may be used to get an
   *   explicit `null` value (`{ x = textutils.json_null }` will serialise to
   *   `{"x": null}`).
   *
   * @param t The value to serialise. Like {@link textutils.serialise}, this
   * should not contain recursive tables or functions.
   * @param bNBTStyle Whether to produce NBT-style JSON (non-quoted keys)
   * instead of standard JSON.
   * @returns The JSON representation of the input.
   * @throws If the object contains a value which cannot be serialised. This
   * includes functions and tables which appear multiple times.
   * @example
   * - Serialise a simple object
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] });
   * ```
   * @example
   * - Serialise an object to a NBT-style string
   * ```ts
   * textutils.serialiseJSON({ values: [1, "2", true] }, { nbt_style: true });
   * ```
   * @see {@link textutils.json_null} Use to serialise a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialise a JSON empty
   * array.
   * @changed 1.7 New in version 1.7
   * @changed 1.106.0 Added options overload and `unicode_strings` option.
   * @changed 1.109.0 Added `allow_repetitions` option.
   */
  function serialiseJSON(t: any, bNBTStyle?: boolean): string; // Alias

  /**
   * Options for JSON deserialisation.
   * @internal
   */
  interface UnserializeJSONOptions {
    /**
     * When `true`, this will accept stringified NBT strings, as produced by
     * many commands.
     */
    nbt_style?: boolean;
    /**
     * When `true`, `null` will be parsed as {@link textutils.json_null}, rather
     * than `undefined`.
     */
    parse_null?: boolean;
    /**
     * When `false`, empty arrays will be parsed as a new empty table (`{}`). By
     * default (or when this value is `true`), they are parsed as
     * {@link textutils.empty_json_array}.
     */
    parse_empty_array?: boolean;
  }

  /**
   * Converts a serialised JSON string back into a reassembled Lua object.
   *
   * This may be used with {@link textutils.serializeJSON}, or when
   * communicating with command blocks or web APIs.
   *
   * If a `null` value is encountered, it is converted into `undefined`. It can
   * be converted into {@link textutils.json_null} with the `parse_null` option.
   *
   * If an empty array is encountered, it is converted into
   * {@link textutils.empty_json_array}. It can be converted into a new empty
   * table with the `parse_empty_array` option.
   *
   * @param s The serialised string to deserialise.
   * @param options Options which control how this JSON object is parsed.
   * @returns The deserialised object.
   * @returns `LuaMultiReturn<[undefined, string | undefined]>` If the object
   * could not be deserialised, returns `undefined` and an optional message
   * describing why the JSON string is invalid.
   * @example
   * - Unserialise a basic JSON object
   * ```ts
   * textutils.unserialiseJSON('{"name": "Steve", "age": null}');
   * ```
   * @example
   * - Unserialise a basic JSON object, returning null values as `json_null`.
   * ```ts
   * textutils.unserialiseJSON('{"name": "Steve", "age": null}', { parse_null: true });
   * ```
   * @see {@link textutils.json_null} Use to serialize a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialize a JSON empty
   * array.
   * @changed 1.87.0 New in version 1.87.0
   * @changed 1.100.6 Added `parse_empty_array` option
   */
  function unserializeJSON(
    s: string,
    options?: UnserializeJSONOptions
  ): LuaMultiReturn<[any] | [undefined, reason: string]>;

  /**
   * Converts a serialised JSON string back into a reassembled Lua object.
   *
   * This may be used with {@link textutils.serializeJSON}, or when
   * communicating with command blocks or web APIs.
   *
   * If a `null` value is encountered, it is converted into `undefined`. It can
   * be converted into {@link textutils.json_null} with the `parse_null` option.
   *
   * If an empty array is encountered, it is converted into
   * {@link textutils.empty_json_array}. It can be converted into a new empty
   * table with the `parse_empty_array` option.
   *
   * @param s The serialised string to deserialise.
   * @param options Options which control how this JSON object is parsed.
   * @returns The deserialised object.
   * @returns `LuaMultiReturn<[undefined, string | undefined]>` If the object
   * could not be deserialised, returns `undefined` and an optional message
   * describing why the JSON string is invalid.
   * @example
   * - Unserialise a basic JSON object
   * ```ts
   * textutils.unserialiseJSON('{"name": "Steve", "age": null}');
   * ```
   * @example
   * - Unserialise a basic JSON object, returning null values as `json_null`.
   * ```ts
   * textutils.unserialiseJSON('{"name": "Steve", "age": null}', { parse_null: true });
   * ```
   * @see {@link textutils.json_null} Use to serialize a JSON null value.
   * @see {@link textutils.empty_json_array} Use to serialize a JSON empty
   * array.
   * @changed 1.87.0 New in version 1.87.0
   * @changed 1.100.6 Added `parse_empty_array` option
   */
  function unserialiseJSON(
    s: string,
    options?: UnserializeJSONOptions
  ): LuaMultiReturn<[any] | [undefined, reason: string]>; // Alias

  /**
   * Replaces certain characters in a string to make it safe for use in URLs or
   * POST data.
   *
   * @param str The string to encode
   * @returns The encoded string.
   * @example
   * ```ts
   * print("https://example.com/?view=" + textutils.urlEncode("some text&things"));
   * ```
   * @changed 1.31 New in version 1.31
   */
  function urlEncode(str: string): string;

  /**
   * Provides a list of possible completions for a partial Lua expression.
   *
   * If the completed element is a table, suggestions will have `.` appended to
   * them. Similarly, functions have `(` appended to them.
   *
   * @param sSearchText The partial expression to complete, such as a variable
   * name or table index.
   * @param tSearchTable The table to find variables in, defaulting to the
   *                     global environment (`_G`). The function also searches
   *                     the "parent" environment via the `__index` metatable
   *                     field.
   * @returns The (possibly empty) list of completions.
   * @example
   * ```ts
   * textutils.complete("pa", _ENV);
   * ```
   * @see {@link shell.setCompletionFunction}
   * @see {@link _G.read}
   * @changed 1.74 New in version 1.74
   */
  function complete(sSearchText: string, tSearchTable?: object): string[];
}
