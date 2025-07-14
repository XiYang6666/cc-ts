/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `task_complete` event is fired when an asynchronous task completes. This is usually handled inside the function call that queued the task; however, functions such as {@link commands.execAsync} return immediately so the user can wait for completion.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - `name`: The event name, which is `"task_complete"`.
   *          - `id`: The ID of the task that completed.
   *          - `succeeded`: Whether the command succeeded (`true`) or failed (`false`).
   *          - If `succeeded` is `true`:
   *            - `...params`: Any parameters returned from the command.
   *          - If `succeeded` is `false`:
   *            - `errorMessage`: An error message explaining the failure.
   * @example
   * - Prints the results of an asynchronous command:
   * ```ts
   * // Assuming commands.execAsync is defined elsewhere
   * declare namespace commands {
   *   function execAsync(command: string): number;
   * }
   *
   * const taskID = commands.execAsync("say Hello");
   * let event: LuaMultiReturn<[string, number, boolean, ...any[]]>;
   * do {
   *   event = os.pullEvent("task_complete");
   * } while (event[1] !== taskID); // event[0] is the event name, event[1] is the task ID
   *
   * const [eventName, completedTaskID, succeeded, ...rest] = event;
   *
   * if (succeeded) {
   *   print(`Task ${completedTaskID} succeeded:`, ...rest);
   * } else {
   *   const errorMessage = rest[0]; // The first element of rest is the error message
   *   print(`Task ${completedTaskID} failed: ${errorMessage}`);
   * }
   * ```
   * @see {@link commands.execAsync} To run a command which fires a `task_complete` event.
   */
  function pullEvent(
    filter: "task_complete"
  ): LuaMultiReturn<
    | [name: string, id: number, succeeded: true, ...params: any[]]
    | [name: string, id: number, succeeded: false, errorMessage: string]
  >;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `task_complete` event is fired when an asynchronous task completes. This is usually handled inside the function call that queued the task; however, functions such as {@link commands.execAsync} return immediately so the user can wait for completion.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - `name`: The event name, which is `"task_complete"`.
   *          - `id`: The ID of the task that completed.
   *          - `succeeded`: Whether the command succeeded (`true`) or failed (`false`).
   *          - If `succeeded` is `true`:
   *            - `...params`: Any parameters returned from the command.
   *          - If `succeeded` is `false`:
   *            - `errorMessage`: An error message explaining the failure.
   * @example
   * - Prints the results of an asynchronous command:
   * ```ts
   * // Assuming commands.execAsync is defined elsewhere
   * declare namespace commands {
   *   function execAsync(command: string): number;
   * }
   *
   * const taskID = commands.execAsync("say Hello");
   * let event: LuaMultiReturn<[string, number, boolean, ...any[]]>;
   * do {
   *   event = os.pullEventRaw("task_complete");
   * } while (event[1] !== taskID); // event[0] is the event name, event[1] is the task ID
   *
   * const [eventName, completedTaskID, succeeded, ...rest] = event;
   *
   * if (succeeded) {
   *   print(`Task ${completedTaskID} succeeded:`, ...rest);
   * } else {
   *   const errorMessage = rest[0]; // The first element of rest is the error message
   *   print(`Task ${completedTaskID} failed: ${errorMessage}`);
   * }
   * ```
   * @see {@link commands.execAsync} To run a command which fires a `task_complete` event.
   */
  function pullEventRaw(
    filter: "task_complete"
  ): LuaMultiReturn<
    | [name: string, id: number, succeeded: true, ...params: any[]]
    | [name: string, id: number, succeeded: false, errorMessage: string]
  >;
}
