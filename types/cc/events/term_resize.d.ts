/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `term_resize` event is fired when the main terminal is resized. For instance:
   * > - When the tab bar is shown or hidden in multishell.
   * > - When the terminal is redirected to a monitor via the "monitor" program and the monitor is resized.
   * >
   * > When this event fires, some parts of the terminal may have been moved or deleted. Simple terminal programs (those not using `term.setCursorPos`) can ignore this event, but more complex GUI programs should redraw the entire screen.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"term_resize"`:
   *            - `name`: The event name, which is `"term_resize"`.
   * @example
   * - Print a message each time the terminal is resized.
   * ```ts
   * // Assuming 'term' namespace is available for terminal operations
   * declare namespace term {
   *   function getSize(): LuaMultiReturn<[width: number, height: number]>;
   * }
   *
   * while (true) {
   *   os.pullEvent("term_resize");
   *   const [w, h] = term.getSize();
   *   print(`The term was resized to (${w}, ${h})`);
   * }
   * ```
   * @see {@link term.getSize} To get the current terminal dimensions.
   * @see {@link term.setCursorPos} For programs that manage cursor position.
   */
  function pullEvent(filter: "term_resize"): LuaMultiReturn<[name: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `term_resize` event is fired when the main terminal is resized. For instance:
   * > - When the tab bar is shown or hidden in multishell.
   * > - When the terminal is redirected to a monitor via the "monitor" program and the monitor is resized.
   * >
   * > When this event fires, some parts of the terminal may have been moved or deleted. Simple terminal programs (those not using `term.setCursorPos`) can ignore this event, but more complex GUI programs should redraw the entire screen.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"term_resize"`:
   *            - `name`: The event name, which is `"term_resize"`.
   * @example
   * - Print a message each time the terminal is resized.
   * ```ts
   * // Assuming 'term' namespace is available for terminal operations
   * declare namespace term {
   *   function getSize(): LuaMultiReturn<[width: number, height: number]>;
   * }
   *
   * while (true) {
   *   os.pullEventRaw("term_resize");
   *   const [w, h] = term.getSize();
   *   print(`The term was resized to (${w}, ${h})`);
   * }
   * ```
   * @see {@link term.getSize} To get the current terminal dimensions.
   * @see {@link term.setCursorPos} For programs that manage cursor position.
   */
  function pullEventRaw(filter: "term_resize"): LuaMultiReturn<[name: string]>;
}
