/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `http_failure` event is fired when an HTTP request fails.
   *
   * This event is normally handled inside {@link http.get} and {@link http.post}, but it can still be seen when using {@link http.request}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_failure"`:
   *            - `name`: The event name, which is `"http_failure"`.
   *            - `url`: The URL of the site requested.
   *            - `error`: An error describing the failure.
   *            - `responseHandle`: A response handle if the connection succeeded, but the server's response indicated failure.
   * @example
   * - Prints an error why the website cannot be contacted:
   * ```ts
   * const myURL = "https://does.not.exist.tweaked.cc";
   * http.request(myURL);
   * let event: string, url: string, err: string;
   * while (true) {
   *     [event, url, err] = os.pullEvent("http_failure");
   *     if (url === myURL) break;
   * }
   * print(`The URL ${url} could not be reached: ${err}`);
   * ```
   * @example
   * - Prints the contents of a webpage that does not exist:
   * ```ts
   * const myURL = "https://tweaked.cc/this/does/not/exist";
   * http.request(myURL);
   * let event: string, url: string, err: string, handle: http.Response | undefined;
   * while (true) {
   *     [event, url, err, handle] = os.pullEvent("http_failure");
   *     if (url === myURL) break;
   * }
   * print(`The URL ${url} could not be reached: ${err}`);
   * if (handle) {
   *   print(handle.getResponseCode());
   *   handle.close();
   * }
   * ```
   * @see {@link http.request} To send an HTTP request.
   */
  function pullEvent(
    filter: "http_failure"
  ): LuaMultiReturn<
    [
      name: string,
      url: string,
      error: string,
      responseHandle: http.Response | undefined
    ]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `http_failure` event is fired when an HTTP request fails.
   *
   * This event is normally handled inside {@link http.get} and {@link http.post}, but it can still be seen when using {@link http.request}.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_failure"`:
   *            - `name`: The event name, which is `"http_failure"`.
   *            - `url`: The URL of the site requested.
   *            - `error`: An error describing the failure.
   *            - `responseHandle`: A response handle if the connection succeeded, but the server's response indicated failure.
   * @example
   * - Prints an error why the website cannot be contacted:
   * ```ts
   * const myURL = "https://does.not.exist.tweaked.cc";
   * http.request(myURL);
   * let event: string, url: string, err: string;
   * while (true) {
   *     [event, url, err] = os.pullEventRaw("http_failure");
   *     if (url === myURL) break;
   * }
   * print(`The URL ${url} could not be reached: ${err}`);
   * ```
   * @example
   * - Prints the contents of a webpage that does not exist:
   * ```ts
   * const myURL = "https://tweaked.cc/this/does/not/exist";
   * http.request(myURL);
   * let event: string, url: string, err: string, handle: http.Response | undefined;
   * while (true) {
   *     [event, url, err, handle] = os.pullEventRaw("http_failure");
   *     if (url === myURL) break;
   * }
   * print(`The URL ${url} could not be reached: ${err}`);
   * if (handle) {
   *   print(handle.getResponseCode());
   *   handle.close();
   * }
   * ```
   * @see {@link http.request} To send an HTTP request.
   */
  function pullEventRaw(
    filter: "http_failure"
  ): LuaMultiReturn<
    [
      name: string,
      url: string,
      error: string,
      responseHandle: http.Response | undefined
    ]
  >;
}
