/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `http_success` event is fired when an HTTP request returns successfully.
   *
   * This event is normally handled inside {@link http.get} and {@link http.post}, but it can still be seen when using {@link http.request}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_success"`:
   *            - `name`: The event name, which is `"http_success"`.
   *            - `url`: The URL of the site requested.
   *            - `responseHandle`: The successful HTTP response.
   * @example
   * - Prints the content of a website (this may fail if the request fails):
   * ```ts
   * const myURL = "https://tweaked.cc/";
   * http.request(myURL);
   * let event: string, url: string, handle: http.Response;
   * while (true) {
   *     [event, url, handle] = os.pullEvent("http_success");
   *     if (url === myURL) break;
   * }
   * print(`Contents of ${url}:`);
   * print(handle.readAll());
   * handle.close();
   * ```
   * @see {@link http.request} To make an HTTP request.
   */
  function pullEvent(
    filter: "http_success"
  ): LuaMultiReturn<[name: string, url: string, responseHandle: http.Response]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `http_success` event is fired when an HTTP request returns successfully.
   *
   * This event is normally handled inside {@link http.get} and {@link http.post}, but it can still be seen when using {@link http.request}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_success"`:
   *            - `name`: The event name, which is `"http_success"`.
   *            - `url`: The URL of the site requested.
   *            - `responseHandle`: The successful HTTP response.
   * @example
   * - Prints the content of a website (this may fail if the request fails):
   * ```ts
   * const myURL = "https://tweaked.cc/";
   * http.request(myURL);
   * let event: string, url: string, handle: http.Response;
   * while (true) {
   *     [event, url, handle] = os.pullEventRaw("http_success");
   *     if (url === myURL) break;
   * }
   * print(`Contents of ${url}:`);
   * print(handle.readAll());
   * handle.close();
   * ```
   * @see {@link http.request} To make an HTTP request.
   */
  function pullEventRaw(
    filter: "http_success"
  ): LuaMultiReturn<[name: string, url: string, responseHandle: http.Response]>;
}
