/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `rednet_message` event is fired when a message is sent over Rednet.
   * > This event is usually handled by `rednet.receive`, but it can also be pulled manually.
   * > `rednet_message` events are sent by `rednet.run` in the top-level coroutine in response to `modem_message` events.
   * > A `rednet_message` event is always preceded by a `modem_message` event.
   * > They are generated inside CraftOS rather than being sent by the ComputerCraft machine.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"rednet_message"`:
   *            - `name`: The event name, which is `"rednet_message"`.
   *            - `senderId`: The ID of the sending computer.
   *            - `message`: The message sent.
   *            - `protocol`: The protocol of the message, if provided, otherwise `undefined`.
   * @example
   * - Prints a message when one is sent:
   * ```ts
   * while (true) {
   *   const [event, sender, message, protocol] = os.pullEvent("rednet_message");
   *   if (protocol !== undefined) {
   *     print(`Received message from ${sender} with protocol ${protocol} and message ${tostring(message)}`);
   *   } else {
   *     print(`Received message from ${sender} with message ${tostring(message)}`);
   *   }
   * }
   * ```
   * @see {@link modem_message} For raw modem messages sent outside of Rednet.
   * @see {@link rednet.receive} To wait for a Rednet message with an optional timeout and protocol filter.
   */
  function pullEvent(
    filter: "rednet_message"
  ): LuaMultiReturn<
    [name: string, senderId: number, message: any, protocol: string | undefined]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `rednet_message` event is fired when a message is sent over Rednet.
   * > This event is usually handled by `rednet.receive`, but it can also be pulled manually.
   * > `rednet_message` events are sent by `rednet.run` in the top-level coroutine in response to `modem_message` events.
   * > A `rednet_message` event is always preceded by a `modem_message` event.
   * > They are generated inside CraftOS rather than being sent by the ComputerCraft machine.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"rednet_message"`:
   *            - `name`: The event name, which is `"rednet_message"`.
   *            - `senderId`: The ID of the sending computer.
   *            - `message`: The message sent.
   *            - `protocol`: The protocol of the message, if provided, otherwise `undefined`.
   * @example
   * - Prints a message when one is sent:
   * ```ts
   * while (true) {
   *   const [event, sender, message, protocol] = os.pullEventRaw("rednet_message");
   *   if (protocol !== undefined) {
   *     print(`Received message from ${sender} with protocol ${protocol} and message ${tostring(message)}`);
   *   } else {
   *     print(`Received message from ${sender} with message ${tostring(message)}`);
   *   }
   * }
   * ```
   * @see {@link modem_message} For raw modem messages sent outside of Rednet.
   * @see {@link rednet.receive} To wait for a Rednet message with an optional timeout and protocol filter.
   */
  function pullEventRaw(
    filter: "rednet_message"
  ): LuaMultiReturn<
    [name: string, senderId: number, message: any, protocol: string | undefined]
  >;
}
