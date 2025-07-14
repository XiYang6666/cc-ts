/**
 * Get and set redstone signals adjacent to this computer.
 *
 * The redstone library exposes three "types" of redstone control:
 * - Binary input/output ({@link redstone.setOutput}/{@link redstone.getInput}): These simply check if a redstone wire has any input or output. A signal strength of 1 and 15 are treated the same.
 * - Analogue input/output ({@link redstone.setAnalogOutput}/{@link redstone.getAnalogInput}): These work with the actual signal strength of the redstone wired, from 0 to 15.
 * - Bundled cables ({@link redstone.setBundledOutput}/{@link redstone.getBundledInput}): These interact with "bundled" cables, such as those from Project:Red. These allow you to send 16 separate on/off signals. Each channel corresponds to a colour, with the first being `colors.white` and the last `colors.black`.
 *
 * Whenever a redstone input changes, a `redstone` event will be fired. This may be used instead of repeativly polling.
 *
 * This module may also be referred to as `rs`. For example, one may call `rs.getSides()` instead of `redstone.getSides()`.
 *
 * @noSelf
 */
declare namespace redstone {
  /**
   * Represents a side of the computer.
   * @internal
   */
  type Side = "top" | "bottom" | "left" | "right" | "front" | "back";

  /**
   * Returns a table containing the six sides of the computer. Namely, "top", "bottom", "left", "right", "front" and "back".
   *
   * @returns A table of valid sides.
   * @changed 1.2 New in version 1.2
   */
  function getSides(): Side[];

  /**
   * Turn the redstone signal of a specific side on or off.
   *
   * @param side The side to set.
   * @param on Whether the redstone signal should be on or off. When on, a signal strength of 15 is emitted.
   * @example
   * - Toggle the redstone signal above the computer every 0.5 seconds.
   * ```ts
   *  while (true) {
   *    redstone.setOutput("top", !redstone.getOutput("top"));
   *    sleep(0.5);
   *  }
   * ```
   */
  function setOutput(side: Side, on: boolean): void;

  /**
   * Get the current redstone output of a specific side.
   *
   * @param side The side to get.
   * @returns Whether the redstone output is on or off.
   * @see {@link redstone.setOutput}
   */
  function getOutput(side: Side): boolean;

  /**
   * Get the current redstone input of a specific side.
   *
   * @param side The side to get.
   * @returns Whether the redstone input is on or off.
   */
  function getInput(side: Side): boolean;

  /**
   * Set the redstone signal strength for a specific side.
   *
   * @param side The side to set.
   * @param value The signal strength between 0 and 15.
   * @throws If value is not between 0 and 15.
   * @changed 1.51 New in version 1.51
   */
  function setAnalogOutput(side: Side, value: number): void;

  /**
   * Set the redstone signal strength for a specific side.
   *
   * @param side The side to set.
   * @param value The signal strength between 0 and 15.
   * @throws If value is not between 0 and 15.
   * @changed 1.51 New in version 1.51
   */
  function setAnalogueOutput(side: Side, value: number): void;

  /**
   * Get the redstone output signal strength for a specific side.
   *
   * @param side The side to get.
   * @returns The output signal strength, between 0 and 15.
   * @see {@link redstone.setAnalogOutput}
   * @changed 1.51 New in version 1.51
   */
  function getAnalogOutput(side: Side): number;

  /**
   * Get the redstone output signal strength for a specific side.
   *
   * @param side The side to get.
   * @returns The output signal strength, between 0 and 15.
   * @see {@link redstone.setAnalogOutput}
   * @changed 1.51 New in version 1.51
   */
  function getAnalogueOutput(side: Side): number;

  /**
   * Get the redstone input signal strength for a specific side.
   *
   * @param side The side to get.
   * @returns The input signal strength, between 0 and 15.
   * @changed 1.51 New in version 1.51
   * @example
   * - Mimic a redstone comparator in subtraction mode.
   * ```ts
   * while (true) {
   *   const rear = rs.getAnalogueInput("back");
   *   const sides = math.max(rs.getAnalogueInput("left"), rs.getAnalogueInput("right"));
   *   rs.setAnalogueOutput("front", math.max(rear - sides, 0));
   *
   *   os.pullEvent("redstone"); // Wait for a change to inputs.
   * }
   * ```
   */
  function getAnalogInput(side: Side): number;

  /**
   * Get the redstone input signal strength for a specific side.
   *
   * @param side The side to get.
   * @returns The input signal strength, between 0 and 15.
   * @changed 1.51 New in version 1.51
   */
  function getAnalogueInput(side: Side): number;

  /**
   * Set the bundled cable output for a specific side.
   *
   * @param side The side to set.
   * @param output The colour bitmask to set.
   * @see {@link colors.subtract} For removing a colour from the bitmask.
   * @see {@link colors.combine} For adding a color to the bitmask.
   */
  function setBundledOutput(side: Side, output: number): void;

  /**
   * Get the bundled cable output for a specific side.
   *
   * @param side The side to get.
   * @returns The bundle cable's output.
   */
  function getBundledOutput(side: Side): number;

  /**
   * Get the bundled cable input for a specific side.
   *
   * @param side The side to get.
   * @returns The bundle cable's input.
   * @see {@link redstone.testBundledInput} To determine if a specific colour is set.
   */
  function getBundledInput(side: Side): number;

  /**
   * Determine if a specific combination of colours are on for the given side.
   *
   * @param side The side to test.
   * @param mask The mask to test.
   * @returns If the colours are on.
   * @example
   * - Check if `colors.white` and `colors.black` are on above this block.
   * ```ts
   * print(redstone.testBundledInput("top", colors.combine(colors.white, colors.black)));
   * ```
   * @see {@link redstone.getBundledInput}
   */
  function testBundledInput(side: Side, mask: number): boolean;
}

/**
 * This module may also be referred to as `redstone`.
 * @noSelf
 */
declare const rs: typeof redstone;
