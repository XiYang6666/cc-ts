/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `turtle_inventory` event is fired when a turtle's inventory is changed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"turtle_inventory"`:
   *            - `name`: The event name, which is `"turtle_inventory"`.
   * @example
   * - Prints a message when the inventory is changed:
   * ```ts
   * while (true) {
   *   os.pullEvent("turtle_inventory")
   *   print("The inventory was changed.")
   * }
   * ```
   */
  function pullEvent(
    filter: "turtle_inventory"
  ): LuaMultiReturn<[name: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `turtle_inventory` event is fired when a turtle's inventory is changed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"turtle_inventory"`:
   *            - `name`: The event name, which is `"turtle_inventory"`.
   * @example
   * - Prints a message when the inventory is changed:
   * ```ts
   * while (true) {
   *   os.pullEventRaw("turtle_inventory")
   *   print("The inventory was changed.")
   * }
   * ```
   */
  function pullEventRaw(
    filter: "turtle_inventory"
  ): LuaMultiReturn<[name: string]>;
}
