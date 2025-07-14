/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `monitor_resize` event is fired when an adjacent or networked monitor's size is changed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"monitor_resize"`:
   *            - `name`: The event name, which is `"monitor_resize"`.
   *            - `side`: The side or network ID of the monitor that was resized.
   * @example
   * - Prints a message when a monitor is resized:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEvent("monitor_resize");
   *   print(`The monitor on side ${side} was resized.`);
   * }
   * ```
   */
  function pullEvent(
    filter: "monitor_resize"
  ): LuaMultiReturn<[name: string, side: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `monitor_resize` event is fired when an adjacent or networked monitor's size is changed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"monitor_resize"`:
   *            - `name`: The event name, which is `"monitor_resize"`.
   *            - `side`: The side or network ID of the monitor that was resized.
   * @example
   * - Prints a message when a monitor is resized:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEventRaw("monitor_resize");
   *   print(`The monitor on side ${side} was resized.`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "monitor_resize"
  ): LuaMultiReturn<[name: string, side: string]>;
}
