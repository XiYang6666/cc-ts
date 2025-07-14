/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `mouse_drag` event is fired every time the mouse is moved while a mouse button is being held.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_drag"`:
   *            - `name`: The event name, which is `"mouse_drag"`.
   *            - `button`: The mouse button that is being pressed.
   *            - `x`: The X-coordinate of the mouse.
   *            - `y`: The Y-coordinate of the mouse.
   * @example
   * - Print the button and the coordinates whenever the mouse is dragged.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEvent("mouse_drag");
   *   print(`The mouse button ${button} was dragged at ${x}, ${y}`);
   * }
   * ```
   * @see {@link os.pullEvent} For `mouse_click` event.
   */
  function pullEvent(
    filter: "mouse_drag"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `mouse_drag` event is fired every time the mouse is moved while a mouse button is being held.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_drag"`:
   *            - `name`: The event name, which is `"mouse_drag"`.
   *            - `button`: The mouse button that is being pressed.
   *            - `x`: The X-coordinate of the mouse.
   *            - `y`: The Y-coordinate of the mouse.
   * @example
   * - Print the button and the coordinates whenever the mouse is dragged.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEventRaw("mouse_drag");
   *   print(`The mouse button ${button} was dragged at ${x}, ${y}`);
   * }
   * ```
   * @see {@link os.pullEventRaw} For `mouse_click` event.
   */
  function pullEventRaw(
    filter: "mouse_drag"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;
}
