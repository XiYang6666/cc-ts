/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `websocket_success` event is fired when a WebSocket connection request returns successfully.
   * > This event is normally handled inside {@link http.websocket}, but it can still be seen when using {@link http.websocketAsync}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_success"`:
   *            - `name`: The event name, which is `"websocket_success"`.
   *            - `url`: The URL of the site.
   *            - `handle`: The handle for the WebSocket.
   * @example
   * - Prints the content of a website (this may fail if the request fails):
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * http.websocketAsync(myURL)
   * let event: string, url: string, handle: http.Websocket
   * while (true) {
   *     [event, url, handle] = os.pullEvent("websocket_success")
   *     if (url === myURL) break
   * }
   * print(`Connected to ${url}`)
   * handle.send("Hello!")
   * print(handle.receive())
   * handle.close()
   * ```
   * @see {@link http.websocketAsync} To open a WebSocket asynchronously.
   */
  function pullEvent(
    filter: "websocket_success"
  ): LuaMultiReturn<[name: string, url: string, handle: http.Websocket]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `websocket_success` event is fired when a WebSocket connection request returns successfully.
   * > This event is normally handled inside {@link http.websocket}, but it can still be seen when using {@link http.websocketAsync}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"websocket_success"`:
   *            - `name`: The event name, which is `"websocket_success"`.
   *            - `url`: The URL of the site.
   *            - `handle`: The handle for the WebSocket.
   * @example
   * - Prints the content of a website (this may fail if the request fails):
   * ```ts
   * const myURL = "wss://example.tweaked.cc/echo"
   * http.websocketAsync(myURL)
   * let event: string, url: string, handle: http.Websocket
   * while (true) {
   *     [event, url, handle] = os.pullEventRaw("websocket_success")
   *     if (url === myURL) break
   * }
   * print(`Connected to ${url}`)
   * handle.send("Hello!")
   * print(handle.receive())
   * handle.close()
   * ```
   * @see {@link http.websocketAsync} To open a WebSocket asynchronously.
   */
  function pullEventRaw(
    filter: "websocket_success"
  ): LuaMultiReturn<[name: string, url: string, handle: http.Websocket]>;
}

/**
 * @internal
 * Placeholder for the http namespace and Websocket class.
 * In a complete definition, this would be part of the `http.d.ts` file.
 */
declare namespace http {
  /**
   * Represents an active WebSocket connection.
   */
  interface Websocket {
    /**
     * Sends a message over the WebSocket connection.
     * @param message The message to send.
     * @param isBinary Whether the message should be sent as binary data. Defaults to `false`.
     */
    send(message: string, isBinary?: boolean): void;

    /**
     * Receives a message from the WebSocket connection.
     * This function blocks until a message is received or the connection is closed.
     * @returns A tuple containing the message content and a boolean indicating if it's binary.
     *          Returns `undefined` if the connection is closed.
     */
    receive(): LuaMultiReturn<
      [message: string, isBinary: boolean] | [undefined]
    >;

    /**
     * Closes the WebSocket connection.
     * @param code The close code.
     * @param reason The close reason.
     */
    close(code?: number, reason?: string): void;
  }

  /**
   * Opens a WebSocket connection. This function blocks until the connection is established or fails.
   * @param url The URL to connect to (e.g., "wss://example.com/").
   * @returns The WebSocket handle if successful, otherwise `undefined` and an error message.
   */
  function websocket(
    url: string
  ): LuaMultiReturn<[Websocket] | [undefined, string]>;

  /**
   * Asynchronously attempts to open a WebSocket connection.
   * Success or failure will be reported via `websocket_success` or `websocket_failure` events.
   * @param url The URL to connect to (e.g., "wss://example.com/").
   */
  function websocketAsync(url: string): void;
}
