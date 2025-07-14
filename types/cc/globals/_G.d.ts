/** @noSelfInFile */

/**
 * Pauses execution for the specified number of seconds.
 *
 * As it waits for a fixed amount of world ticks, time will automatically be
 * rounded up to the nearest multiple of 0.05 seconds. If you are using
 * coroutines or the parallel API, it will only pause execution of the current
 * thread, not the whole program.
 *
 * > [!TIP] Because sleep internally uses timers, it is a declare function that
 * > yields. This means that you can use it to prevent "Too long without
 * > yielding" errors. However, as the minimum sleep time is 0.05 seconds, it
 * > will slow your program down.
 *
 * > [!WARNING] Internally, this declare function queues and waits for a timer event
 * > (using os.startTimer), however it does not listen for any other events.
 * > This means that any event that occurs while sleeping will be entirely
 * > discarded. If you need to receive events while sleeping, consider using
 * > timers, or the parallel API.
 *
 * @param time The number of seconds to sleep for, rounded up to the nearest
 * multiple of 0.05.
 * @example
 * // Sleep for three seconds.
 * ```ts
 * print("Sleeping for three seconds")
 * sleep(3)
 * print("Done!")
 * ```
 * @see {@link os.startTimer}
 */
declare function sleep(time: number): void;

/**
 * Writes a line of text to the screen without a newline at the end, wrapping
 * text if necessary.
 * @param text The text to write to the string.
 * @return The number of lines written.
 * @example
 * ```ts
 * write("Hello, world")
 * ```
 * @see {@link print} A wrapper around write that adds a newline and accepts
 * multiple arguments.
 */
declare function write(text: string): number;

/**
 * Prints the specified values to the screen separated by spaces, wrapping if
 * necessary. After printing, the cursor is moved to the next line.
 * @param args The values to print on the screen.
 * @return The number of lines written.
 * @example
 * ```ts
 * print("Hello, world!")
 * ```
 */
declare function print(...args: any[]): number;

/**
 * Prints the specified values to the screen in red, separated by spaces,
 * wrapping if necessary. After printing, the cursor is moved to the next
 * line.
 * @param args The values to print on the screen.
 * @example
 * ```ts
 * printError("Something went wrong!")
 * ```
 */
declare function printError(...args: any[]): void;

/**
 * Reads user input from the terminal. This automatically handles arrow keys,
 * pasting, character replacement, history scrollback, auto-completion, and
 * default values.
 *
 * @param replaceChar A character to replace each typed character with. This
 * can be used for hiding passwords, for example.
 * @param history A table holding history items that can be scrolled back to
 * with the up/down arrow keys. The oldest item is at index 1, while the
 * newest item is at the highest index.
 * @param completeFn A declare function to be used for completion. This declare function
 * should take the partial text typed so far, and returns a list of possible
 * completion options.
 * @param defaultText Default text which should already be entered into the
 * prompt.
 * @return The text typed in.
 * @example
 * // Read a string and echo it back to the user
 * ```ts
 * write("> ")
 * const msg = read()
 * print(msg)
 * ```
 * @example
 * // Prompt a user for a password.
 * ```ts
 * while (true) {
 *   write("Password> ")
 *   const pwd = read("*")
 *   if (pwd === "let me in") break
 *   print("Incorrect password, try again.")
 * }
 * print("Logged in!")
 * ```
 * @example
 * // A complete example with completion, history and a default value.
 * ```ts
 * import * as completion from "cc.completion";
 *
 * const history = [ "potato", "orange", "apple" ];
 * const choices = [ "apple", "orange", "banana", "strawberry" ];
 * write("> ");
 * const msg = read(undefined, history, (text) => completion.choice(text, choices), "app");
 * print(msg);
 * ```
 * @see {@link cc.completion} For declare functions to help with completion.
 * @remarks
 * - **Changed in version 1.74:** Added `completeFn` parameter.
 * - **Changed in version 1.80pr1:** Added `default` parameter.
 */
declare function read(
  replaceChar?: string,
  history?: string[],
  completeFn?: (partial: string) => string[] | undefined,
  defaultText?: string
): string;

/**
 * Stores the current ComputerCraft and Minecraft versions.
 *
 * Outside of Minecraft (for instance, in an emulator) _HOST will contain the
 * emulator's version instead.
 *
 * For example, ComputerCraft 1.93.0 (Minecraft 1.15.2).
 *
 * @example
 * // Print the current computer's environment.
 * ```ts
 * print(_HOST)
 * ```
 * @remarks
 * - **New in version 1.76**
 */
declare const _HOST: string;

/**
 * The default computer settings as defined in the ComputerCraft
 * configuration.
 *
 * This is a comma-separated list of settings pairs defined by the mod
 * configuration or server owner. By default, it is empty.
 *
 * An example value to disable autocompletion:
 * `shell.autocomplete=false,lua.autocomplete=false,edit.autocomplete=false`
 *
 * @example
 * ```ts
 * _CC_DEFAULT_SETTINGS
 * ```
 * @remarks
 * - **New in version 1.77**
 */
declare let _CC_DEFAULT_SETTINGS: string;
