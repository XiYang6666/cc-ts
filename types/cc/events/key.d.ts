/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > This event returns a numerical "key code" (for instance, F1 is 290). This value may vary between versions and so it is recommended to use the constants in the {@link keys} API rather than hard coding numeric values.
   *
   * > [!TIP]
   * > If the button pressed represented a printable character, then the `key` event will be followed immediately by a `char` event. If you are consuming text input, use a `char` event instead!
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"key"`:
   *            - `name`: The event name, which is `"key"`.
   *            - `keyCode`: The numerical key value of the key pressed.
   *            - `isHeld`: Whether the key event was generated while holding the key (`true`), rather than pressing it the first time (`false`).
   * @example
   * - Prints each key when the user presses it, and if the key is being held.
   * ```ts
   * while (true) {
   *   const [event, keyCode, isHeld] = os.pullEvent("key");
   *   // Assuming 'keys' is a global or imported module providing key names
   *   print(`${keys.getName(keyCode)} held=${isHeld}`);
   * }
   * ```
   * @see {@link keys} For key code constants.
   */
  function pullEvent(
    filter: "key"
  ): LuaMultiReturn<[name: string, keyCode: number, isHeld: boolean]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > This event returns a numerical "key code" (for instance, F1 is 290). This value may vary between versions and so it is recommended to use the constants in the {@link keys} API rather than hard coding numeric values.
   *
   * > [!TIP]
   * > If the button pressed represented a printable character, then the `key` event will be followed immediately by a `char` event. If you are consuming text input, use a `char` event instead!
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"key"`:
   *            - `name`: The event name, which is `"key"`.
   *            - `keyCode`: The numerical key value of the key pressed.
   *            - `isHeld`: Whether the key event was generated while holding the key (`true`), rather than pressing it the first time (`false`).
   * @example
   * - Prints each key when the user presses it, and if the key is being held.
   * ```ts
   * while (true) {
   *   const [event, keyCode, isHeld] = os.pullEventRaw("key");
   *   // Assuming 'keys' is a global or imported module providing key names
   *   print(`${keys.getName(keyCode)} held=${isHeld}`);
   * }
   * ```
   * @see {@link keys} For key code constants.
   */
  function pullEventRaw(
    filter: "key"
  ): LuaMultiReturn<[name: string, keyCode: number, isHeld: boolean]>;
}
