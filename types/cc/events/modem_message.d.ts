/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `modem_message` event is fired when a message is received on an open channel on any modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"modem_message"`:
   *            - `name`: The event name, which is `"modem_message"`.
   *            - `side`: The side of the modem that received the message (e.g., "left", "right", "front", "back", "top", "bottom").
   *            - `channel`: The channel that the message was sent on.
   *            - `replyChannel`: The reply channel set by the sender.
   *            - `message`: The message as sent by the sender. This can be of any Lua type.
   *            - `distance`: The distance between the sender and the receiver in blocks, or `undefined` if the message was sent between dimensions.
   * @example
   * - Wraps a modem peripheral, opens channel 0 for listening, and prints all received messages.
   * ```ts
   * // Assuming 'peripheral' is a global or imported module
   * const modem = peripheral.find("modem");
   * if (!modem) error("No modem attached", 0);
   *
   * // Assuming 'modem' has an 'open' method
   * modem.open(0);
   *
   * while (true) {
   *   const [event, side, channel, replyChannel, message, distance] = os.pullEvent("modem_message");
   *   print(`Message received on side ${side} on channel ${channel} (reply to ${replyChannel}) from ${distance} blocks away with message ${tostring(message)}`);
   * }
   * ```
   */
  function pullEvent(
    filter: "modem_message"
  ): LuaMultiReturn<
    [
      name: string,
      side: string,
      channel: number,
      replyChannel: number,
      message: any,
      distance: number | undefined
    ]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `modem_message` event is fired when a message is received on an open channel on any modem.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"modem_message"`:
   *            - `name`: The event name, which is `"modem_message"`.
   *            - `side`: The side of the modem that received the message (e.g., "left", "right", "front", "back", "top", "bottom").
   *            - `channel`: The channel that the message was sent on.
   *            - `replyChannel`: The reply channel set by the sender.
   *            - `message`: The message as sent by the sender. This can be of any Lua type.
   *            - `distance`: The distance between the sender and the receiver in blocks, or `undefined` if the message was sent between dimensions.
   * @example
   * - Wraps a modem peripheral, opens channel 0 for listening, and prints all received messages.
   * ```ts
   * // Assuming 'peripheral' is a global or imported module
   * const modem = peripheral.find("modem");
   * if (!modem) error("No modem attached", 0);
   *
   * // Assuming 'modem' has an 'open' method
   * modem.open(0);
   *
   * while (true) {
   *   const [event, side, channel, replyChannel, message, distance] = os.pullEventRaw("modem_message");
   *   print(`Message received on side ${side} on channel ${channel} (reply to ${replyChannel}) from ${distance} blocks away with message ${tostring(message)}`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "modem_message"
  ): LuaMultiReturn<
    [
      name: string,
      side: string,
      channel: number,
      replyChannel: number,
      message: any,
      distance: number | undefined
    ]
  >;
}
