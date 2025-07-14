/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `disk` event is fired when a disk is inserted into an adjacent or networked disk drive.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"disk"`:
   *            - `name`: The event name, which is `"disk"`.
   *            - `side`: The side of the disk drive that had a disk inserted.
   * @example
   * - Prints a message when a disk is inserted:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEvent("disk");
   *   print(`Inserted a disk on side ${side}`);
   * }
   * ```
   * @see {@link os.pullEvent} filter "disk_eject" For the event sent when a disk is removed.
   */
  function pullEvent(
    filter: "disk"
  ): LuaMultiReturn<[name: string, side: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `disk` event is fired when a disk is inserted into an adjacent or networked disk drive.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"disk"`:
   *            - `name`: The event name, which is `"disk"`.
   *            - `side`: The side of the disk drive that had a disk inserted.
   * @example
   * - Prints a message when a disk is inserted:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEventRaw("disk");
   *   print(`Inserted a disk on side ${side}`);
   * }
   * ```
   * @see {@link os.pullEventRaw} filter "disk_eject" For the event sent when a disk is removed.
   */
  function pullEventRaw(
    filter: "disk"
  ): LuaMultiReturn<[name: string, side: string]>;
}
