/**
 * Methods for interacting with inventories.
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface InventoryPeripheral extends BasePeripheral {
  /**
   * Get the size of this inventory.
   * @returns The number of slots in this inventory.
   */
  size(): number;

  /**
   * List all items in this inventory. This returns a table, with an entry for each slot.
   *
   * Each item in the inventory is represented by a table containing some basic information,
   * much like {@link turtle.getItemDetail} includes. More information can be fetched with `getItemDetail`.
   * The table contains the item name, the count and a (potentially nil) hash of the item's nbt.
   * This NBT data doesn't contain anything useful, but allows you to distinguish identical items.
   *
   * The returned table is sparse, and so empty slots will be `nil` - it is recommended to loop over
   * using {@link pairs} rather than {@link ipairs}.
   * @returns Basic information about all items in this inventory.
   */
  list(): (ItemDetail | undefined)[];

  /**
   * Get detailed information about an item.
   *
   * The returned information contains the same information as each item in `list`, as well as
   * additional details like the display name (`displayName`), and item and item durability
   * (`damage`, `maxDamage`, `durability`).
   *
   * Some items include more information (such as enchantments) - it is recommended to print it out
   * using `textutils.serialize` or in the Lua REPL, to explore what is available.
   * @param slot The slot to get information about.
   * @returns Information about the item in this slot, or `undefined` if it is empty.
   * @throws If the slot is out of range.
   */
  getItemDetail(slot: number): ItemDetail | undefined;

  /**
   * Get the maximum number of items which can be stored in this slot.
   *
   * Typically this will be limited to 64 items. However, some inventories (such as barrels or caches)
   * can store hundreds or thousands of items in one slot.
   * @param slot The slot.
   * @returns The maximum number of items in this slot.
   * @throws If the slot is out of range.
   * @since 1.96.0
   */
  getItemLimit(slot: number): number;

  /**
   * Push items from one inventory to another connected one.
   *
   * This allows you to push an item in an inventory to another inventory on the same wired network.
   * Both inventories must attached to wired modems which are connected via a cable.
   * @param toName The name of the peripheral/inventory to push to. This is the string given to `peripheral.wrap`, and displayed by the wired modem.
   * @param fromSlot The slot in the current inventory to move items from.
   * @param limit The maximum number of items to move. Defaults to the current stack limit.
   * @param toSlot The slot in the target inventory to move to. If not given, the item will be inserted into any slot.
   * @returns The number of transferred items.
   * @throws If the peripheral to transfer to doesn't exist or isn't an inventory.
   * @throws If either source or destination slot is out of range.
   * @link peripheral.getName Allows you to get the name of a wrapped peripheral.
   */
  pushItems(
    toName: string,
    fromSlot: number,
    limit?: number,
    toSlot?: number
  ): number;

  /**
   * Pull items from a connected inventory into this one.
   *
   * This allows you to transfer items between inventories on the same wired network. Both this and
   * the source inventory must attached to wired modems which are connected via a cable.
   * @param fromName The name of the peripheral/inventory to pull from. This is the string given to `peripheral.wrap`, and displayed by the wired modem.
   * @param fromSlot The slot in the source inventory to move items from.
   * @param limit The maximum number of items to move. Defaults to the current stack limit.
   * @param toSlot The slot in current inventory to move to. If not given, the item will be inserted into any slot.
   * @returns The number of transferred items.
   * @throws If the peripheral to transfer to doesn't exist or isn't an inventory.
   * @throws If either source or destination slot is out of range.
   * @link peripheral.getName Allows you to get the name of a wrapped peripheral.
   */
  pullItems(
    fromName: string,
    fromSlot: number,
    limit?: number,
    toSlot?: number
  ): number;
}
