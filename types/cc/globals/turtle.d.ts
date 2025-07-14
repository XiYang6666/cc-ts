/**
 * Turtles are a robotic device, which can break and place blocks, attack mobs,
 * and move about the world. They have an internal inventory of 16 slots,
 * allowing them to store blocks they have broken or would like to place.
 *
 * ### Movement
 * Turtles are capable of moving through the world. As turtles are blocks
 * themselves, they are confined to Minecraft's grid, moving a single block at a
 * time.
 *
 * {@link turtle.forward} and {@link turtle.back} move the turtle in the
 * direction it is facing, while {@link turtle.up} and {@link turtle.down} move
 * it up and down (as one might expect!). In order to move left or right, you
 * first need to turn the turtle using
 * {@link turtle.turnLeft}/{@link turtle.turnRight} and then move forward or
 * backwards.
 *
 * > [!INFO] The name "turtle" comes from Turtle graphics, which originated from
 * the Logo programming language. Here you'd move a turtle with various commands
 * like "move 10" and "turn left", much like ComputerCraft's turtles!
 *
 * Moving a turtle (though not turning it) consumes fuel. If a turtle does not
 * have any fuel, it won't move, and the movement functions will return `false`.
 * If your turtle isn't going anywhere, the first thing to check is if you've
 * fuelled your turtle.
 *
 * ### Handling errors
 * Many turtle functions can fail in various ways. For instance, a turtle cannot
 * move forward if there's already a block there. Instead of erroring, functions
 * which can fail either return `true` if they succeed, or `false` and some
 * error message if they fail.
 *
 * Unexpected failures can often lead to strange behaviour. It's often a good
 * idea to check the return values of these functions, or wrap them in `assert`
 * (for instance, use `assert(turtle.forward())` rather than
 * `turtle.forward()`), so the program doesn't misbehave.
 *
 * ### Turtle upgrades
 * While a normal turtle can move about the world and place blocks, its
 * functionality is limited. Thankfully, turtles can be upgraded with upgrades.
 * Turtles have two upgrade slots, one on the left and right sides. Upgrades can
 * be equipped by crafting a turtle with the upgrade, or calling the
 * {@link turtle.equipLeft}/{@link turtle.equipRight} functions.
 *
 * By default, any diamond tool may be used as an upgrade (though more may be
 * added with datapacks). The diamond pickaxe may be used to break blocks (with
 * {@link turtle.dig}), while the sword can attack entities
 * ({@link turtle.attack}). Other tools have more niche use-cases, for instance
 * hoes can til dirt.
 *
 * Some peripherals (namely speakers and Ender and Wireless modems) can also be
 * equipped as upgrades. These are then accessible by accessing the "left" or
 * "right" peripheral.
 *
 * @changed 1.3 New in version 1.3
 * @noSelf
 */
declare namespace turtle {
  /**
   * Craft a recipe based on the turtle's inventory. The turtle's inventory
   * should set up like a crafting grid. For instance, to craft sticks, slots 1
   * and 5 should contain planks. All other slots should be empty, including
   * those outside the crafting "grid".
   *
   * @param limit The maximum number of crafting steps to run. Defaults to `64`.
   * @returns `true` If crafting succeeds.
   * @returns `LuaMultiReturn<[false, string]>` If crafting fails, returns
   * `false` and a string describing why.
   * @throws When `limit` is less than 1 or greater than 64.
   * @changed 1.4 New in version 1.4
   */
  function craft(
    limit?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * The builtin turtle API, without any generated helper functions.
   *
   * > [!DEPRECATED] Historically this table behaved differently to the main
   * turtle API, but this is no longer the case. You should not need to use it.
   */
  const native: typeof turtle;

  /**
   * Move the turtle forward one block.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully move, and the reason it could not move if it failed.
   */
  function forward(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Move the turtle backwards one block.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully move, and the reason it could not move if it failed.
   */
  function back(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Move the turtle up one block.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully move, and the reason it could not move if it failed.
   */
  function up(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Move the turtle down one block.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully move, and the reason it could not move if it failed.
   */
  function down(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Rotate the turtle 90 degrees to the left.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully turn, and the reason it could not turn if it failed.
   */
  function turnLeft(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Rotate the turtle 90 degrees to the right.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the turtle
   * could successfully turn, and the reason it could not turn if it failed.
   */
  function turnRight(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Attempt to break the block in front of the turtle.
   *
   * This requires a turtle tool capable of breaking the block. Diamond pickaxes
   * (mining turtles) can break any vanilla block, but other tools (such as
   * axes) are more limited.
   *
   * @param side The specific tool to use. Should be `"left"` or `"right"`.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether a block
   * was broken, and the reason no block was broken if it failed.
   * @changed 1.6 Added optional `side` argument.
   */
  function dig(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Attempt to break the block above the turtle. See {@link turtle.dig} for
   * full details.
   *
   * @param side The specific tool to use.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether a block
   * was broken, and the reason no block was broken if it failed.
   * @changed 1.6 Added optional `side` argument.
   */
  function digUp(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Attempt to break the block below the turtle. See {@link turtle.dig} for
   * full details.
   *
   * @param side The specific tool to use.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether a block
   * was broken, and the reason no block was broken if it failed.
   * @changed 1.6 Added optional `side` argument.
   */
  function digDown(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Place a block or item into the world in front of the turtle.
   *
   * "Placing" an item allows it to interact with blocks and entities in front
   * of the turtle. For instance, buckets can pick up and place down fluids, and
   * wheat can be used to breed cows. However, you cannot use `place` to perform
   * arbitrary block interactions, such as clicking buttons or flipping levers.
   *
   * @param text When placing a sign, set its contents to this text.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the block
   * could be placed, and the reason the block was not placed if it failed.
   * @changed 1.4 New in version 1.4
   */
  function place(
    text?: string
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Place a block or item into the world above the turtle.
   *
   * @param text When placing a sign, set its contents to this text.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the block
   * could be placed, and the reason the block was not placed if it failed.
   * @see {@link turtle.place} For more information about placing items.
   * @changed 1.4 New in version 1.4
   */
  function placeUp(
    text?: string
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Place a block or item into the world below the turtle.
   *
   * @param text When placing a sign, set its contents to this text.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether the block
   * could be placed, and the reason the block was not placed if it failed.
   * @see {@link turtle.place} For more information about placing items.
   * @changed 1.4 New in version 1.4
   */
  function placeDown(
    text?: string
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Drop the currently selected stack into the inventory in front of the
   * turtle, or as an item into the world if there is no inventory.
   *
   * @param count The number of items to drop. If not given, the entire stack
   * will be dropped.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * dropped, and the reason no items were dropped if it failed.
   * @throws If dropping an invalid number of items.
   * @see {@link turtle.select}
   * @changed 1.31 New in version 1.31
   */
  function drop(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Drop the currently selected stack into the inventory above the turtle, or
   * as an item into the world if there is no inventory.
   *
   * @param count The number of items to drop. If not given, the entire stack
   * will be dropped.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * dropped, and the reason no items were dropped if it failed.
   * @throws If dropping an invalid number of items.
   * @see {@link turtle.select}
   * @changed 1.4 New in version 1.4
   */
  function dropUp(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Drop the currently selected stack into the inventory below the turtle, or
   * as an item into the world if there is no inventory.
   *
   * @param count The number of items to drop. If not given, the entire stack
   * will be dropped.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * dropped, and the reason no items were dropped if it failed.
   * @throws If dropping an invalid number of items.
   * @see {@link turtle.select}
   * @changed 1.4 New in version 1.4
   */
  function dropDown(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Change the currently selected slot.
   *
   * The selected slot determines what slot actions like {@link turtle.drop} or
   * {@link turtle.getItemCount} act on.
   *
   * @param slot The slot to select (1-16).
   * @returns `true` When the slot has been selected.
   * @throws If the slot is out of range.
   * @see {@link turtle.getSelectedSlot}
   */
  function select(slot: number): boolean;

  /**
   * Get the number of items in the given slot.
   *
   * @param slot The slot we wish to check. Defaults to the selected slot.
   * @returns The number of items in this slot.
   * @throws If the slot is out of range.
   */
  function getItemCount(slot?: number): number;

  /**
   * Get the remaining number of items which may be stored in this stack.
   *
   * For instance, if a slot contains 13 blocks of dirt, it has room for another
   * 51.
   *
   * @param slot The slot we wish to check. Defaults to the selected slot.
   * @returns The space left in this slot.
   * @throws If the slot is out of range.
   */
  function getItemSpace(slot?: number): number;

  /**
   * Check if there is a solid block in front of the turtle. In this case, solid
   * refers to any non-air or liquid block.
   *
   * @returns If there is a solid block in front.
   */
  function detect(): boolean;

  /**
   * Check if there is a solid block above the turtle. In this case, solid
   * refers to any non-air or liquid block.
   *
   * @returns If there is a solid block above.
   */
  function detectUp(): boolean;

  /**
   * Check if there is a solid block below the turtle. In this case, solid
   * refers to any non-air or liquid block.
   *
   * @returns If there is a solid block below.
   */
  function detectDown(): boolean;

  /**
   * Check if the block in front of the turtle is equal to the item in the
   * currently selected slot.
   *
   * @returns If the block and item are equal.
   * @changed 1.31 New in version 1.31
   */
  function compare(): boolean;

  /**
   * Check if the block above the turtle is equal to the item in the currently
   * selected slot.
   *
   * @returns If the block and item are equal.
   * @changed 1.31 New in version 1.31
   */
  function compareUp(): boolean;

  /**
   * Check if the block below the turtle is equal to the item in the currently
   * selected slot.
   *
   * @returns If the block and item are equal.
   * @changed 1.31 New in version 1.31
   */
  function compareDown(): boolean;

  /**
   * Attack the entity in front of the turtle.
   *
   * @param side The specific tool to use.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether an entity
   * was attacked, and the reason nothing was attacked if it failed.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added optional `side` argument.
   */
  function attack(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Attack the entity above the turtle.
   *
   * @param side The specific tool to use.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether an entity
   * was attacked, and the reason nothing was attacked if it failed.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added optional `side` argument.
   */
  function attackUp(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Attack the entity below the turtle.
   *
   * @param side The specific tool to use.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether an entity
   * was attacked, and the reason nothing was attacked if it failed.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added optional `side` argument.
   */
  function attackDown(
    side?: "left" | "right"
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Suck an item from the inventory in front of the turtle, or from an item
   * floating in the world.
   *
   * This will pull items into the first acceptable slot, starting at the
   * currently selected one.
   *
   * @param count The number of items to suck. If not given, up to a stack of
   * items will be picked up.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * picked up, and the reason no items were picked up if it failed.
   * @throws If given an invalid number of items.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added an optional `limit` argument.
   */
  function suck(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;
  /**
   * Suck an item from the inventory above the turtle, or from an item floating
   * in the world.
   *
   * @param count The number of items to suck. If not given, up to a stack of
   * items will be picked up.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * picked up, and the reason no items were picked up if it failed.
   * @throws If given an invalid number of items.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added an optional `limit` argument.
   */
  function suckUp(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Suck an item from the inventory below the turtle, or from an item floating
   * in the world.
   *
   * @param count The number of items to suck. If not given, up to a stack of
   * items will be picked up.
   * @returns `LuaMultiReturn<[boolean, string | undefined]>` Whether items were
   * picked up, and the reason no items were picked up if it failed.
   * @throws If given an invalid number of items.
   * @changed 1.4 New in version 1.4
   * @changed 1.6 Added an optional `limit` argument.
   */
  function suckDown(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Get the maximum amount of fuel this turtle currently holds.
   *
   * @returns The current amount of fuel a turtle this turtle has, or
   * `"unlimited"` if turtles do not consume fuel when moving.
   * @see {@link turtle.getFuelLimit}
   * @see {@link turtle.refuel}
   * @changed 1.4 New in version 1.4
   */
  function getFuelLevel(): number | "unlimited";

  /**
   * Refuel this turtle.
   *
   * While most actions a turtle can perform (such as digging or placing blocks)
   * are free, moving consumes fuel from the turtle's internal buffer. If a
   * turtle has no fuel, it will not move.
   *
   * `refuel` refuels the turtle, consuming fuel items (such as coal or lava
   * buckets) from the currently selected slot and converting them into energy.
   * This finishes once the turtle is fully refuelled or all items have been
   * consumed.
   *
   * @param count The maximum number of items to consume. One can pass `0` to
   * check if an item is combustable or not.
   * @returns `true` If the turtle was refuelled.
   * @returns `LuaMultiReturn<[false, string]>` If the turtle was not refuelled,
   * returns `false` and the reason.
   * @throws If the refuel count is out of range.
   * @example
   * - Refuel a turtle from the currently selected slot.
   * ```ts
   * const level = turtle.getFuelLevel();
   * if (level === "unlimited") error("Turtle does not need fuel", 0);
   *
   * const [ok, err] = turtle.refuel();
   * if (ok) {
   *   const new_level = turtle.getFuelLevel();
   *   print(`Refuelled ${new_level - (level as number)}, current level is ${new_level}`);
   * } else {
   *   printError(err);
   * }
   * ```
   * @example
   * - Check if the current item is a valid fuel source.
   * ```ts
   * const [is_fuel, reason] = turtle.refuel(0);
   * if (!is_fuel) printError(reason);
   * ```
   * @see {@link turtle.getFuelLevel}
   * @see {@link turtle.getFuelLimit}
   * @changed 1.4 New in version 1.4
   */
  function refuel(
    count?: number
  ): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Compare the item in the currently selected slot to the item in another
   * slot.
   *
   * @param slot The slot to compare to.
   * @returns If the two items are equal.
   * @throws If the slot is out of range.
   * @changed 1.4 New in version 1.4
   */
  function compareTo(slot: number): boolean;

  /**
   * Move an item from the selected slot to another one.
   *
   * @param slot The slot to move this item to.
   * @param count The maximum number of items to move.
   * @returns If some items were successfully moved.
   * @throws If the slot is out of range.
   * @throws If the number of items is out of range.
   * @changed 1.45 New in version 1.45
   */
  function transferTo(slot: number, count?: number): boolean;

  /**
   * Get the currently selected slot.
   *
   * @returns The current slot.
   * @see {@link turtle.select}
   * @changed 1.6 New in version 1.6
   */
  function getSelectedSlot(): number;

  /**
   * Get the maximum amount of fuel this turtle can hold.
   *
   * By default, normal turtles have a limit of 20,000 and advanced turtles of
   * 100,000.
   *
   * @returns The maximum amount of fuel a turtle can hold, or `"unlimited"` if
   * turtles do not consume fuel when moving.
   * @see {@link turtle.getFuelLevel}
   * @see {@link turtle.refuel}
   * @changed 1.6 New in version 1.6
   */
  function getFuelLimit(): number | "unlimited";

  /**
   * Equip (or unequip) an item on the left side of this turtle.
   *
   * This finds the item in the currently selected slot and attempts to equip it
   * to the left side of the turtle. The previous upgrade is removed and placed
   * into the turtle's inventory. If there is no item in the slot, the previous
   * upgrade is removed, but no new one is equipped.
   *
   * @returns `true` If the item was equipped.
   * @returns `LuaMultiReturn<[false, string]>` If we could not equip the item,
   * returns `false` and the reason.
   * @see {@link turtle.equipRight}
   * @see {@link turtle.getEquippedLeft}
   * @changed 1.6 New in version 1.6
   */
  function equipLeft(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Equip (or unequip) an item on the right side of this turtle.
   *
   * This finds the item in the currently selected slot and attempts to equip it
   * to the right side of the turtle. The previous upgrade is removed and placed
   * into the turtle's inventory. If there is no item in the slot, the previous
   * upgrade is removed, but no new one is equipped.
   *
   * @returns `true` If the item was equipped.
   * @returns `LuaMultiReturn<[false, string]>` If we could not equip the item,
   * returns `false` and the reason.
   * @see {@link turtle.equipLeft}
   * @see {@link turtle.getEquippedRight}
   * @changed 1.6 New in version 1.6
   */
  function equipRight(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Get the upgrade currently equipped on the left of the turtle.
   *
   * This returns information about the currently equipped item, in the same
   * form as {@link turtle.getItemDetail}.
   *
   * @returns Information about the currently equipped item, or `undefined` if
   * no upgrade is equipped.
   * @see {@link turtle.equipLeft}
   * @changed 1.116.0 New in version 1.116.0
   */
  function getEquippedLeft(): ItemDetail | undefined;

  /**
   * Get the upgrade currently equipped on the right of the turtle.
   *
   * This returns information about the currently equipped item, in the same
   * form as {@link turtle.getItemDetail}.
   *
   * @returns Information about the currently equipped item, or `undefined` if
   * no upgrade is equipped.
   * @see {@link turtle.equipRight}
   * @changed 1.116.0 New in version 1.116.0
   */
  function getEquippedRight(): ItemDetail | undefined;

  /**
   * Get information about the block in front of the turtle.
   *
   * @returns `LuaMultiReturn<[boolean, BlockInfo | string]>` Whether there is a
   * block in front of the turtle, and information about the block or a message
   * explaining that there is no block.
   * @example
   * ```ts
   * const [has_block, data] = turtle.inspect();
   * if (has_block) {
   *   print(textutils.serialise(data));
   *   // {
   *   //   name = "minecraft:oak_log",
   *   //   state = { axis = "x" },
   *   //   tags = { ["minecraft:logs"] = true, ... },
   *   // }
   * } else {
   *   print("No block in front of the turtle");
   * }
   * ```
   * @changed 1.64 New in version 1.64
   * @changed 1.76 Added block state to return value.
   */
  function inspect(): LuaMultiReturn<[true, BlockInfo] | [false, string]>;

  /**
   * Get information about the block above the turtle.
   *
   * @returns `LuaMultiReturn<[boolean, BlockInfo | string]>` Whether there is a
   * block above the turtle, and information about the block or a message
   * explaining that there is no block.
   * @changed 1.64 New in version 1.64
   */
  function inspectUp(): LuaMultiReturn<[true, BlockInfo] | [false, string]>;

  /**
   * Get information about the block below the turtle.
   *
   * @returns `LuaMultiReturn<[boolean, BlockInfo | string]>` Whether there is a
   * block below the turtle, and information about the block or a message
   * explaining that there is no block.
   * @changed 1.64 New in version 1.64
   */
  function inspectDown(): LuaMultiReturn<[true, BlockInfo] | [false, string]>;

  /**
   * Get detailed information about the items in the given slot.
   *
   * @param slot The slot to get information about. Defaults to the selected
   * slot.
   * @param detailed Whether to include "detailed" information. When `true` the
   * method will contain much more information about the item at the cost of
   * taking longer to run.
   * @returns Information about the item in this slot, or `undefined` if it is
   * empty.
   * @throws If the slot is out of range.
   * @example
   * - Print the current slot, assuming it contains 13 dirt.
   * ```ts
   * print(textutils.serialise(turtle.getItemDetail()));
   * // => {
   * //  name = "minecraft:dirt",
   * //  count = 13,
   * // }
   * ```
   * @see {@link InventoryPeripheral.getItemDetail} Describes the information returned by
   * a detailed query.
   * @changed 1.64 New in version 1.64
   * @changed 1.90.0 Added `detailed` parameter.
   */
  function getItemDetail(
    slot?: number,
    detailed?: boolean
  ): ItemDetail | undefined;
}
