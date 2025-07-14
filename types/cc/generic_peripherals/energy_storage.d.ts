/**
 * Methods for interacting with blocks which store energy.
 *
 * This works with energy storage blocks, as well as generators and machines
 * which consume energy.
 *
 * > [!NOTE] Due to limitations with Forge's energy API, it is not possible to
 * measure throughput (i.e. FE used/generated per tick).
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface EnergyStoragePeripheral extends BasePeripheral {
  /**
   * Get the energy of this block.
   * @returns The energy stored in this block, in FE.
   */
  getEnergy(): number;

  /**
   * Get the maximum amount of energy this block can store.
   * @returns The energy capacity of this block.
   */
  getEnergyCapacity(): number;
}
