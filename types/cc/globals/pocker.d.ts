/**
 * Control the current pocket computer, adding or removing upgrades.
 *
 * This API is only available on pocket computers. As such, you may use its
 * presence to determine what kind of computer you are using:
 * ```ts
 * if (pocket) {
 *   print("On a pocket computer");
 * } else {
 *   print("On something else");
 * }
 * ```
 *
 * @noSelf
 */
declare namespace pocket {
  /**
   * Search the player's inventory for another upgrade, replacing the existing
   * one with that item if found.
   *
   * This inventory search starts from the player's currently selected slot,
   * allowing you to prioritise upgrades.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>`
   *   - `boolean`: If an item was equipped.
   *   - `string | undefined`: The reason an item was not equipped.
   */
  function equipBack(): LuaMultiReturn<[true] | [false, reason: string]>;

  /**
   * Remove the pocket computer's current upgrade.
   *
   * @returns `LuaMultiReturn<[boolean, string | undefined]>`
   *   - `boolean`: If the upgrade was unequipped.
   *   - `string | undefined`: The reason an upgrade was not unequipped.
   */
  function unequipBack(): LuaMultiReturn<[true] | [false, reason: string]>;
}
