/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `computer_command` event is fired when the `/computercraft queue` command is run for the current computer.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"computer_command"`:
   *            - `name`: The event name, which is `"computer_command"`.
   *            - `args`: The arguments passed to the command.
   * @example
   * - Prints the contents of messages sent:
   * ```ts
   * while (true) {
   *   const [event, ...args] = os.pullEvent("computer_command");
   *   print("Received message:", ...args);
   * }
   * ```
   */
  function pullEvent(
    filter: "computer_command"
  ): LuaMultiReturn<[name: string, ...args: string[]]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `computer_command` event is fired when the `/computercraft queue` command is run for the current computer.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"computer_command"`:
   *            - `name`: The event name, which is `"computer_command"`.
   *            - `args`: The arguments passed to the command.
   * @example
   * - Prints the contents of messages sent:
   * ```ts
   * while (true) {
   *   const [event, ...args] = os.pullEventRaw("computer_command");
   *   print("Received message:", ...args);
   * }
   * ```
   */
  function pullEventRaw(
    filter: "computer_command"
  ): LuaMultiReturn<[name: string, ...args: string[]]>;
}
