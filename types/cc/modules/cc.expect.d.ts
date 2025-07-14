/**
 * The `cc.expect` library provides helper functions for verifying that function
 * arguments are well-formed and of the correct type.
 *
 * @example
 * - Define a basic function and check it has the correct arguments.
 * ```ts
 * import expectLib = require("cc.expect");
 * // When using `export = expect`, `expectLib` itself is the callable function.
 * // The `field` and `range` functions are properties of `expectLib`.
 * const expect = expectLib;
 * const field = expectLib.field;
 *
 * function add_person(name: string, info?: { age?: number; gender?: string }) {
 *   expect(1, name, "string");
 *   expect(2, info, "table", "nil");
 *
 *   if (info) {
 *     print("Got age=", field(info, "age", "number"));
 *     print("Got gender=", field(info, "gender", "string", "nil"));
 *   }
 * }
 *
 * add_person("Anastazja"); // `info` is optional
 * add_person("Kion", { age: 23 }); // `gender` is optional
 * // add_person("Caoimhin", { age: 23, gender: true }); // This would throw at runtime
 * ```
 * @changed 1.84.0 New in version 1.84.0
 * @changed 1.96.0 The module can now be called directly as a function, which
 * wraps around `expect.expect`.
 *
 * @noSelf
 */
declare module "cc.expect" {
  /**
   * Expect an argument to have a specific type.
   *
   * @param index The 1-based argument index.
   * @param value The argument's value.
   * @param types The allowed types of the argument.
   * @returns The given value.
   * @throws If the value is not one of the allowed types.
   */
  export function expect<T>(
    index: number,
    value: T,
    ...types: LuaTypeString[]
  ): T;

  /**
   * Expect a field to have a specific type.
   *
   * @param tbl The table to index.
   * @param index The field name to check.
   * @param types The allowed types of the argument.
   * @returns The contents of the given field.
   * @throws If the field is not one of the allowed types.
   */
  export function field<T>(
    tbl: object,
    index: string,
    ...types: LuaTypeString[]
  ): T;

  /**
   * Expect a number to be within a specific range.
   *
   * @param num The value to check.
   * @param min The minimum value. Defaults to `-Infinity`.
   * @param max The maximum value. Defaults to `Infinity`.
   * @returns The given value.
   * @throws If the value is outside of the allowed range.
   * @changed 1.96.0 New in version 1.96.0
   */
  export function range(num: number, min?: number, max?: number): number;
}
