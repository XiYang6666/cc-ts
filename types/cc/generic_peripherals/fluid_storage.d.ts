/**
 * Methods for interacting with tanks and other fluid storage blocks.
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface FluidStoragePeripheral extends BasePeripheral {
  /**
   * Get all "tanks" in this fluid storage.
   *
   * Each tank either contains some amount of fluid or is empty. Tanks with
   * fluids inside will return some basic information about the fluid, including
   * its name and amount.
   *
   * The returned table is sparse, and so empty tanks will be `nil` - it is
   * recommended to loop over using `pairs` rather than `ipairs`.
   * @returns Basic information about all fluids in this fluid storage.
   */
  tanks(): Array<FluidTankInfo | undefined>;

  /**
   * Move a fluid from one fluid container to another connected one.
   *
   * This allows you to pull fluid in the current fluid container to another
   * container on the same wired network. Both containers must attached to wired
   * modems which are connected via a cable.
   * @param toName The name of the peripheral/container to push to. This is the
   * string given to `peripheral.wrap`, and displayed by the wired modem.
   * @param limit The maximum amount of fluid to move.
   * @param fluidName The fluid to move. If not given, an arbitrary fluid will
   * be chosen.
   * @returns The amount of moved fluid.
   * @throws If the peripheral to transfer to doesn't exist or isn't an fluid
   * container.
   * @link peripheral.getName Allows you to get the name of a wrapped
   * peripheral.
   */
  pushFluid(toName: string, limit?: number, fluidName?: string): number;

  /**
   * Move a fluid from a connected fluid container into this one.
   *
   * This allows you to pull fluid in the current fluid container from another
   * container on the same wired network. Both containers must be attached to
   * wired modems which are connected via a cable.
   * @param fromName The name of the peripheral/container to push to. This is
   * the string given to `peripheral.wrap`, and displayed by the wired modem.
   * @param limit The maximum amount of fluid to move.
   * @param fluidName The fluid to move. If not given, an arbitrary fluid will
   * be chosen.
   * @returns The amount of moved fluid.
   * @throws If the peripheral to transfer to doesn't exist or isn't an fluid
   * container.
   * @link peripheral.getName Allows you to get the name of a wrapped
   * peripheral.
   */
  pullFluid(fromName: string, limit?: number, fluidName?: string): number;
}

/**
 * Basic information about a fluid tank.
 */
declare interface FluidTankInfo {
  /**
   * The name (ID) of the fluid (e.g., "minecraft:water").
   */
  name: string;
  /**
   * The amount of fluid in the tank, in millibuckets (mB).
   */
  amount: number;
  /**
   * The maximum capacity of this tank, in millibuckets (mB).
   */
  capacity?: number;
  /**
   * Optional NBT data for the fluid.
   */
  nbt?: string;
}
