/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `mouse_scroll` event is fired when a mouse wheel is scrolled in the terminal.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_scroll"`:
   *            - `name`: The event name, which is `"mouse_scroll"`.
   *            - `direction`: The direction of the scroll.
   *              - `-1`: Up
   *              - `1`: Down
   *            - `x`: The X-coordinate of the mouse when scrolling.
   *            - `y`: The Y-coordinate of the mouse when scrolling.
   * @example
   * - Prints the direction of each scroll, and the position of the mouse at the time.
   * ```ts
   * while (true) {
   *   const [event, dir, x, y] = os.pullEvent("mouse_scroll");
   *   print(`The mouse was scrolled in direction ${dir} at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEvent(
    filter: "mouse_scroll"
  ): LuaMultiReturn<[name: string, direction: -1 | 1, x: number, y: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `mouse_scroll` event is fired when a mouse wheel is scrolled in the terminal.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_scroll"`:
   *            - `name`: The event name, which is `"mouse_scroll"`.
   *            - `direction`: The direction of the scroll.
   *              - `-1`: Up
   *              - `1`: Down
   *            - `x`: The X-coordinate of the mouse when scrolling.
   *            - `y`: The Y-coordinate of the mouse when scrolling.
   * @example
   * - Prints the direction of each scroll, and the position of the mouse at the time.
   * ```ts
   * while (true) {
   *   const [event, dir, x, y] = os.pullEventRaw("mouse_scroll");
   *   print(`The mouse was scrolled in direction ${dir} at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "mouse_scroll"
  ): LuaMultiReturn<[name: string, direction: -1 | 1, x: number, y: number]>;
}
