/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `websocket_message` event is fired when a message is received on an open WebSocket connection.
   * > This event is normally handled by {@link http.Websocket.receive}, but it can also be pulled manually.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_message"`:
   *            - `name`: The event name, which is `"websocket_message"`.
   *            - `url`: The URL of the WebSocket.
   *            - `message`: The contents of the message.
   *            - `isBinary`: Whether this is a binary message.
   * @example
   * - Prints a message sent by a WebSocket:
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * const ws = http.websocket(myURL)
   * ws.send("Hello!")
   * let event: string, url: string, message: string
   * while (true) {
   *     [event, url, message] = os.pullEvent("websocket_message")
   *     if (url === myURL) break
   * }
   * print(`Received message from ${url} with contents ${message}`)
   * ws.close()
   * ```
   */
  function pullEvent(
    filter: "websocket_message"
  ): LuaMultiReturn<
    [name: string, url: string, message: string, isBinary: boolean]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `websocket_message` event is fired when a message is received on an open WebSocket connection.
   * > This event is normally handled by {@link http.Websocket.receive}, but it can also be pulled manually.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_message"`:
   *            - `name`: The event name, which is `"websocket_message"`.
   *            - `url`: The URL of the WebSocket.
   *            - `message`: The contents of the message.
   *            - `isBinary`: Whether this is a binary message.
   * @example
   * - Prints a message sent by a WebSocket:
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * const ws = http.websocket(myURL)
   * ws.send("Hello!")
   * let event: string, url: string, message: string
   * while (true) {
   *     [event, url, message] = os.pullEventRaw("websocket_message")
   *     if (url === myURL) break
   * }
   * print(`Received message from ${url} with contents ${message}`)
   * ws.close()
   * ```
   */
  function pullEventRaw(
    filter: "websocket_message"
  ): LuaMultiReturn<
    [name: string, url: string, message: string, isBinary: boolean]
  >;
}
