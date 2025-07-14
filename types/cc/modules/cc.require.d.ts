/**
 * A pure Lua implementation of the builtin require function and package
 * library.
 *
 * Generally you do not need to use this module - it is injected into the every
 * program's environment. However, it may be useful when building a custom shell
 * or when running programs yourself.
 *
 * @example
 * - Construct the package and require function, and insert them into a custom environment.
 * ```ts
 * import * as cc_require from "cc.require";
 *
 * const env = setmetatable({}, { __index: _ENV });
 * const [customRequire, customPackage] = cc_require.make(env, "/");
 *
 * // Now we have our own require function, separate to the original.
 * const r2 = customRequire("cc.require");
 * print(cc_require, r2);
 * ```
 * @see {@link Reusing code with require} For an introduction on how to use
 * require.
 * @changed 1.88.0 New in version 1.88.0
 *
 * @noSelf
 */
declare module "cc.require" {
  /**
   * Build an implementation of Lua's package library, and a require function to
   * load modules within it.
   *
   * @param env The environment to load packages into.
   * @param dir The directory that relative packages are loaded from.
   * @returns `LuaMultiReturn<[(moduleName: string) => unknown, object]>` The
   * new require function and the new package library.
   * @source
   */
  function make(
    env: object,
    dir: string
  ): LuaMultiReturn<
    [
      /** The new require function. */
      (moduleName: string) => unknown,
      /** The new package library. */
      object
    ]
  >;
}
