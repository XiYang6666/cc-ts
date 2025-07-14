/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `disk_eject` event is fired when a disk is removed from an adjacent or networked disk drive.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"disk_eject"`:
   *            - `name`: The event name, which is `"disk_eject"`.
   *            - `side`: The side of the disk drive that had a disk removed.
   * @example
   * - Prints a message when a disk is removed:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEvent("disk_eject");
   *   print(`Removed a disk on side ${side}`);
   * }
   * ```
   * @see {@link disk} For the event sent when a disk is inserted.
   */
  function pullEvent(
    filter: "disk_eject"
  ): LuaMultiReturn<[name: string, side: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `disk_eject` event is fired when a disk is removed from an adjacent or networked disk drive.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"disk_eject"`:
   *            - `name`: The event name, which is `"disk_eject"`.
   *            - `side`: The side of the disk drive that had a disk removed.
   * @example
   * - Prints a message when a disk is removed:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEventRaw("disk_eject");
   *   print(`Removed a disk on side ${side}`);
   * }
   * ```
   * @see {@link disk} For the event sent when a disk is inserted.
   */
  function pullEventRaw(
    filter: "disk_eject"
  ): LuaMultiReturn<[name: string, side: string]>;
}
