/**
 * The redstone relay is a peripheral that allows reading and outputting
 * redstone signals. While this is not very useful on its own (as computers have
 * the same functionality built-in), this can be used with wired modems to
 * interact with multiple redstone signals from the same computer.
 *
 * The peripheral provides largely identical methods to a computer's built-in
 * redstone API, allowing setting signals on all six sides of the block ("top",
 * "bottom", "left", "right", "front" and "back").
 *
 * @since 1.114.0
 *
 * @noSelf
 */
declare interface RedstoneRelayPeripheral extends BasePeripheral {
  /**
   * Turn the redstone signal of a specific side on or off.
   * @param side The side to set.
   * @param on Whether the redstone signal should be on or off. When on, a
   * signal strength of 15 is emitted.
   */
  setOutput(side: string, on: boolean): void;

  /**
   * Get the current redstone output of a specific side.
   * @param side The side to get.
   * @returns Whether the redstone output is on or off.
   * @link setOutput
   */
  getOutput(side: string): boolean;

  /**
   * Get the current redstone input of a specific side.
   * @param side The side to get.
   * @returns Whether the redstone input is on or off.
   */
  getInput(side: string): boolean;

  /**
   * Set the redstone signal strength for a specific side.
   * @param side The side to set.
   * @param value The signal strength between 0 and 15.
   * @throws If value is not between 0 and 15.
   * @since 1.51
   */
  setAnalogOutput(side: string, value: number): void;

  /**
   * Set the redstone signal strength for a specific side.
   * @param side The side to set.
   * @param value The signal strength between 0 and 15.
   * @throws If value is not between 0 and 15.
   * @since 1.51
   */
  setAnalogueOutput(side: string, value: number): void;

  /**
   * Get the redstone output signal strength for a specific side.
   * @param side The side to get.
   * @returns The output signal strength, between 0 and 15.
   * @link setAnalogOutput
   * @since 1.51
   */
  getAnalogOutput(side: string): number;

  /**
   * Get the redstone output signal strength for a specific side.
   * @param side The side to get.
   * @returns The output signal strength, between 0 and 15.
   * @link setAnalogOutput
   * @since 1.51
   */
  getAnalogueOutput(side: string): number;

  /**
   * Get the redstone input signal strength for a specific side.
   * @param side The side to get.
   * @returns The input signal strength, between 0 and 15.
   * @since 1.51
   */
  getAnalogInput(side: string): number;

  /**
   * Get the redstone input signal strength for a specific side.
   * @param side The side to get.
   * @returns The input signal strength, between 0 and 15.
   * @since 1.51
   */
  getAnalogueInput(side: string): number;

  /**
   * Set the bundled cable output for a specific side.
   * @param side The side to set.
   * @param output The colour bitmask to set.
   * @link colors.subtract For removing a colour from the bitmask.
   * @link colors.combine For adding a color to the bitmask.
   */
  setBundledOutput(side: string, output: number): void;

  /**
   * Get the bundled cable output for a specific side.
   * @param side The side to get.
   * @returns The bundle cable's output.
   */
  getBundledOutput(side: string): number;

  /**
   * Get the bundled cable input for a specific side.
   * @param side The side to get.
   * @returns The bundle cable's input.
   * @link testBundledInput To determine if a specific colour is set.
   */
  getBundledInput(side: string): number;

  /**
   * Determine if a specific combination of colours are on for the given side.
   * @param side The side to test.
   * @param mask The mask to test.
   * @returns If the colours are on.
   * @link getBundledInput
   */
  testBundledInput(side: string, mask: number): boolean;
}
