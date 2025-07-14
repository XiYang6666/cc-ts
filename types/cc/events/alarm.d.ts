/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `alarm` event is fired when an alarm started with {@link os.setAlarm} completes.
   *
   * @param filter The type of event to pull. Currently, "alarm" is the only documented filter for this function.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"alarm"`:
   *            - `name`: The event name, which is `"alarm"`.
   *            - `id`: The ID of the alarm that finished.
   * @example
   * - Example of waiting for an alarm event:
   * ```ts
   * const alarm_id = os.setAlarm(os.time() + 0.05)
   * while (true) {
   *     event, id = os.pullEvent("alarm")
   *     if (id == alarm_id) break;
   * }
   * print(`Alarm with ID ${id} was fired`)
   * ```
   * @see {@link os.setAlarm} To start an alarm.
   */
  function pullEvent(
    filter: "alarm"
  ): LuaMultiReturn<[name: string, id: number]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `alarm` event is fired when an alarm started with {@link os.setAlarm} completes.
   *
   * @param filter The type of event to pull. Currently, "alarm" is the only documented filter for this function.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"alarm"`:
   *            - `name`: The event name, which is `"alarm"`.
   *            - `id`: The ID of the alarm that finished.
   * @example
   * - Example of waiting for an alarm event:
   * ```ts
   * const alarm_id = os.setAlarm(os.time() + 0.05)
   * while (true) {
   *     event, id = os.pullEventRaw("alarm")
   *     if (id == alarm_id) break;
   * }
   * print(`Alarm with ID ${id} was fired`)
   * ```
   * @see {@link os.setAlarm} To start an alarm.
   */
  function pullEventRaw(filter: "alarm"): LuaMultiReturn<[name: string, id: number]>;
}
