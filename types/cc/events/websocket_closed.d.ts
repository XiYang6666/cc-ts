/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `websocket_closed` event is fired when an open WebSocket connection is closed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_closed"`:
   *            - `name`: The event name, which is `"websocket_closed"`.
   *            - `url`: The URL of the WebSocket that was closed.
   *            - `reason`: The server-provided reason the websocket was closed. This will be `nil` if the connection was closed abnormally.
   *            - `code`: The connection close code, indicating why the socket was closed. This will be `nil` if the connection was closed abnormally.
   * @example
   * - Prints a message when a WebSocket is closed (this may take a minute):
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * const ws = http.websocket(myURL)
   * let event: string, url: string
   * while (true) {
   *     [event, url] = os.pullEvent("websocket_closed")
   *     if (url === myURL) break
   * }
   * print(`The WebSocket at ${url} was closed.`)
   * ```
   */
  function pullEvent(
    filter: "websocket_closed"
  ): LuaMultiReturn<
    [
      name: string,
      url: string,
      reason: string | undefined,
      code: number | undefined
    ]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `websocket_closed` event is fired when an open WebSocket connection is closed.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_closed"`:
   *            - `name`: The event name, which is `"websocket_closed"`.
   *            - `url`: The URL of the WebSocket that was closed.
   *            - `reason`: The server-provided reason the websocket was closed. This will be `nil` if the connection was closed abnormally.
   *            - `code`: The connection close code, indicating why the socket was closed. This will be `nil` if the connection was closed abnormally.
   * @example
   * - Prints a message when a WebSocket is closed (this may take a minute):
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * const ws = http.websocket(myURL)
   * let event: string, url: string
   * while (true) {
   *     [event, url] = os.pullEventRaw("websocket_closed")
   *     if (url === myURL) break
   * }
   * print(`The WebSocket at ${url} was closed.`)
   * ```
   */
  function pullEventRaw(
    filter: "websocket_closed"
  ): LuaMultiReturn<
    [
      name: string,
      url: string,
      reason: string | undefined,
      code: number | undefined
    ]
  >;
}
