/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `mouse_up` event is fired when a mouse button is released or a held mouse leaves the computer's terminal.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_up"`:
   *            - `name`: The event name, which is `"mouse_up"`.
   *            - `button`: The mouse button that was released.
   *            - `x`: The X-coordinate of the mouse.
   *            - `y`: The Y-coordinate of the mouse.
   * @example
   * - Prints the coordinates and button number whenever the mouse is released.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEvent("mouse_up");
   *   print(`The mouse button ${button} was released at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEvent(
    filter: "mouse_up"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `mouse_up` event is fired when a mouse button is released or a held mouse leaves the computer's terminal.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"mouse_up"`:
   *            - `name`: The event name, which is `"mouse_up"`.
   *            - `button`: The mouse button that was released.
   *            - `x`: The X-coordinate of the mouse.
   *            - `y`: The Y-coordinate of the mouse.
   * @example
   * - Prints the coordinates and button number whenever the mouse is released.
   * ```ts
   * while (true) {
   *   const [event, button, x, y] = os.pullEventRaw("mouse_up");
   *   print(`The mouse button ${button} was released at ${x}, ${y}`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "mouse_up"
  ): LuaMultiReturn<[name: string, button: number, x: number, y: number]>;
}
