/**
 * Utilities for drawing more complex graphics, such as pixels, lines and images.
 * @changed 1.45 New in version 1.45
 *
 * @noSelf
 */
declare namespace paintutils {
  /**
   * @internal
   * Represents parsed image data, suitable for use with `paintutils.drawImage`.
   * The internal structure of this object is not exposed.
   */
  type PaintutilsImage = number[][];

  /**
   * Parses an image from a multi-line string.
   *
   * @param image The string containing the raw-image data.
   * @returns The parsed image data, suitable for use with {@link paintutils.drawImage}.
   * @example
   * - Parse an image from a string, and draw it.
   * ```ts
   * const image = paintutils.parseImage(`
   *  e  e
   *
   * e    e
   *  eeee
   * `);
   * paintutils.drawImage(image, term.getCursorPos());
   * ```
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function parseImage(image: string): PaintutilsImage;

  /**
   * Loads an image from a file.
   *
   * You can create a file suitable for being loaded using the paint program.
   *
   * @param path The file to load.
   * @returns The parsed image data, suitable for use with {@link paintutils.drawImage}, or `undefined` if the file does not exist.
   * @example
   * - Load an image and draw it.
   * ```ts
   * const image = paintutils.loadImage("data/example.nfp");
   * if (image) {
   *   paintutils.drawImage(image, term.getCursorPos());
   * }
   * ```
   */
  function loadImage(path: string): PaintutilsImage | undefined;

  /**
   * Draws a single pixel to the current term at the specified position.
   *
   * Be warned, this may change the position of the cursor and the current background colour.
   * You should not expect either to be preserved.
   *
   * @param xPos The x position to draw at, where 1 is the far left.
   * @param yPos The y position to draw at, where 1 is the very top.
   * @param colour The color of this pixel. This will be the current background colour if not specified.
   */
  function drawPixel(xPos: number, yPos: number, colour?: number): void;

  /**
   * Draws a straight line from the start to end position.
   *
   * Be warned, this may change the position of the cursor and the current background colour.
   * You should not expect either to be preserved.
   *
   * @param startX The starting x position of the line.
   * @param startY The starting y position of the line.
   * @param endX The end x position of the line.
   * @param endY The end y position of the line.
   * @param colour The color of this pixel. This will be the current background colour if not specified.
   * @example
   * ```ts
   * paintutils.drawLine(2, 3, 30, 7, colors.red);
   * ```
   */
  function drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    colour?: number
  ): void;

  /**
   * Draws the outline of a box on the current term from the specified start position to the specified end position.
   *
   * Be warned, this may change the position of the cursor and the current background colour.
   * You should not expect either to be preserved.
   *
   * @param startX The starting x position of the line.
   * @param startY The starting y position of the line.
   * @param endX The end x position of the line.
   * @param endY The end y position of the line.
   * @param colour The color of this pixel. This will be the current background colour if not specified.
   * @example
   * ```ts
   * paintutils.drawBox(2, 3, 30, 7, colors.red);
   * ```
   */
  function drawBox(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    colour?: number
  ): void;

  /**
   * Draws a filled box on the current term from the specified start position to the specified end position.
   *
   * Be warned, this may change the position of the cursor and the current background colour.
   * You should not expect either to be preserved.
   *
   * @param startX The starting x position of the line.
   * @param startY The starting y position of the line.
   * @param endX The end x position of the line.
   * @param endY The end y position of the line.
   * @param colour The color of this pixel. This will be the current background colour if not specified.
   * @example
   * ```ts
   * paintutils.drawFilledBox(2, 3, 30, 7, colors.red);
   * ```
   */
  function drawFilledBox(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    colour?: number
  ): void;

  /**
   * Draw an image loaded by {@link paintutils.parseImage} or {@link paintutils.loadImage}.
   *
   * @param image The parsed image data.
   * @param xPos The x position to start drawing at.
   * @param yPos The y position to start drawing at.
   */
  function drawImage(image: PaintutilsImage, xPos: number, yPos: number): void;
}
