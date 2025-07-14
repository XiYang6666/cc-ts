/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `monitor_touch` event is fired when an adjacent or networked Advanced Monitor is right-clicked.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"monitor_touch"`:
   *            - `name`: The event name, which is `"monitor_touch"`.
   *            - `side`: The side or network ID of the monitor that was touched.
   *            - `x`: The X coordinate of the touch, in characters.
   *            - `y`: The Y coordinate of the touch, in characters.
   * @example
   * - Prints a message when a monitor is touched:
   * ```ts
   * while (true) {
   *   const [event, side, x, y] = os.pullEvent("monitor_touch");
   *   print(`The monitor on side ${side} was touched at (${x}, ${y})`);
   * }
   * ```
   */
  function pullEvent(
    filter: "monitor_touch"
  ): LuaMultiReturn<[name: string, side: string, x: number, y: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `monitor_touch` event is fired when an adjacent or networked Advanced Monitor is right-clicked.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"monitor_touch"`:
   *            - `name`: The event name, which is `"monitor_touch"`.
   *            - `side`: The side or network ID of the monitor that was touched.
   *            - `x`: The X coordinate of the touch, in characters.
   *            - `y`: The Y coordinate of the touch, in characters.
   * @example
   * - Prints a message when a monitor is touched:
   * ```ts
   * while (true) {
   *   const [event, side, x, y] = os.pullEventRaw("monitor_touch");
   *   print(`The monitor on side ${side} was touched at (${x}, ${y})`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "monitor_touch"
  ): LuaMultiReturn<[name: string, side: string, x: number, y: number]>;
}
