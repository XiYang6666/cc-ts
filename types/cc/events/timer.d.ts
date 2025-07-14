/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `timer` event is fired when a timer started with {@link os.startTimer} completes.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"timer"`:
   *            - `name`: The event name, which is `"timer"`.
   *            - `id`: The ID of the timer that finished.
   * @example
   * - Start and wait for a timer to finish.
   * ```ts
   * const timer_id = os.startTimer(2);
   * let eventName: string;
   * let id: number;
   * do {
   *   [eventName, id] = os.pullEvent("timer");
   * } while (id !== timer_id);
   * print(`Timer with ID ${id} was fired`);
   * ```
   * @see {@link os.startTimer} To start a timer.
   */
  function pullEvent(
    filter: "timer"
  ): LuaMultiReturn<[name: string, id: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `timer` event is fired when a timer started with {@link os.startTimer} completes.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"timer"`:
   *            - `name`: The event name, which is `"timer"`.
   *            - `id`: The ID of the timer that finished.
   * @example
   * - Start and wait for a timer to finish.
   * ```ts
   * const timer_id = os.startTimer(2);
   * let eventName: string;
   * let id: number;
   * do {
   *   [eventName, id] = os.pullEventRaw("timer");
   * } while (id !== timer_id);
   * print(`Timer with ID ${id} was fired`);
   * ```
   * @see {@link os.startTimer} To start a timer.
   */
  function pullEventRaw(
    filter: "timer"
  ): LuaMultiReturn<[name: string, id: number]>;
}
