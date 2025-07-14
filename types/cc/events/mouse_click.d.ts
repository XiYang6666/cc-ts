/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `mouse_click` event is fired when the terminal is clicked with a mouse. This event is only fired on advanced computers (including advanced turtles and pocket computers).
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_click"`:
   *            - `name`: The event name, which is `"mouse_click"`.
   *            - `button`: The mouse button that was clicked.
   *              - `1`: Left button
   *              - `2`: Right button
   *              - `3`: Middle button
   *            - `x`: The X-coordinate of the click.
   *            - `y`: The Y-coordinate of the click.
   * @example
   * - Print the button and the coordinates whenever the mouse is clicked.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEvent("mouse_click");
   *   print(`The mouse button ${button} was pressed at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEvent(
    filter: "mouse_click"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `mouse_click` event is fired when the terminal is clicked with a mouse. This event is only fired on advanced computers (including advanced turtles and pocket computers).
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_click"`:
   *            - `name`: The event name, which is `"mouse_click"`.
   *            - `button`: The mouse button that was clicked.
   *              - `1`: Left button
   *              - `2`: Right button
   *              - `3`: Middle button
   *            - `x`: The X-coordinate of the click.
   *            - `y`: The Y-coordinate of the click.
   * @example
   * - Print the button and the coordinates whenever the mouse is clicked.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEventRaw("mouse_click");
   *   print(`The mouse button ${button} was pressed at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "mouse_click"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;
}
