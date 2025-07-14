/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `peripheral_detach` event is fired when a peripheral is detached from a side or from a modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"peripheral_detach"`:
   *            - `name`: The event name, which is `"peripheral_detach"`.
   *            - `side`: The side the peripheral was detached from.
   * @example
   * - Prints a message when a peripheral is detached:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEvent("peripheral_detach");
   *   print(`A peripheral was detached on side ${side}`);
   * }
   * ```
   * @see {@link peripheral} For the event fired when a peripheral is attached.
   */
  function pullEvent(
    filter: "peripheral_detach"
  ): LuaMultiReturn<[name: string, side: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `peripheral_detach` event is fired when a peripheral is detached from a side or from a modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"peripheral_detach"`:
   *            - `name`: The event name, which is `"peripheral_detach"`.
   *            - `side`: The side the peripheral was detached from.
   * @example
   * - Prints a message when a peripheral is detached:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEventRaw("peripheral_detach");
   *   print(`A peripheral was detached on side ${side}`);
   * }
   * ```
   * @see {@link peripheral} For the event fired when a peripheral is attached.
   */
  function pullEventRaw(
    filter: "peripheral_detach"
  ): LuaMultiReturn<[name: string, side: string]>;
}
