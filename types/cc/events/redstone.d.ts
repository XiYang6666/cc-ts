/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `redstone` event is fired whenever any redstone inputs on the computer or relay change.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"redstone"`:
   *            - `name`: The event name, which is `"redstone"`.
   * @example
   * - Prints a message when a redstone input changes:
   * ```ts
   * while (true) {
   *   os.pullEvent("redstone");
   *   print("A redstone input has changed!");
   * }
   * ```
   * @see The redstone API on computers
   * @see The redstone_relay peripheral
   */
  function pullEvent(filter: "redstone"): LuaMultiReturn<[name: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `redstone` event is fired whenever any redstone inputs on the computer or relay change.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"redstone"`:
   *            - `name`: The event name, which is `"redstone"`.
   * @example
   * - Prints a message when a redstone input changes:
   * ```ts
   * while (true) {
   *   os.pullEventRaw("redstone");
   *   print("A redstone input has changed!");
   * }
   * ```
   * @see The redstone API on computers
   * @see The redstone_relay peripheral
   */
  function pullEventRaw(filter: "redstone"): LuaMultiReturn<[name: string]>;
}
