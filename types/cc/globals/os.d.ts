/**
 * The os API allows interacting with the current computer.
 *
 * @noSelf
 */
declare namespace os {
  /**
   * @deprecated
   * When possible it's best to avoid using this function. It pollutes the global table and can mask errors.
   * `require` should be used to load libraries instead.
   *
   * Loads the given API into the global environment.
   *
   * This function loads and executes the file at the given path, and all global variables and functions exported by it
   * will by available through the use of `myAPI.<function name>`, where `myAPI` is the base name of the API file.
   *
   * @param path The path of the API to load.
   * @returns Whether or not the API was successfully loaded.
   * @changed 1.2 New in version 1.2
   */
  function loadAPI(path: string): boolean;

  /**
   * @deprecated
   * See {@link os.loadAPI} for why.
   *
   * Unloads an API which was loaded by {@link os.loadAPI}.
   *
   * This effectively removes the specified table from `_G`.
   *
   * @param name The name of the API to unload.
   * @changed 1.2 New in version 1.2
   */
  function unloadAPI(name: string): void;

  /**
   * Pause execution of the current thread and waits for any events matching filter.
   *
   * This function yields the current process and waits for it to be resumed with a vararg list where the first element
   * matches filter. If no filter is supplied, this will match all events.
   *
   * Unlike {@link os.pullEventRaw}, it will stop the application upon a "terminate" event, printing the error "Terminated".
   *
   * @param filter Event to filter for.
   * @returns `LuaMultiReturn<[string, ...any[]]>` The name of the event that fired, followed by optional additional parameters of the event.
   * @example
   * - Listen for `mouse_click` events.
   * ```ts
   * while (true) {
   *     const [event, button, x, y] = os.pullEvent("mouse_click");
   *     print("Button", button, "was clicked at", x, ",", y);
   * }
   * ```
   * @example
   * - Listen for multiple events.
   * ```ts
   * while (true) {
   *     const eventData = os.pullEvent();
   *     const event = eventData[0];
   *
   *     if (event === "mouse_click") {
   *         print("Button", eventData[1], "was clicked at", eventData[2], ",", eventData[3]);
   *     } else if (event === "key") {
   *         print("Key code", eventData[1], "was pressed");
   *     }
   * }
   * ```
   * @see {@link os.pullEventRaw} To pull the terminate event.
   * @changed 1.3 Added filter argument.
   */
  function pullEvent(filter?: string): LuaMultiReturn<[name: string, ...any[]]>;

  /**
   * Pause execution of the current thread and waits for events, including the terminate event.
   *
   * This behaves almost the same as {@link os.pullEvent}, except it allows you to handle the terminate event yourself -
   * the program will not stop execution when Ctrl+T is pressed.
   *
   * @param filter Event to filter for.
   * @returns `LuaMultiReturn<[string, ...any[]]>` The name of the event that fired, followed by optional additional parameters of the event.
   * @example
   * - Listen for terminate events.
   * ```ts
   * while (true) {
   *     const [event] = os.pullEventRaw();
   *     if (event === "terminate") {
   *         print("Caught terminate event!");
   *     }
   * }
   * ```
   * @see {@link os.pullEvent} To pull events normally.
   */
  function pullEventRaw(
    filter?: string
  ): LuaMultiReturn<[name: string, ...any[]]>;

  /**
   * Pauses execution for the specified number of seconds, alias of `_G.sleep`.
   *
   * @param time The number of seconds to sleep for, rounded up to the nearest multiple of 0.05.
   */
  function sleep(time: number): void;

  /**
   * Get the current CraftOS version (for example, CraftOS 1.9).
   *
   * This is defined by `bios.lua`. For the current version of CC:Tweaked, this should return CraftOS 1.9.
   *
   * @returns The current CraftOS version.
   * @example
   * ```ts
   * os.version();
   * ```
   */
  function version(): string;

  /**
   * Run the program at the given path with the specified environment and arguments.
   *
   * This function does not resolve program names like the shell does. This means that, for example,
   * `os.run("edit")` will not work. As well as this, it does not provide access to the shell API in the environment.
   * For this behaviour, use `shell.run` instead.
   *
   * If the program cannot be found, or failed to run, it will print the error and return `false`.
   * If you want to handle this more gracefully, use an alternative such as `loadfile`.
   *
   * @param env The environment to run the program with.
   * @param path The exact path of the program to run.
   * @param args The arguments to pass to the program.
   * @returns Whether or not the program ran successfully.
   * @example
   * - Run the default shell from within your program:
   * ```ts
   * os.run({}, "/rom/programs/shell.lua");
   * ```
   * @see {@link shell.run}
   * @see {@link loadfile}
   */
  function run(env: object, path: string, ...args: any[]): boolean;

  /**
   * Adds an event to the event queue. This event can later be pulled with {@link os.pullEvent}.
   *
   * @param name The name of the event to queue.
   * @param params The parameters of the event. These can be any primitive type (boolean, number, string) as well as tables.
   *               Other types (like functions), as well as metatables, will not be preserved.
   * @see {@link os.pullEvent} To pull the event queued
   */
  function queueEvent(
    name: string,
    ...params: (boolean | number | string | object)[]
  ): void;

  /**
   * Starts a timer that will run for the specified number of seconds.
   * Once the timer fires, a `timer` event will be added to the queue with the ID returned from this function as the first parameter.
   *
   * As with {@link os.sleep}, the time will automatically be rounded up to the nearest multiple of 0.05 seconds,
   * as it waits for a fixed amount of world ticks.
   *
   * @param time The number of seconds until the timer fires.
   * @returns The ID of the new timer. This can be used to filter the timer event, or cancel the timer.
   * @throws If the time is below zero.
   * @see {@link os.cancelTimer} To cancel a timer.
   */
  function startTimer(time: number): number;

  /**
   * Cancels a timer previously started with {@link os.startTimer}. This will stop the timer from firing.
   *
   * @param token The ID of the timer to cancel.
   * @see {@link os.startTimer} To start a timer.
   * @changed 1.6 New in version 1.6
   */
  function cancelTimer(token: number): void;

  /**
   * Sets an alarm that will fire at the specified in-game time.
   * When it fires, an `alarm` event will be added to the event queue with the ID returned from this function as the first parameter.
   *
   * @param time The time at which to fire the alarm, in the range `[0.0, 24.0)`.
   * @returns The ID of the new alarm. This can be used to filter the alarm event, or cancel the alarm.
   * @throws If the time is out of range.
   * @see {@link os.cancelAlarm} To cancel an alarm.
   * @changed 1.2 New in version 1.2
   */
  function setAlarm(time: number): number;

  /**
   * Cancels an alarm previously started with {@link os.setAlarm}. This will stop the alarm from firing.
   *
   * @param token The ID of the alarm to cancel.
   * @see {@link os.setAlarm} To set an alarm.
   * @changed 1.6 New in version 1.6
   */
  function cancelAlarm(token: number): void;

  /**
   * Shuts down the computer immediately.
   */
  function shutdown(): void;

  /**
   * Reboots the computer immediately.
   */
  function reboot(): void;

  /**
   * Returns the ID of the computer.
   *
   * @returns The ID of the computer.
   */
  function getComputerID(): number;

  /**
   * Returns the ID of the computer.
   *
   * @returns The ID of the computer.
   */
  function computerID(): number;

  /**
   * Returns the label of the computer, or `undefined` if none is set.
   *
   * @returns The label of the computer.
   * @changed 1.3 New in version 1.3
   */
  function getComputerLabel(): string | undefined;

  /**
   * Returns the label of the computer, or `undefined` if none is set.
   *
   * @returns The label of the computer.
   * @changed 1.3 New in version 1.3
   */
  function computerLabel(): string | undefined;

  /**
   * Set the label of this computer.
   *
   * @param label The new label. May be `undefined` in order to clear it.
   * @changed 1.3 New in version 1.3
   */
  function setComputerLabel(label?: string): void;

  /**
   * Returns the number of seconds that the computer has been running.
   *
   * @returns The computer's uptime.
   * @changed 1.2 New in version 1.2
   */
  function clock(): number;

  /**
   * Returns the current time depending on the string passed in. This will always be in the range `[0.0, 24.0)`.
   *
   * - If called with `"ingame"`, the current world time will be returned. This is the default if nothing is passed.
   * - If called with `"utc"`, returns the hour of the day in UTC time.
   * - If called with `"local"`, returns the hour of the day in the timezone the server is located in.
   *
   * @param locale The locale of the time. Defaults to `"ingame"` locale if not specified.
   * @returns The hour of the selected locale.
   * @throws If an invalid locale is passed.
   * @example
   * - Print the current in-game time.
   * ```ts
   * textutils.formatTime(os.time());
   * ```
   * @see {@link textutils.formatTime} To convert times into a user-readable string.
   * @see {@link os.date} To get a date table that can be converted with this function.
   * @changed 1.2 New in version 1.2
   * @changed 1.80pr1 Add support for getting the local and UTC time.
   * @changed 1.82.0 Arguments are now case insensitive.
   * @changed 1.83.0 `time` now accepts table arguments and converts them to UNIX timestamps.
   */
  function time(locale?: "ingame" | "utc" | "local"): number;

  /**
   * This function can also be called with a table returned from {@link os.date}, which will convert the date fields into a UNIX timestamp (number of seconds since 1 January 1970).
   *
   * @param locale A table filled by `os.date("*t")` to decode.
   * @returns A UNIX timestamp from the table.
   * @throws If an invalid locale is passed.
   * @example
   * - Print the current in-game time.
   * ```ts
   * textutils.formatTime(os.time());
   * ```
   * @see {@link textutils.formatTime} To convert times into a user-readable string.
   * @see {@link os.date} To get a date table that can be converted with this function.
   * @changed 1.2 New in version 1.2
   * @changed 1.80pr1 Add support for getting the local and UTC time.
   * @changed 1.82.0 Arguments are now case insensitive.
   * @changed 1.83.0 `time` now accepts table arguments and converts them to UNIX timestamps.
   */
  function time(locale: DateTable): number;

  /**
   * Returns the day depending on the locale specified.
   *
   * - If called with `"ingame"`, returns the number of days since the world was created. This is the default.
   * - If called with `"utc"`, returns the number of days since 1 January 1970 in the UTC timezone.
   * - If called with `"local"`, returns the number of days since 1 January 1970 in the server's local timezone.
   *
   * @param args The locale to get the day for. Defaults to `"ingame"` if not set.
   * @returns The day depending on the selected locale.
   * @throws If an invalid locale is passed.
   * @changed 1.48 New in version 1.48
   * @changed 1.82.0 Arguments are now case insensitive.
   */
  function day(args?: "ingame" | "utc" | "local"): number;

  /**
   * Returns the number of milliseconds since an epoch depending on the locale.
   *
   * - If called with `"ingame"`, returns the number of in-game milliseconds since the world was created. This is the default.
   * - If called with `"utc"`, returns the number of milliseconds since 1 January 1970 in the UTC timezone.
   * - If called with `"local"`, returns the number of milliseconds since 1 January 1970 in the server's local timezone.
   *
   * > [!INFO]
   * The ingame time zone assumes that one Minecraft day consists of 86,400,000 milliseconds.
   * Since one in-game day is much faster than a real day (20 minutes), this will change quicker than real time -
   * one real second is equal to 72000 in-game milliseconds.
   * If you wish to convert this value to real time, divide by 72000; to convert to ticks (where a day is 24000 ticks),
   * divide by 3600.
   *
   * @param args The locale to get the milliseconds for. Defaults to `"ingame"` if not set.
   * @returns The milliseconds since the epoch depending on the selected locale.
   * @throws If an invalid locale is passed.
   * @example
   * - Get the current time and use date to convert it to a table.
   * ```ts
   * // Dividing by 1000 converts it from milliseconds to seconds.
   * const time = os.epoch("local") / 1000;
   * const time_table = os.date("*t", time);
   * print(textutils.serialize(time_table));
   * ```
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function epoch(args?: "ingame" | "utc" | "local"): number;

  /**
   * Returns a date string (or table) using a specified format string and optional time to format.
   *
   * The format string takes the same formats as C's `strftime` function.
   * The format string can also be prefixed with an exclamation mark (`!`) to use UTC time instead of the server's local timezone.
   *
   * @param format The format of the string to return. This defaults to `%c`, which expands to a string similar to `"Sat Dec 24 16:58:00 2011"`.
   * @param time The timestamp to convert to a string. This defaults to the current time.
   * @returns The resulting formatted string.
   * @throws If an invalid format is passed.
   * @example
   * - Print the current date in a user-friendly string.
   * ```ts
   * os.date("%A %d %B %Y"); // See the reference above!
   * ```
   * @changed 1.83.0 New in version 1.83.0
   */
  function date(format?: string, time?: number): string;

  /**
   * Returns a date string (or table) using a specified format string and optional time to format.
   *
   * If the format is exactly `"*t"` (or `"!*t"`), a table representation of the timestamp will be returned instead.
   * This table has fields for the year, month, day, hour, minute, second, day of the week, day of the year,
   * and whether Daylight Savings Time is in effect. This table can be converted back to a timestamp with {@link os.time}.
   *
   * @param format The format to return a table representation. Must be `"*t"` or `"!*t"`.
   * @param time The timestamp to convert to a table. This defaults to the current time.
   * @returns The resulting formatted table.
   * @throws If an invalid format is passed.
   * @example
   * - Convert a timestamp to a table.
   * ```ts
   * os.date("!*t", 1242534247);
   * // {
   * //   // Date
   * //   year:  2009,
   * //   month: 5,
   * //   day:   17,
   * //   yday:  137,
   * //   wday:  1,
   * //   // Time
   * //   hour:  4,
   * //   min:   24,
   * //   sec:   7,
   * //   isdst: false,
   * // }
   * ```
   * @changed 1.83.0 New in version 1.83.0
   */
  function date(format: "*t" | "!*t", time?: number): DateTable;

  /**
   * @internal
   * A table representation of a timestamp, returned by `os.date("*t")`.
   */
  interface DateTable {
    /** The year (e.g., 2009). */
    year: number;
    /** The month (1-12). */
    month: number;
    /** The day of the month (1-31). */
    day: number;
    /** The day of the year (1-366). */
    yday: number;
    /** The day of the week (1-7, Sunday is 1). */
    wday: number;
    /** The hour (0-23). */
    hour: number;
    /** The minute (0-59). */
    min: number;
    /** The second (0-59). */
    sec: number;
    /** Whether Daylight Savings Time is in effect. */
    isdst: boolean;
  }
}
