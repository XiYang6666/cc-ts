/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > Fired whenever a key is released (or the terminal is closed while a key was being pressed).
   *
   * > [!TIP]
   * > This event returns a numerical "key code" (for instance, F1 is 290). This value may vary between versions and so it is recommended to use the constants in the {@link keys} API rather than hard coding numeric values.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"key_up"`:
   *            - `name`: The event name, which is `"key_up"`.
   *            - `keyCode`: The numerical key value of the key that was released.
   * @example
   * - Prints each key released on the keyboard whenever a `key_up` event is fired.
   * ```ts
   * while (true) {
   *   const [event, keyCode] = os.pullEvent("key_up");
   *   // Assuming 'keys' is a global or imported module providing key names
   *   const name = keys.getName(keyCode) || "unknown key";
   *   print(`${name} was released.`);
   * }
   * ```
   * @see {@link keys} For a lookup table of the given keys.
   */
  function pullEvent(
    filter: "key_up"
  ): LuaMultiReturn<[name: string, keyCode: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > Fired whenever a key is released (or the terminal is closed while a key was being pressed).
   *
   * > [!TIP]
   * > This event returns a numerical "key code" (for instance, F1 is 290). This value may vary between versions and so it is recommended to use the constants in the {@link keys} API rather than hard coding numeric values.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"key_up"`:
   *            - `name`: The event name, which is `"key_up"`.
   *            - `keyCode`: The numerical key value of the key that was released.
   * @example
   * - Prints each key released on the keyboard whenever a `key_up` event is fired.
   * ```ts
   * while (true) {
   *   const [event, keyCode] = os.pullEventRaw("key_up");
   *   // Assuming 'keys' is a global or imported module providing key names
   *   const name = keys.getName(keyCode) || "unknown key";
   *   print(`${name} was released.`);
   * }
   * ```
   * @see {@link keys} For a lookup table of the given keys.
   */
  function pullEventRaw(
    filter: "key_up"
  ): LuaMultiReturn<[name: string, keyCode: number]>;
}
