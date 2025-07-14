/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `http_check` event is fired when a URL check finishes.
   * > This event is normally handled inside `http.checkURL`, but it can still be seen when using `http.checkURLAsync`.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_check"`:
   *            - `name`: The event name, which is `"http_check"`.
   *            - `url`: The URL requested to be checked.
   *            - `succeeded`: Whether the check succeeded.
   *            - `reason`: If the check failed, a reason explaining why the check failed.
   * @see {@link http.checkURLAsync} To check a URL asynchronously.
   */
  function pullEvent(
    filter: "http_check"
  ): LuaMultiReturn<
    [name: string, url: string, succeeded: boolean, reason: string | undefined]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `http_check` event is fired when a URL check finishes.
   * > This event is normally handled inside `http.checkURL`, but it can still be seen when using `http.checkURLAsync`.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"http_check"`:
   *            - `name`: The event name, which is `"http_check"`.
   *            - `url`: The URL requested to be checked.
   *            - `succeeded`: Whether the check succeeded.
   *            - `reason`: If the check failed, a reason explaining why the check failed.
   * @see {@link http.checkURLAsync} To check a URL asynchronously.
   */
  function pullEventRaw(
    filter: "http_check"
  ): LuaMultiReturn<
    [name: string, url: string, succeeded: boolean, reason: string | undefined]
  >;
}
