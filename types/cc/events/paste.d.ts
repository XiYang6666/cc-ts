/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `paste` event is fired when text is pasted into the computer through Ctrl-V (or ⌘V on Mac).
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"paste"`:
   *            - `name`: The event name, which is `"paste"`.
   *            - `text`: The text that was pasted.
   * @example
   * - Prints pasted text:
   * ```ts
   * while (true) {
   *   const [event, text] = os.pullEvent("paste");
   *   print(`"${text}" was pasted`);
   * }
   * ```
   */
  function pullEvent(
    filter: "paste"
  ): LuaMultiReturn<[name: string, text: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `paste` event is fired when text is pasted into the computer through Ctrl-V (or ⌘V on Mac).
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"paste"`:
   *            - `name`: The event name, which is `"paste"`.
   *            - `text`: The text that was pasted.
   * @example
   * - Prints pasted text:
   * ```ts
   * while (true) {
   *   const [event, text] = os.pullEventRaw("paste");
   *   print(`"${text}" was pasted`);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "paste"
  ): LuaMultiReturn<[name: string, text: string]>;
}
