/**
 * The printer peripheral allows printing text onto pages. These pages can then
 * be crafted together into printed pages or books.
 *
 * Printers require ink (one of the coloured dyes) and paper in order to
 * function. Once loaded, a new page can be started with `newPage`. Then the
 * printer can be used similarly to a normal terminal; text can be written, and
 * the cursor moved. Once all text has been printed, `endPage` should be called
 * to finally print the page.
 *
 * @see {@link cc.strings.wrap} To wrap text before printing it.
 *
 * @noSelf
 */
declare interface PrinterPeripheral extends BasePeripheral {
  /**
   * Writes text to the current page.
   * @param text The value to write to the page.
   * @throws If any values couldn't be converted to a string, or if no page is
   * started.
   */
  write(text: string): void;

  /**
   * Returns the current position of the cursor on the page.
   * @returns A tuple containing:
   * - `number`: The X position of the cursor.
   * - `number`: The Y position of the cursor.
   * @throws If a page isn't being printed.
   */
  getCursorPos(): LuaMultiReturn<[x: number, y: number]>;

  /**
   * Sets the position of the cursor on the page.
   * @param x The X coordinate to set the cursor at.
   * @param y The Y coordinate to set the cursor at.
   * @throws If a page isn't being printed.
   */
  setCursorPos(x: number, y: number): void;

  /**
   * Returns the size of the current page.
   * @returns A tuple containing:
   * - `number`: The width of the page.
   * - `number`: The height of the page.
   * @throws If a page isn't being printed.
   */
  getPageSize(): LuaMultiReturn<[w: number, h: number]>;

  /**
   * Starts printing a new page.
   * @returns Whether a new page could be started.
   */
  newPage(): boolean;

  /**
   * Finalizes printing of the current page and outputs it to the tray.
   * @returns Whether the page could be successfully finished.
   * @throws If a page isn't being printed.
   */
  endPage(): boolean;

  /**
   * Sets the title of the current page.
   * @param title The title to set for the page.
   * @throws If a page isn't being printed.
   */
  setPageTitle(title?: string): void;

  /**
   * Returns the amount of ink left in the printer.
   * @returns The amount of ink available to print with.
   */
  getInkLevel(): number;

  /**
   * Returns the amount of paper left in the printer.
   * @returns The amount of paper available to print with.
   */
  getPaperLevel(): number;
}
