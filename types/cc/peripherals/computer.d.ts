/**
 * A computer or turtle wrapped as a peripheral.
 *
 * This allows for basic interaction with adjacent computers. Computers wrapped
 * as peripherals will have the type `computer` while turtles will be `turtle`.
 *
 * @noSelf
 */
declare interface ComputerPeripheral extends BasePeripheral {
  /**
   * Turn the other computer on.
   */
  turnOn(): void;

  /**
   * Shutdown the other computer.
   */
  shutdown(): void;

  /**
   * Reboot or turn on the other computer.
   */
  reboot(): void;

  /**
   * Get the other computer's ID.
   * @returns The computer's ID.
   * @see {@link os.getComputerID} To get your computer's ID.
   */
  getID(): number;

  /**
   * Determine if the other computer is on.
   * @returns `true` if the computer is on, `false` otherwise.
   */
  isOn(): boolean;

  /**
   * Get the other computer's label.
   * @returns The computer's label, or `undefined` if it has none.
   * @see {@link  os.getComputerLabel} To get your label.
   */
  getLabel(): string | undefined;
}
