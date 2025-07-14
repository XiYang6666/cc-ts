/**
 * Read and draw nft ("Nitrogen Fingers Text") images.
 *
 * nft ("Nitrogen Fingers Text") is a file format for drawing basic images.
 * Unlike the images that `paintutils.parseImage` uses, nft supports coloured text as well as simple coloured pixels.
 *
 * @example
 * - Load an image from `example.nft` and draw it.
 * ```ts
 * import * as nft from "cc.image.nft";
 *
 * const [image, error] = nft.load("data/example.nft");
 * if (image) {
 *   const [x, y] = term.getCursorPos();
 *   nft.draw(image, x, y);
 * } else {
 *   print(`Failed to load image: ${error}`);
 * }
 * ```
 * @changed 1.90.0 New in version 1.90.0
 *
 * @noSelf
 */
declare module "cc.image.nft" {
  /**
   * Represents a parsed NFT image.
   *
   * @internal
   */
  type NFTImage = { background: string; forntgrond: string; text: string }[];

  /**
   * Parse an nft image from a string.
   *
   * @param image The image contents as a string.
   * @returns The parsed image.
   */
  export function parse(image: string): NFTImage;

  /**
   * Load an nft image from a file.
   *
   * @param path The file path to load.
   * @returns `LuaMultiReturn<[NFTImage, undefined]>` The parsed image.
   * @returns `LuaMultiReturn<[undefined, string]>` If the file does not exist or could not be loaded, returns `undefined` and an error message.
   */
  export function load(
    path: string
  ): LuaMultiReturn<[NFTImage | undefined, string | undefined]>;

  /**
   * Draw an nft image to the screen.
   *
   * @param image An image, as returned from {@link parse} or {@link load}.
   * @param xPos The x position to start drawing at.
   * @param yPos The y position to start drawing at.
   * @param target The terminal redirect to draw to. Defaults to the current terminal.
   */
  export function draw(
    image: NFTImage,
    xPos: number,
    yPos: number,
    target?: term.Redirect
  ): void;
}
