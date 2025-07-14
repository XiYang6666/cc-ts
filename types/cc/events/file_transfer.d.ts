/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `file_transfer` event is queued when a user drags-and-drops a file on an open computer.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"file_transfer"`:
   *            - `name`: The event name, which is `"file_transfer"`.
   *            - `files`: The list of transferred files.
   * @example
   * - Waits for a user to drop files on top of the computer, then prints the list of files and the size of each file.
   * ```ts
   * const [_, files] = os.pullEvent("file_transfer");
   * for (const file of files.getFiles()) {
   *   // Seek to the end of the file to get its size, then go back to the beginning.
   *   const size = file.seek("end");
   *   file.seek("set", 0);
   *
   *   print(`${file.getName()} ${size}`);
   * }
   * ```
   * @example
   * - Save each transferred file to the computer's storage.
   * ```ts
   * const [_, files] = os.pullEvent("file_transfer");
   * for (const file of files.getFiles()) {
   *   const handle = fs.open(file.getName(), "wb");
   *   handle.write(file.readAll());
   *
   *   handle.close();
   *   file.close();
   * }
   * ```
   * @see {@link TransferredFiles}
   */
  function pullEvent(
    filter: "file_transfer"
  ): LuaMultiReturn<[name: string, files: TransferredFiles]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `file_transfer` event is queued when a user drags-and-drops a file on an open computer.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"file_transfer"`:
   *            - `name`: The event name, which is `"file_transfer"`.
   *            - `files`: The list of transferred files.
   * @example
   * - Waits for a user to drop files on top of the computer, then prints the list of files and the size of each file.
   * ```ts
   * const [_, files] = os.pullEventRaw("file_transfer");
   * for (const file of files.getFiles()) {
   *   // Seek to the end of the file to get its size, then go back to the beginning.
   *   const size = file.seek("end");
   *   file.seek("set", 0);
   *
   *   print(`${file.getName()} ${size}`);
   * }
   * ```
   * @example
   * - Save each transferred file to the computer's storage.
   * ```ts
   * const [_, files] = os.pullEventRaw("file_transfer");
   * for (const file of files.getFiles()) {
   *   const handle = fs.open(file.getName(), "wb");
   *   handle.write(file.readAll());
   *
   *   handle.close();
   *   file.close();
   * }
   * ```
   * @see {@link TransferredFiles}
   */
  function pullEventRaw(
    filter: "file_transfer"
  ): LuaMultiReturn<[name: string, files: TransferredFiles]>;

  /**
   * A list of files that have been transferred to this computer.
   *
   * @noSelf
   */
  interface TransferredFiles {
    /**
     * All the files that are being transferred to this computer.
     * @returns The list of files.
     */
    getFiles(): TransferredFile[];
  }

  /**
   * A binary file handle that has been transferred to this computer.
   *
   * This inherits all methods of binary file handles, meaning you can use the standard read functions to access the contents of the file.
   *
   * @see {@link fs.ReadHandle}
   *
   * @noSelf
   */
  interface TransferredFile extends fs.ReadHandle {
    /**
     * Get the name of this file being transferred.
     * @returns The file's name.
     */
    getName(): string;
  }
}
