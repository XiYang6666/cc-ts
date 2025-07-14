/**
 * Emulates Lua's standard io library.
 *
 * @noSelf
 */
declare namespace io {
  /**
   * A file handle representing the "standard input". Reading from this file
   * will prompt the user for input.
   */
  const stdin: Handle;

  /**
   * A file handle representing the "standard output". Writing to this file will
   * display the written text to the screen.
   */
  const stdout: Handle;

  /**
   * A file handle representing the "standard error" stream.
   *
   * One may use this to display error messages, writing to it will display them
   * on the terminal.
   */
  const stderr: Handle;

  /**
   * Closes the provided file handle.
   *
   * @param file The file handle to close. If omitted, defaults to the current
   * output file.
   * @returns `true` if the handle was successfully closed.
   * @returns `LuaMultiReturn<[undefined, string]>` If the handle could not be
   * closed, returns `undefined` and the reason.
   * @throws If the handle was already closed.
   * @see {@link Handle.close}
   * @see {@link io.output}
   * @changed 1.55 New in version 1.55
   */
  function close(file?: Handle): LuaMultiReturn<[true] | [undefined, string]>;

  /**
   * Flushes the current output file.
   *
   * @see {@link Handle.flush}
   * @see {@link io.output}
   * @changed 1.55 New in version 1.55
   */
  function flush(): void;

  /**
   * Get or set the current input file.
   *
   * @param file The new input file, either as a file path or pre-existing
   * handle. If omitted, returns the current input file.
   * @returns The current input file.
   * @throws If the provided filename cannot be opened for reading.
   * @changed 1.55 New in version 1.55
   */
  function input(file?: Handle | string): Handle;

  /**
   * Opens the given file name in read mode and returns an iterator that, each
   * time it is called, returns a new line from the file.
   *
   * This can be used in a for loop to iterate over all lines of a file.
   *
   * Once the end of the file has been reached, `undefined` will be returned.
   * The file is automatically closed.
   *
   * If no file name is given, the current input will be used instead. In this
   * case, the handle is not used.
   *
   * @param filename The name of the file to extract lines from. If omitted,
   * uses the current input file.
   * @param formats The arguments to pass to {@link Handle.read} for each line.
   * @returns The line iterator function.
   * @throws If the file cannot be opened for reading.
   * @example
   * - Iterate over every line in a file and print it out.
   * ```ts
   * for (const line of io.lines("/rom/help/intro.txt")) {
   *   print(line);
   * }
   * ```
   * @see {@link Handle.lines}
   * @see {@link io.input}
   * @changed 1.55 New in version 1.55
   */
  function lines(
    filename?: string,
    ...formats: IoReadFormat[]
  ): LuaIterable<string | undefined>;

  /**
   * Open a file with the given mode, either returning a new file handle or
   * `undefined`, plus an error message.
   *
   * The mode string can be any of the following:
   * - `"r"`: Read mode.
   * - `"w"`: Write mode.
   * - `"a"`: Append mode.
   * - `"r+"`: Update mode (allows reading and writing), all data is preserved.
   * - `"w+"`: Update mode, all data is erased.
   *
   * The mode may also have a `b` at the end, which opens the file in "binary
   * mode". This has no impact on functionality.
   *
   * @param filename The name of the file to open.
   * @param mode The mode to open the file with. This defaults to `"r"`.
   * @returns The opened file handle.
   * @returns `LuaMultiReturn<[undefined, string]>` In case of an error, returns
   * `undefined` and the reason the file could not be opened.
   * @changed 1.111.0 Add support for r+ and w+.
   */
  function open(
    filename: string,
    mode?: string
  ): LuaMultiReturn<[Handle] | [undefined, string]>;

  /**
   * Get or set the current output file.
   *
   * @param file The new output file, either as a file path or pre-existing
   * handle. If omitted, returns the current output file.
   * @returns The current output file.
   * @throws If the provided filename cannot be opened for writing.
   * @changed 1.55 New in version 1.55
   */
  function output(file?: Handle | string): Handle;

  /**
   * Read from the currently opened input file.
   *
   * This is equivalent to `io.input():read(...)`. See the documentation there
   * for full details.
   *
   * @param formats The formats to read, defaulting to a whole line (`"l"`).
   * @returns The data read, or `undefined` if nothing can be read.
   */
  function read(
    ...formats: IoReadFormat[]
  ): LuaMultiReturn<IoReadReturns<typeof formats>>;

  /**
   * Checks whether handle is a given file handle, and determine if it is open
   * or not.
   *
   * @param obj The value to check.
   * @returns `"file"` if this is an open file, `"closed file"` if it is a
   * closed file handle, or `undefined` if not a file handle.
   */
  function type(obj: any): "file" | "closed file" | undefined;

  /**
   * Write to the currently opened output file.
   *
   * This is equivalent to `io.output():write(...)`. See the documentation there
   * for full details.
   *
   * @param values The strings to write.
   * @returns The current file handle, allowing chained calls.
   * @returns `LuaMultiReturn<[undefined, string]>` If the file could not be
   * written to, returns `undefined` and the error message.
   * @changed 1.81.0 Multiple arguments are now allowed.
   */
  function write(
    ...values: (string | number)[]
  ): LuaMultiReturn<[Handle] | [undefined, string]>;

  /**
   * A file handle which can be read or written to.
   */
  interface Handle {
    /**
     * Close this file handle, freeing any resources it uses.
     *
     * @returns `true` If this handle was successfully closed.
     * @returns `LuaMultiReturn<[undefined, string]>` If this file handle could
     * not be closed, returns `undefined` and the reason.
     * @throws If this handle was already closed.
     */
    close(): LuaMultiReturn<[true] | [undefined, string]>;

    /**
     * Flush any buffered output, forcing it to be written to the file.
     * @throws If the handle has been closed.
     */
    flush(): void;

    /**
     * Returns an iterator that, each time it is called, returns a new line from
     * the file.
     *
     * This can be used in a for loop to iterate over all lines of a file.
     *
     * Once the end of the file has been reached, `undefined` will be returned.
     * The file is not automatically closed.
     *
     * @param formats The arguments to pass to {@link Handle.read} for each
     * line.
     * @returns The line iterator function.
     * @throws If the file cannot be opened for reading.
     * @example
     * - Iterate over every line in a file and print it out.
     * ```ts
     * const file = io.open("/rom/help/intro.txt");
     * if (file) {
     *   for (const line of file.lines()) {
     *     print(line);
     *   }
     *   file.close();
     * }
     * ```
     * @see {@link io.lines}
     * @changed 1.3 New in version 1.3
     */
    lines(
      ...formats: IoReadFormat[]
    ): LuaIterator<string | undefined, undefined>;

    /**
     * Reads data from the file, using the specified formats. For each format
     * provided, the function returns either the data read, or `undefined` if no
     * data could be read.
     *
     * The following formats are available:
     * - `"l"`: Returns the next line (without a newline on the end).
     * - `"L"`: Returns the next line (with a newline on the end).
     * - `"a"`: Returns the entire rest of the file.
     * - `"n"`: Returns a number (not implemented in CC).
     *
     * These formats can be preceded by a `*` to make it compatible with Lua
     * 5.1.
     *
     * If no format is provided, `"l"` is assumed.
     *
     * @param formats The formats to use.
     * @returns The data read from the file.
     */
    read(
      ...formats: IoReadFormat[]
    ): LuaMultiReturn<IoReadReturns<typeof formats>>;

    /**
     * Seeks the file cursor to the specified position, and returns the new
     * position.
     *
     * `whence` controls where the seek operation starts, and is a string that
     * may be one of these three values:
     * - `"set"`: base position is 0 (beginning of the file)
     * - `"cur"`: base is current position
     * - `"end"`: base is end of file
     *
     * The default value of `whence` is `"cur"`, and the default value of
     * `offset` is `0`. This means that `file:seek()` without arguments returns
     * the current position without moving.
     *
     * @param whence The place to set the cursor from. Defaults to `"cur"`.
     * @param offset The offset from the start to move to. Defaults to `0`.
     * @returns The new location of the file cursor.
     */
    seek(whence?: "set" | "cur" | "end", offset?: number): number;

    /**
     * Sets the buffering mode for an output file.
     *
     * > [!DEPRECATED] This has no effect in CC.
     *
     * This has no effect under ComputerCraft, and exists with compatibility
     * with base Lua.
     *
     * @param mode The buffering mode.
     * @param size The size of the buffer.
     * @see
     * {@link https://www.lua.org/manual/5.1/manual.html#pdf-file:setvbuf Lua's documentation for setvbuf.}
     */
    setvbuf(mode: string, size?: number): void;

    /**
     * Write one or more values to the file.
     *
     * @param values The values to write.
     * @returns The current file, allowing chained calls.
     * @returns `LuaMultiReturn<[undefined, string]>` If the file could not be
     * written to, returns `undefined` and the error message.
     * @changed 1.81.0 Multiple arguments are now allowed.
     */
    write(
      ...values: (string | number)[]
    ): LuaMultiReturn<[Handle] | [undefined, string]>;
  }

  /**
   * Helper type for `io.read` and `Handle.read` formats.
   *
   * @internal
   */
  type IoReadFormat = "l" | "L" | "a"; // | "n"; // "n" is not implemented in CC.

  /**
   * Helper type for the return type of `io.read` and `Handle.read` based on a
   * single format.
   *
   * @internal
   */
  type IoReadReturn<T extends IoReadFormat> = T extends "l" | "L" | "a"
    ? string | undefined
    : T extends "n"
    ? number | undefined
    : never;

  /**
   * Helper type for the tuple return type of `io.read` and `Handle.read` when
   * multiple formats are provided.
   *
   * @internal
   */
  type IoReadReturns<T extends IoReadFormat[]> = {
    [K in keyof T]: IoReadReturn<T[K]> | undefined;
  };
}
