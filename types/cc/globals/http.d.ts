/**
 * Make HTTP requests, sending and receiving data to a remote web server.
 *
 * @see Allowing access to local IPs To allow accessing servers running on your
 * local network.
 * @changed 1.1 New in version 1.1
 *
 * @noSelf
 */
declare namespace http {
  /**
   * Options for HTTP GET requests when using the table form.
   *
   * @internal
   */
  interface HttpGetOptions {
    /** The url to request. */
    url: string;
    /** Additional headers to send as part of this request. */
    headers?: Record<string, string>;
    /** Whether the response handle should be opened in binary mode. Defaults to
     * `false`. */
    binary?: boolean;
    /** Which HTTP method to use, for instance "PATCH" or "TRACE". */
    method?: string;
    /** Whether to follow HTTP redirects. Defaults to `true`. */
    redirect?: boolean;
    /** The connection timeout, in seconds. */
    timeout?: number;
  }

  /**
   * Options for HTTP POST requests when using the table form.
   *
   * @internal
   */
  interface HttpPostOptions {
    /** The url to request. */
    url: string;
    /** The body of the POST request. */
    body?: string;
    /** Additional headers to send as part of this request. */
    headers?: Record<string, string>;
    /** Whether the response handle should be opened in binary mode. Defaults to
     * `false`. */
    binary?: boolean;
    /** Which HTTP method to use, for instance "PATCH" or "TRACE". */
    method?: string;
    /** Whether to follow HTTP redirects. Defaults to `true`. */
    redirect?: boolean;
    /** The connection timeout, in seconds. */
    timeout?: number;
  }

  /**
   * Options for asynchronous HTTP requests when using the table form.
   *
   * @internal
   */
  interface HttpRequestOptions {
    /** The url to request. */
    url: string;
    /** An optional string containing the body of the request. If specified, a
     * POST request will be made instead. */
    body?: string;
    /** Additional headers to send as part of this request. */
    headers?: Record<string, string>;
    /** Whether the response handle should be opened in binary mode. Defaults to
     * `false`. */
    binary?: boolean;
    /** Which HTTP method to use, for instance "PATCH" or "DELETE". */
    method?: string;
    /** Whether to follow HTTP redirects. Defaults to `true`. */
    redirect?: boolean;
    /** The connection timeout, in seconds. */
    timeout?: number;
  }

  /**
   * Options for opening a websocket when using the table form.
   *
   * @internal
   */
  interface WebsocketOptions {
    /** The websocket url to connect to. This should have the `ws://` or
     * `wss://` protocol. */
    url: string;
    /** Additional headers to send as part of the initial websocket connection. */
    headers?: Record<string, string>;
    /** The connection timeout, in seconds. */
    timeout?: number;
  }

  /**
   * Make a HTTP GET request to the given url.
   *
   * @param url The url to request.
   * @param headers Additional headers to send as part of this request.
   * @param binary Whether the response handle should be opened in binary mode.
   * Defaults to `false`.
   * @returns The resulting http response, which can be read from.
   * @returns `LuaMultiReturn<[undefined, string, Response | undefined]>` When
   * the http request failed, such as in the event of a 404 error or connection
   * timeout. Returns `undefined`, a message detailing why the request failed,
   * and the failing http response (if available).
   * @example
   * - Make a request to example.tweaked.cc, and print the returned page.
   * ```ts
   * const [request] = http.get("https://example.tweaked.cc");
   * if (request) {
   *   print(request.readAll());
   *   // => HTTP is working!
   *   request.close();
   * }
   * ```
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Response handles are now returned on error if available.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function get(
    url: string,
    headers?: Record<string, string>,
    binary?: boolean
  ): LuaMultiReturn<
    | [response: Response]
    | [response: undefined, reason: string, failling: Response | undefined]
  >;

  /**
   * Make a HTTP GET request to the given url.
   *
   * @param request Options for the request. See {@link http.request} for
   * details on how these options behave.
   * @returns The resulting http response, which can be read from.
   * @returns `LuaMultiReturn<[undefined, string, Response | undefined]>` When
   * the http request failed, such as in the event of a 404 error or connection
   * timeout. Returns `undefined`, a message detailing why the request failed,
   * and the failing http response (if available).
   * @example
   * - Make a request to example.tweaked.cc, and print the returned page.
   * ```ts
   * const [request] = http.get("https://example.tweaked.cc");
   * if (request) {
   *   print(request.readAll());
   *   // => HTTP is working!
   *   request.close();
   * }
   * ```
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Response handles are now returned on error if available.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function get(
    request: HttpGetOptions
  ): LuaMultiReturn<
    | [response: Response]
    | [response: undefined, reason: string, failling: Response | undefined]
  >;

  /**
   * Make a HTTP POST request to the given url.
   *
   * @param url The url to request.
   * @param body The body of the POST request.
   * @param headers Additional headers to send as part of this request.
   * @param binary Whether the response handle should be opened in binary mode.
   * Defaults to `false`.
   * @returns The resulting http response, which can be read from.
   * @returns `LuaMultiReturn<[undefined, string, Response | undefined]>` When
   * the http request failed, such as in the event of a 404 error or connection
   * timeout. Returns `undefined`, a message detailing why the request failed,
   * and the failing http response (if available).
   * @changed 1.31 New in version 1.31
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Response handles are now returned on error if available.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function post(
    url: string,
    body: string,
    headers?: Record<string, string>,
    binary?: boolean
  ): LuaMultiReturn<
    | [response: Response]
    | [response: undefined, reason: string, failling: Response | undefined]
  >;

  /**
   * Make a HTTP POST request to the given url.
   *
   * @param request Options for the request. See {@link http.request} for
   * details on how these options behave.
   * @returns The resulting http response, which can be read from.
   * @returns `LuaMultiReturn<[undefined, string, Response | undefined]>` When
   * the http request failed, such as in the event of a 404 error or connection
   * timeout. Returns `undefined`, a message detailing why the request failed,
   * and the failing http response (if available).
   * @changed 1.31 New in version 1.31
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Response handles are now returned on error if available.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function post(
    request: HttpPostOptions
  ): LuaMultiReturn<
    | [response: Response]
    | [response: undefined, reason: string, failling: Response | undefined]
  >;

  /**
   * Asynchronously make a HTTP request to the given url.
   *
   * This returns immediately, a `http_success` or `http_failure` event will be
   * queued once the request has completed.
   *
   * @param url The url to request.
   * @param body An optional string containing the body of the request. If
   * specified, a POST request will be made instead.
   * @param headers Additional headers to send as part of this request.
   * @param binary Whether the response handle should be opened in binary mode.
   * Defaults to `false`.
   * @see {@link http.get} For a synchronous way to make GET requests.
   * @see {@link http.post} For a synchronous way to make POST requests.
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function request(
    url: string,
    body?: string,
    headers?: Record<string, string>,
    binary?: boolean
  ): void;

  /**
   * Asynchronously make a HTTP request to the given url.
   *
   * This returns immediately, a `http_success` or `http_failure` event will be
   * queued once the request has completed.
   *
   * @param request Options for the request. This table form is an expanded
   * version of the previous syntax. All arguments from above are passed in as
   * fields instead (for instance, `http.request("https://example.com")` becomes
   * `http.request({ url = "https://example.com" })`). This table also accepts
   * several additional options:
   * - `method`: Which HTTP method to use, for instance "PATCH" or "DELETE".
   * - `redirect`: Whether to follow HTTP redirects. Defaults to `true`.
   * - `timeout`: The connection timeout, in seconds.
   * @see {@link http.get} For a synchronous way to make GET requests.
   * @see {@link http.post} For a synchronous way to make POST requests.
   * @changed 1.63 Added argument for headers.
   * @changed 1.80pr1 Added argument for binary handles.
   * @changed 1.80pr1.6 Added support for table argument.
   * @changed 1.86.0 Added PATCH and TRACE methods.
   * @changed 1.105.0 Added support for custom timeouts.
   * @changed 1.109.0 The returned response now reads the body as raw bytes,
   * rather than decoding from UTF-8.
   */
  function request(request: HttpRequestOptions): void;

  /**
   * Asynchronously determine whether a URL can be requested.
   *
   * If this returns `true`, one should also listen for `http_check` which will
   * contain further information about whether the URL is allowed or not.
   *
   * @param url The URL to check.
   * @returns `true` When this url is not invalid. This does not imply that it
   * is allowed - see the comment above.
   * @returns `LuaMultiReturn<[false, string]>` When this url is invalid, along
   * with a reason why this URL is not valid (for instance, if it is malformed,
   * or blocked).
   * @see {@link http.checkURL} For a synchronous version.
   */
  function checkURLAsync(
    url: string
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Determine whether a URL can be requested.
   *
   * If this returns `true`, one should also listen for `http_check` which will
   * contain further information about whether the URL is allowed or not.
   *
   * @param url The URL to check.
   * @returns `true` When this url is valid and can be requested via
   * {@link http.request}.
   * @returns `LuaMultiReturn<[false, string]>` When this url is invalid, along
   * with a reason why this URL is not valid (for instance, if it is malformed,
   * or blocked).
   * @example
   * ```ts
   * print(http.checkURL("https://example.tweaked.cc/"));
   * // => true
   * print(http.checkURL("http://localhost/"));
   * // => false Domain not permitted
   * print(http.checkURL("not a url"));
   * // => false URL malformed
   * ```
   * @see {@link http.checkURLAsync} For an asynchronous version.
   */
  function checkURL(
    url: string
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Asynchronously open a websocket.
   *
   * This returns immediately, a `websocket_success` or `websocket_failure`
   * event will be queued once the request has completed.
   *
   * @param url The websocket url to connect to. This should have the `ws://` or
   * `wss://` protocol.
   * @param headers Additional headers to send as part of the initial websocket
   * connection.
   * @see websocket_success
   * @see websocket_failure
   * @changed 1.80pr1.3 New in version 1.80pr1.3
   * @changed 1.95.3 Added User-Agent to default headers.
   * @changed 1.105.0 Added support for table argument and custom timeout.
   * @changed 1.109.0 Non-binary websocket messages now use the raw bytes rather
   * than using UTF-8.
   */
  function websocketAsync(url: string, headers?: Record<string, string>): void;

  /**
   * Asynchronously open a websocket.
   *
   * This returns immediately, a `websocket_success` or `websocket_failure`
   * event will be queued once the request has completed.
   *
   * @param request Options for the websocket. See {@link http.websocket} for
   * details on how these options behave.
   * @see websocket_success
   * @see websocket_failure
   * @changed 1.80pr1.3 New in version 1.80pr1.3
   * @changed 1.95.3 Added User-Agent to default headers.
   * @changed 1.105.0 Added support for table argument and custom timeout.
   * @changed 1.109.0 Non-binary websocket messages now use the raw bytes rather
   * than using UTF-8.
   */
  function websocketAsync(request: WebsocketOptions): void;

  /**
   * Open a websocket.
   *
   * @param url The websocket url to connect to. This should have the `ws://` or
   * `wss://` protocol.
   * @param headers Additional headers to send as part of the initial websocket
   * connection.
   * @returns The websocket connection.
   * @returns `LuaMultiReturn<[undefined, string]>` If the websocket connection
   * failed, returns `undefined` and an error message describing why the
   * connection failed.
   * @example
   * - Connect to an echo websocket and send a message.
   * ```ts
   * const [ws, err] = http.websocket("wss://example.tweaked.cc/echo");
   * if (ws) {
   *   ws.send("Hello!"); // Send a message
   *   print(ws.receive()); // And receive the reply
   *   ws.close();
   * } else {
   *   print(`Failed to connect: ${err}`);
   * }
   * ```
   * @changed 1.80pr1.1 New in version 1.80pr1.1
   * @changed 1.80pr1.3 No longer asynchronous.
   * @changed 1.95.3 Added User-Agent to default headers.
   * @changed 1.105.0 Added support for table argument and custom timeout.
   * @changed 1.109.0 Non-binary websocket messages now use the raw bytes rather
   * than using UTF-8.
   */
  function websocket(
    url: string,
    headers?: Record<string, string>
  ): LuaMultiReturn<[ws: Websocket] | [ws: undefined, reason: string]>;

  /**
   * Open a websocket.
   *
   * @param request Options for the websocket. This table form is an expanded
   * version of the previous syntax. All arguments from above are passed in as
   * fields instead (for instance, `http.websocket("https://example.com")`
   * becomes `http.websocket({ url = "https://example.com" })`). This table also
   * accepts the following additional options:
   * - `timeout`: The connection timeout, in seconds.
   * @returns The websocket connection.
   * @returns `LuaMultiReturn<[undefined, string]>` If the websocket connection
   * failed, returns `undefined` and an error message describing why the
   * connection failed.
   * @example
   * - Connect to an echo websocket and send a message.
   * ```ts
   * const [ws, err] = http.websocket("wss://example.tweaked.cc/echo");
   * if (ws) {
   *   ws.send("Hello!"); // Send a message
   *   print(ws.receive()); // And receive the reply
   *   ws.close();
   * } else {
   *   print(`Failed to connect: ${err}`);
   * }
   * ```
   * @changed 1.80pr1.1 New in version 1.80pr1.1
   * @changed 1.80pr1.3 No longer asynchronous.
   * @changed 1.95.3 Added User-Agent to default headers.
   * @changed 1.105.0 Added support for table argument and custom timeout.
   * @changed 1.109.0 Non-binary websocket messages now use the raw bytes rather
   * than using UTF-8.
   */
  function websocket(
    request: WebsocketOptions
  ): LuaMultiReturn<[ws: Websocket] | [ws: undefined, reason: string]>;

  /**
   * A http response. This provides the same methods as a file, though provides
   * several request specific methods.
   * @see {@link http.request} On how to make a http request.
   */
  interface Response extends fs.ReadHandle {
    /**
     * Returns the response code and response message returned by the server.
     * @returns `LuaMultiReturn<[number, string]>` The response code (i.e. 200)
     * and the response message (i.e. "OK").
     * @changed 1.80pr1.13 Added response message return value.
     */
    getResponseCode(): LuaMultiReturn<[code: number, message: string]>;

    /**
     * Get a table containing the response's headers, in a format similar to
     * that required by {@link http.request}. If multiple headers are sent with
     * the same name, they will be combined with a comma.
     * @returns The response's headers.
     * @example
     * - Make a request to example.tweaked.cc, and print the returned headers.
     * ```ts
     * const [request] = http.get("https://example.tweaked.cc");
     * if (request) {
     *   print(textutils.serialize(request.getResponseHeaders()));
     *   // => {
     *   //  [ "Content-Type" ] = "text/plain; charset=utf8",
     *   //  [ "content-length" ] = 17,
     *   //  ...
     *   // }
     *   request.close();
     * }
     * ```
     */
    getResponseHeaders(): Record<string, string>;
  }

  /**
   * A websocket, which can be used to send and receive messages with a web server.
   * @see {@link http.websocket} On how to open a websocket.
   */
  interface Websocket {
    /**
     * Wait for a message from the server.
     * @param timeout The number of seconds to wait if no message is received.s
     * @returns `LuaMultiReturn<[string, boolean]>` The received message and a
     * boolean indicating if this was a binary message.
     * @returns `undefined` If the websocket was closed while waiting, or if we
     * timed out.
     * @throws If the websocket has been closed.
     * @changed 1.80pr1.13 Added return value indicating whether the message was
     * binary.
     * @changed 1.87.0 Added timeout argument.
     */
    receive(
      timeout?: number
    ): LuaMultiReturn<[message: string, binary: boolean] | [undefined]>;

    /**
     * Send a websocket message to the connected server.
     * @param message The message to send.
     * @param binary Whether this message should be treated as a binary message.
     * @throws If the message is too large.
     * @throws If the websocket has been closed.
     * @changed 1.81.0 Added argument for binary mode.
     */
    send(message: string, binary?: boolean): void;

    /**
     * Close this websocket. This will terminate the connection, meaning
     * messages can no longer be sent or received along it.
     */
    close(): void;
  }
}
