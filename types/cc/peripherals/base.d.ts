/**
 * Represents a peripheral wrapped by `peripheral.wrap`.
 * It allows direct calls to the peripheral's methods.
 *
 * @internal
 * @noSelf
 */
interface BasePeripheral {
  /**
   * Calls a method on the wrapped peripheral.
   * @param methodName The name of the method to call.
   * @param args Additional arguments to pass to the method.
   * @returns The return values of the peripheral method.
   */
  [methodName: string]: (...args: any[]) => any;
}
