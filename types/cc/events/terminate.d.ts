/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `terminate` event is fired when Ctrl-T is held down.
   * >
   * > This event is normally handled by `os.pullEvent` internally, and will **not** be returned by this function.
   * > Instead, `os.pullEvent` will typically cause the program to exit when `terminate` is fired.
   *
   * @param filter The type of event to pull. If omitted, any event will be returned.
   * @returns A tuple containing the event name and event-specific data.
   *          The `terminate` event is *not* returned by this function.
   * @example
   * - This program will exit if Ctrl-T is held down while it's running, because `os.pullEvent()` handles the `terminate` event internally.
   * ```ts
   * while (true) {
   *   os.pullEvent(); // This will cause the program to exit if Ctrl-T is held.
   * }
   * ```
   */
  function pullEvent(filter?: string): LuaMultiReturn<[name: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `terminate` event is fired when Ctrl-T is held down.
   * >
   * > Unlike `os.pullEvent`, `os.pullEventRaw` **will** return this event when fired.
   * >
   * > The `terminate` event will be sent even when a `filter` is provided to `os.pullEventRaw`.
   * > When using `os.pullEventRaw` with a filter, make sure to check that the event is not `terminate` if you want to handle other events.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name.
   *          - If `filter` is `"terminate"`:
   *            - `name`: The event name, which is `"terminate"`.
   * @example
   * - Prints a message when Ctrl-T is held:
   * ```ts
   * while (true) {
   *   const [eventName] = os.pullEventRaw("terminate"); // Filter for "terminate"
   *   if (eventName === "terminate") {
   *     print("Terminate requested!");
   *   }
   * }
   * ```
   */
  function pullEventRaw(filter: "terminate"): LuaMultiReturn<[name: string]>;
}
