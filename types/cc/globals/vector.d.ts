/**
 * A basic 3D vector type and some common vector operations.
 * This may be useful when working with coordinates in Minecraft's world (such as those from the gps API).
 *
 * An introduction to vectors can be found on Wikipedia.
 * @changed 1.31 New in version 1.31
 * @noSelf
 */
declare namespace vector {
  /**
   * Construct a new Vector with the given coordinates.
   * @param x The X coordinate or direction of the vector.
   * @param y The Y coordinate or direction of the vector.
   * @param z The Z coordinate or direction of the vector.
   * @returns The constructed vector.
   *
   * @customName new
   */
  function new_(x: number, y: number, z: number): Vector;

  /**
   * A 3-dimensional vector, with x, y, and z values.
   *
   * This is suitable for representing both position and directional vectors.
   */
  interface Vector {
    /** The X coordinate or direction of the vector. */
    x: number;
    /** The Y coordinate or direction of the vector. */
    y: number;
    /** The Z coordinate or direction of the vector. */
    z: number;

    /**
     * Adds two vectors together.
     * @param o The second vector to add.
     * @returns The resulting vector.
     * @example
     * - `v1:add(v2)`
     * - `v1 + v2` (Lua operator overload)
     */
    add(o: Vector): Vector;

    /**
     * Subtracts one vector from another.
     * @param o The vector to subtract.
     * @returns The resulting vector.
     * @example
     * - `v1:sub(v2)`
     * - `v1 - v2` (Lua operator overload)
     */
    sub(o: Vector): Vector;

    /**
     * Multiplies a vector by a scalar value.
     * @param factor The scalar value to multiply with.
     * @returns A vector with value `(x * m, y * m, z * m)`.
     * @example
     * - `vector.new(1, 2, 3):mul(3)`
     * - `vector.new(1, 2, 3) * 3` (Lua operator overload)
     */
    mul(factor: number): Vector;

    /**
     * Divides a vector by a scalar value.
     * @param factor The scalar value to divide by.
     * @returns A vector with value `(x / m, y / m, z / m)`.
     * @example
     * - `vector.new(1, 2, 3):div(3)`
     * - `vector.new(1, 2, 3) / 3` (Lua operator overload)
     */
    div(factor: number): Vector;

    /**
     * Negate a vector.
     * @returns The negated vector.
     * @example
     * - `-vector.new(1, 2, 3)` (Lua operator overload)
     */
    unm(): Vector;

    /**
     * Compute the dot product of two vectors.
     * @param o The second vector to compute the dot product of.
     * @returns The dot product of self and `o`.
     * @example
     * - `v1:dot(v2)`
     */
    dot(o: Vector): number;

    /**
     * Compute the cross product of two vectors.
     * @param o The second vector to compute the cross product of.
     * @returns The cross product of self and `o`.
     * @example
     * - `v1:cross(v2)`
     */
    cross(o: Vector): Vector;

    /**
     * Get the length (also referred to as magnitude) of this vector.
     * @returns The length of this vector.
     */
    length(): number;

    /**
     * Divide this vector by its length, producing with the same direction, but of length 1.
     * @returns The normalised vector.
     * @example
     * - `v:normalize()`
     */
    normalize(): Vector;

    /**
     * Construct a vector with each dimension rounded to the nearest value.
     * @param tolerance The tolerance that we should round to, defaulting to 1. For instance, a tolerance of 0.5 will round to the nearest 0.5.
     * @returns The rounded vector.
     */
    round(tolerance?: number): Vector;

    /**
     * Convert this vector into a string, for pretty printing.
     * @returns This vector's string representation.
     * @example
     * - `v:tostring()`
     * - `tostring(v)` (Lua operator overload)
     */
    tostring(): string;

    /**
     * Check for equality between two vectors.
     * @param other The second vector to compare to.
     * @returns Whether or not the vectors are equal.
     * @example
     * - `v:equals(other)`
     * - `v1 == v2` (Lua operator overload)
     */
    equals(other: Vector): boolean;
  }
}
