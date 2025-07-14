/**
 * Find and control peripherals attached to this computer.
 *
 * Peripherals are blocks (or turtle and pocket computer upgrades) which can be
 * controlled by a computer. For instance, the speaker peripheral allows a
 * computer to play music and the monitor peripheral allows you to display text
 * in the world.
 *
 * ### Referencing peripherals
 * Computers can interact with adjacent peripherals. Each peripheral is given a
 * name based on which direction it is in. For instance, a disk drive below your
 * computer will be called "bottom" in your Lua code, one to the left called
 * "left", and so on for all 6 directions ("bottom", "top", "left", "right",
 * "front", "back").
 *
 * You can list the names of all peripherals with the `peripherals` program, or
 * the {@link peripheral.getNames} function.
 *
 * It's also possible to use peripherals which are further away from your
 * computer through the use of Wired Modems. Place one modem against your
 * computer (you may need to sneak and right click), run Networking Cable to
 * your peripheral, and then place another modem against that block. You can
 * then right click the modem to use (or attach) the peripheral. This will print
 * a peripheral name to chat, which can then be used just like a direction name
 * to access the peripheral. You can click on the message to copy the name to
 * your clipboard.
 *
 * ### Using peripherals
 * Once you have the name of a peripheral, you can call functions on it using
 * the {@link peripheral.call} function. This takes the name of our peripheral,
 * the name of the function we want to call, and then its arguments.
 *
 * > [!INFO] Some bits of the peripheral API call peripheral functions methods
 * instead (for example, the {@link peripheral.getMethods} function). Don't
 * worry, they're the same thing!
 *
 * Let's say we have a monitor above our computer (and so "top") and want to
 * write some text to it. We'd write the following:
 * ```ts
 * peripheral.call("top", "write", "This is displayed on a monitor!");
 * ```
 * Once you start calling making a couple of peripheral calls this can get very
 * repetitive, and so we can wrap a peripheral. This builds a table of all the
 * peripheral's functions so you can use it like an API or module.
 *
 * For instance, we could have written the above example as follows:
 * ```ts
 * const my_monitor = peripheral.wrap("top");
 * if (my_monitor) {
 *   my_monitor.write("This is displayed on a monitor!");
 * }
 * ```
 *
 * ### Finding peripherals
 * Sometimes when you're writing a program you don't care what a peripheral is
 * called, you just need to know it's there. For instance, if you're writing a
 * music player, you just need a speaker - it doesn't matter if it's above or
 * below the computer.
 *
 * Thankfully there's a quick way to do this: {@link peripheral.find}. This
 * takes a peripheral type and returns all the attached peripherals which are of
 * this type.
 *
 * What is a peripheral type though? This is a string which describes what a
 * peripheral is, and so what functions are available on it. For instance,
 * speakers are just called "speaker", and monitors "monitor". Some peripherals
 * might have more than one type - a Minecraft chest is both a "minecraft:chest"
 * and "inventory".
 *
 * You can get all the types a peripheral has with {@link peripheral.getType},
 * and check a peripheral is a specific type with {@link peripheral.hasType}.
 *
 * To return to our original example, let's use {@link peripheral.find} to find
 * an attached speaker:
 * ```ts
 * const [speaker] = peripheral.find("speaker");
 * if (speaker) {
 *   speaker.playNote("harp");
 * }
 * ```
 * @see peripheral This event is fired whenever a new peripheral is attached.
 * @see peripheral_detach This event is fired whenever a peripheral is detached.
 * @changed 1.3 New in version 1.3
 * @changed 1.51 Add support for wired modems.
 * @changed 1.99 Peripherals can have multiple types.
 *
 * @noSelf
 */
declare namespace peripheral {
  /**
   * Provides a list of all peripherals available.
   *
   * If a device is located directly next to the system, then its name will be
   * listed as the side it is attached to. If a device is attached via a Wired
   * Modem, then it'll be reported according to its name on the wired network.
   *
   * @returns A list of the names of all attached peripherals.
   * @changed 1.51 New in version 1.51
   */
  function getNames(): string[];

  /**
   * Determines if a peripheral is present with the given name.
   *
   * @param name The side or network name that you want to check.
   * @returns If a peripheral is present with the given name.
   * @example
   * ```ts
   * peripheral.isPresent("top");
   * peripheral.isPresent("monitor_0");
   * ```
   */
  function isPresent(name: string): boolean;

  /**
   * Get the types of a named or wrapped peripheral.
   *
   * @param peripheral The name of the peripheral to find, or a wrapped
   * peripheral instance.
   * @returns The peripheral's types, or `undefined` if it is not present.
   * @example
   * - Get the type of a peripheral above this computer.
   * ```ts
   * peripheral.getType("top");
   * ```
   * @changed 1.88.0 Accepts a wrapped peripheral as an argument.
   * @changed 1.99 Now returns multiple types.
   */
  function getType(
    peripheral: string | BasePeripheral
  ): LuaMultiReturn<string[] | [undefined]>;

  /**
   * Check if a peripheral is of a particular type.
   *
   * @param peripheral The name of the peripheral or a wrapped peripheral
   * instance.
   * @param peripheral_type The type to check.
   * @returns If a peripheral has a particular type, or `undefined` if it is not
   * present.
   * @changed 1.99 New in version 1.99
   */
  function hasType(
    peripheral: string | BasePeripheral,
    peripheral_type: string
  ): boolean | undefined;

  /**
   * Get all available methods for the peripheral with the given name.
   *
   * @param name The name of the peripheral to find.
   * @returns A list of methods provided by this peripheral, or `undefined` if
   * it is not present.
   */
  function getMethods(name: string): string[] | undefined;

  /**
   * Get the name of a peripheral wrapped with {@link peripheral.wrap}.
   *
   * @param peripheral The peripheral to get the name of.
   * @returns The name of the given peripheral.
   * @changed 1.88.0 New in version 1.88.0
   */
  function getName(peripheral: BasePeripheral): string;

  /**
   * Call a method on the peripheral with the given name.
   *
   * @param name The name of the peripheral to invoke the method on.
   * @param method The name of the method
   * @param args Additional arguments to pass to the method
   * @returns The return values of the peripheral method.
   * @example
   * - Open the modem on the top of this computer.
   * ```ts
   * peripheral.call("top", "open", 1);
   * ```
   */
  function call(name: string, method: string, ...args: any[]): any;

  /**
   * Get a table containing all functions available on a peripheral. These can
   * then be called instead of using {@link peripheral.call} every time.
   *
   * @param name The name of the peripheral to wrap.
   * @returns The table containing the peripheral's methods, or `undefined` if
   * there is no peripheral present with the given name.
   * @example
   * - Open the modem on the top of this computer.
   * ```ts
   * const modem = peripheral.wrap("top");
   * if (modem) {
   *   modem.open(1);
   * }
   * ```
   */
  function wrap(name: string): BasePeripheral | undefined;

  /**
   * Find all peripherals of a specific type, and return the wrapped
   * peripherals.
   *
   * @param ty The type of peripheral to look for.
   * @param filter A filter function, which takes the peripheral's name and
   * wrapped table and returns if it should be included in the result.
   * @returns 0 or more wrapped peripherals matching the given filters.
   * @example
   * - Find all monitors and store them in a table, writing "Hello" on each one.
   * ```ts
   * const monitors = [...peripheral.find("monitor")]; // Use spread to collect multiple returns into an array
   * for (const monitor of monitors) {
   *   monitor.write("Hello");
   * }
   * ```
   * @example
   * - Find all wireless modems connected to this computer.
   * ```ts
   * const modems = [...peripheral.find("modem", (name, modem) => {
   *   return modem.isWireless()[0];
   * })];
   * ```
   * @example
   * - This abuses the filter argument to call `rednet.open` on every modem.
   * ```ts
   * peripheral.find("modem", rednet.open);
   * ```
   * @changed 1.6 New in version 1.6
   */
  function find(
    ty: string,
    filter?: (name: string, wrapped: BasePeripheral) => boolean
  ): LuaMultiReturn<BasePeripheral[]>;
}
