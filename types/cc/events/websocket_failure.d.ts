/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `websocket_failure` event is fired when a WebSocket connection request fails.
   * > This event is normally handled inside {@link http.websocket}, but it can still be seen when using {@link http.websocketAsync}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_failure"`:
   *            - `name`: The event name, which is `"websocket_failure"`.
   *            - `url`: The URL of the site requested.
   *            - `err`: An error describing the failure.
   * @example
   * - Prints an error why the website cannot be contacted:
   * ```ts
   * const myURL = "wss://example.tweaked.cc/not-a-websocket"
   * http.websocketAsync(myURL)
   * let event: string, url: string, err: string
   * while (true) {
   *     [event, url, err] = os.pullEvent("websocket_failure")
   *     if (url === myURL) break
   * }
   * print(`The URL ${url} could not be reached: ${err}`)
   * ```
   * @see {@link http.websocketAsync} To send an HTTP request.
   */
  function pullEvent(
    filter: "websocket_failure"
  ): LuaMultiReturn<[name: string, url: string, err: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `websocket_failure` event is fired when a WebSocket connection request fails.
   * > This event is normally handled inside {@link http.websocket}, but it can still be seen when using {@link http.websocketAsync}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_failure"`:
   *            - `name`: The event name, which is `"websocket_failure"`.
   *            - `url`: The URL of the site requested.
   *            - `err`: An error describing the failure.
   * @example
   * - Prints an error why the website cannot be contacted:
   * ```ts
   * const myURL = "wss://example.tweaked.cc/not-a-websocket"
   * http.websocketAsync(myURL)
   * let event: string, url: string, err: string
   * while (true) {
   *     [event, url, err] = os.pullEventRaw("websocket_failure")
   *     if (url === myURL) break
   * }
   * print(`The URL ${url} could not be reached: ${err}`)
   * ```
   * @see {@link http.websocketAsync} To send an HTTP request.
   */
  function pullEventRaw(
    filter: "websocket_failure"
  ): LuaMultiReturn<[name: string, url: string, err: string]>;
}
