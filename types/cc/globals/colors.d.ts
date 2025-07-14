/**
 * Constants and functions for color values, suitable for working with term and
 * redstone.
 *
 * This is useful in conjunction with Bundled Cables from mods like Project Red,
 * and colors on Advanced Computers and Advanced Monitors.
 *
 * For the non-American English version just replace colors with colours. This
 * alternative API is exactly the same, except the colours use British English
 * (e.g. colors.gray is spelt colours.grey).
 *
 * On basic terminals (such as the Computer and Monitor), all the colors are
 * converted to grayscale. This means you can still use all 16 colors on the
 * screen, but they will appear as the nearest tint of gray. You can check if a
 * terminal supports color by using the function term.isColor.
 *
 * Grayscale colors are calculated by taking the average of the three
 * components, i.e. (red + green + blue) / 3.
 * @see {@link colors}
 *
 * @noSelf
 */
declare namespace colors {
  /** White: Written as 0 in paint files and term.blit, has a default terminal
   * color of #F0F0F0. */
  export const white: 0x1;
  /** Orange: Written as 1 in paint files and term.blit, has a default terminal
   * color of #F2B233. */
  export const orange: 0x2;
  /** Magenta: Written as 2 in paint files and term.blit, has a default terminal
   * color of #E57FD8. */
  export const magenta: 0x4;
  /** Light blue: Written as 3 in paint files and term.blit, has a default
   * terminal color of #99B2F2. */
  export const lightBlue: 0x8;
  /** Yellow: Written as 4 in paint files and term.blit, has a default terminal
   * color of #DEDE6C. */
  export const yellow: 0x10;
  /** Lime: Written as 5 in paint files and term.blit, has a default terminal
   * color of #7FCC19. */
  export const lime: 0x20;
  /** Pink: Written as 6 in paint files and term.blit, has a default terminal
   * color of #F2B2CC. */
  export const pink: 0x40;
  /** Gray: Written as 7 in paint files and term.blit, has a default terminal
   * color of #4C4C4C. */
  export const gray: 0x80;
  /** Light gray: Written as 8 in paint files and term.blit, has a default
   * terminal color of #999999. */
  export const lightGray: 0x100;
  /** Cyan: Written as 9 in paint files and term.blit, has a default terminal
   * color of #4C99B2. */
  export const cyan: 0x200;
  /** Purple: Written as a in paint files and term.blit, has a default terminal
   * color of #B266E5. */
  export const purple: 0x400;
  /** Blue: Written as b in paint files and term.blit, has a default terminal
   * color of #3366CC. */
  export const blue: 0x800;
  /** Brown: Written as c in paint files and term.blit, has a default terminal
   * color of #7F664C. */
  export const brown: 0x1000;
  /** Green: Written as d in paint files and term.blit, has a default terminal
   * color of #57A64E. */
  export const green: 0x2000;
  /** Red: Written as e in paint files and term.blit, has a default terminal
   * color of #CC4C4C. */
  export const red: 0x4000;
  /** Black: Written as f in paint files and term.blit, has a default terminal
   * color of #111111. */
  export const black: 0x8000;

  /**
   * Combines a set of colors (or sets of colors) into a larger set. Useful for
   * Bundled Cables.
   * @param colors The colors to combine.
   * @return The union of the color sets given.
   * @example
   * ```ts
   * colors.combine(colors.white, colors.magenta, colors.lightBlue)
   * // => 13
   * ```
   * @remarks
   * - **New in version 1.2**
   */
  export function combine(...colors: number[]): number;

  /**
   * Removes one or more colors (or sets of colors) from an initial set. Useful
   * for Bundled Cables.
   *
   * Each parameter beyond the first may be a single color or may be a set of
   * colors (in the latter case, all colors in the set are removed from the
   * original set).
   * @param colors The color from which to subtract.
   * @param subtrahends The colors to subtract.
   * @return The resulting color.
   * @example
   * ```ts
   * colors.subtract(colors.lime, colors.orange, colors.white)
   * // => 32
   * ```
   * @remarks
   * - **New in version 1.2**
   */
  export function subtract(colors: number, ...subtrahends: number[]): number;

  /**
   * Tests whether color is contained within colors. Useful for Bundled Cables.
   * @param colors A color, or color set.
   * @param color A color or set of colors that colors should contain.
   * @return If colors contains all colors within color.
   * @example
   * ```ts
   * colors.test(colors.combine(colors.white, colors.magenta, colors.lightBlue), colors.lightBlue)
   * // => true
   * ```
   * @remarks
   * - **New in version 1.2**
   */
  export function test(colors: number, color: number): boolean;

  /**
   * Combine a three-color RGB value into one hexadecimal representation.
   * @param r The red channel, should be between 0 and 1.
   * @param g The green channel, should be between 0 and 1.
   * @param b The blue channel, should be between 0 and 1.
   * @return The combined hexadecimal color.
   * @example
   * ```ts
   * colors.packRGB(0.7, 0.2, 0.6)
   * // => 0xb23399
   * ```
   * @remarks
   * - **New in version 1.81.0**
   */
  export function packRGB(r: number, g: number, b: number): number;

  /**
   * Separate a hexadecimal RGB color into its three constituent channels.
   * @param rgb The combined hexadecimal color.
   * @return A tuple containing:
   * - `r`: The red channel, will be between 0 and 1.
   * - `g`: The green channel, will be between 0 and 1.
   * - `b`: The blue channel, will be between 0 and 1.
   * @example
   * ```ts
   * const [r, g, b] = colors.unpackRGB(0xb23399);
   * // r = 0.7, g = 0.2, b = 0.6
   * ```
   * @see {@link colors.packRGB}
   * @remarks
   * - **New in version 1.81.0**
   */
  export function unpackRGB(
    rgb: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * @deprecated Use packRGB or unpackRGB directly.
   *
   * Either calls colors.packRGB or colors.unpackRGB, depending on how many
   * arguments it receives.
   * @param r The red channel, as an argument to colors.packRGB.
   * @param g The green channel, as an argument to colors.packRGB.
   * @param b The blue channel, as an argument to colors.packRGB.
   * @return The combined hexadecimal color, as returned by colors.packRGB.
   * @example
   * ```ts
   * colors.rgb8(0.7, 0.2, 0.6)
   * // => 0xb23399
   * ```
   * @remarks
   * - **New in version 1.80pr1**
   * - **Changed in version 1.81.0:** Deprecated in favor of colors.(un)packRGB.
   */
  export function rgb8(r: number, g: number, b: number): number;
  /**
   * @deprecated Use packRGB or unpackRGB directly.
   *
   * Either calls colors.packRGB or colors.unpackRGB, depending on how many
   * arguments it receives.
   * @param rgb The combined hexadecimal color, as an argument to
   * colors.unpackRGB.
   * @return A tuple containing:
   * - `r`: The red channel, as returned by colors.unpackRGB
   * - `g`: The green channel, as returned by colors.unpackRGB
   * - `b`: The blue channel, as returned by colors.unpackRGB
   * @example
   * ```ts
   * const [r, g, b] = colors.rgb8(0xb23399);
   * // r = 0.7, g = 0.2, b = 0.6
   * ```
   * @remarks
   * - **New in version 1.80pr1**
   * - **Changed in version 1.81.0:** Deprecated in favor of colors.(un)packRGB.
   */
  export function rgb8(
    rgb: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * Converts the given color to a paint/blit hex character (0-9a-f).
   *
   * This is equivalent to converting floor(log_2(color)) to hexadecimal. Values
   * outside the range of a valid color will error.
   * @param color The color to convert.
   * @return The blit hex code of the color.
   * @example
   * ```ts
   * colors.toBlit(colors.red)
   * // => "e"
   * ```
   * @see {@link colors.fromBlit}
   * @remarks
   * - **New in version 1.94.0**
   */
  export function toBlit(color: number): string;

  /**
   * Converts the given paint/blit hex character (0-9a-f) to a color.
   *
   * This is equivalent to converting the hex character to a number and then 2 ^
   * decimal
   * @param hex The paint/blit hex character to convert
   * @return The color
   * @example
   * ```ts
   * colors.fromBlit("e")
   * // => 16384
   * ```
   * @see {@link colors.toBlit}
   * @remarks
   * - **New in version 1.105.0**
   */
  export function fromBlit(hex: string): number;
}

/**
 * @noSelf
 */
declare const colours: Omit<typeof colors, "gray"> & {
  /** Gray: Written as 7 in paint files and term.blit, has a default terminal color of #4C4C4C. */
  readonly grey: 0x80;
};
