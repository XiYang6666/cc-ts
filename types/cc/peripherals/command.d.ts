/**
 * This peripheral allows you to interact with command blocks.
 *
 * Command blocks are only wrapped as peripherals if the `enable_command_block`
 * option is `true` within the config.
 *
 * > [!NOTE] This API is not the same as the `commands` API, which is exposed on
 * command computers.
 *
 * @noSelf
 */
declare interface CommandsPeripheral extends BasePeripheral {
  /**
   * Get the command this command block will run.
   * @returns The current command.
   */
  getCommand(): string;

  /**
   * Set the command block's command.
   * @param command The new command.
   */
  setCommand(command: string): void;

  /**
   * Execute the command block once.
   * @returns `true` if the command completed successfully, `false` otherwise.
   * @returns A tuple containing:
   * - `boolean`: `true` if the command completed successfully, `false`
   *   otherwise.
   * - `string | undefined`: A failure message if the command failed, otherwise
   *   `undefined`.
   */
  runCommand(): [boolean, string | undefined];
}
