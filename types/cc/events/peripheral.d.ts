/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `peripheral` event is fired when a peripheral is attached on a side or to a modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"peripheral"`:
   *            - `name`: The event name, which is `"peripheral"`.
   *            - `side`: The side the peripheral was attached to.
   * @example
   * - Prints a message when a peripheral is attached:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEvent("peripheral");
   *   print(`A peripheral was attached on side ${side}`);
   * }
   * ```
   * @see {@link peripheral_detach} For the event fired when a peripheral is detached.
   */
  function pullEvent(
    filter: "peripheral"
  ): LuaMultiReturn<[name: string, side: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `peripheral` event is fired when a peripheral is attached on a side or to a modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"peripheral"`:
   *            - `name`: The event name, which is `"peripheral"`.
   *            - `side`: The side the peripheral was attached to.
   * @example
   * - Prints a message when a peripheral is attached:
   * ```ts
   * while (true) {
   *   const [event, side] = os.pullEventRaw("peripheral");
   *   print(`A peripheral was attached on side ${side}`);
   * }
   * ```
   * @see {@link peripheral_detach} For the event fired when a peripheral is detached.
   */
  function pullEventRaw(
    filter: "peripheral"
  ): LuaMultiReturn<[name: string, side: string]>;
}
