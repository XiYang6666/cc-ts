/**
 * A terminal redirect occupying a smaller area of an existing terminal. This
 * allows for easy definition of spaces within the display that can be
 * written/drawn to, then later redrawn/repositioned/etc as need be. The API
 * itself contains only one function, {@link window.create}, which returns the
 * windows themselves.
 *
 * Windows are considered terminal objects - as such, they have access to nearly
 * all the commands in the `term` API (plus a few extras of their own, listed
 * within said API) and are valid targets to redirect to.
 *
 * Each window has a "parent" terminal object, which can be the computer's own
 * display, a monitor, another window or even other, user-defined terminal
 * objects. Whenever a window is rendered to, the actual screen-writing is
 * performed via that parent (or, if that has one too, then that parent, and so
 * forth). Bear in mind that the cursor of a window's parent will hence be moved
 * around etc when writing a given child window.
 *
 * Windows retain a memory of everything rendered "through" them (hence acting
 * as display buffers), and if the parent's display is wiped, the window's
 * content can be easily redrawn later. A window may also be flagged as
 * invisible, preventing any changes to it from being rendered until it's
 * flagged as visible once more.
 *
 * A parent terminal object may have multiple children assigned to it, and
 * windows may overlap. For example, the Multishell system functions by
 * assigning each tab a window covering the screen, each using the starting
 * terminal display as its parent, and only one of which is visible at a time.
 *
 * @changed 1.6 New in version 1.6
 *
 * @noSelf
 */
declare namespace window {
  /**
   * @internal
   * A terminal redirect object, representing something that can be drawn to
   * like a terminal. Window objects are considered terminal objects and can be
   * redirected to.
   *
   * This interface includes common methods found on terminal objects that
   * `Window` also implements.
   */
  interface TermRedirect {
    /**
     * Writes text to the terminal.
     * @param sText The text to write.
     */
    write(sText: string): void;

    /**
     * Blits (block image transfer) text and colours to the terminal.
     * @param sText The text to blit.
     * @param sTextColor The text colours as a string.
     * @param sBackgroundColor The background colours as a string.
     */
    blit(sText: string, sTextColor: string, sBackgroundColor: string): void;

    /**
     * Clears the entire terminal.
     */
    clear(): void;

    /**
     * Clears the current line from the cursor position to the end.
     */
    clearLine(): void;

    /**
     * Gets the current cursor position.
     * @returns `LuaMultiReturn<[number, number]>` The x and y coordinates of
     * the cursor.
     */
    getCursorPos(): LuaMultiReturn<[number, number]>;

    /**
     * Sets the cursor position.
     * @param x The new x coordinate.
     * @param y The new y coordinate.
     */
    setCursorPos(x: number, y: number): void;

    /**
     * Sets whether the cursor should blink.
     * @param blink Whether the cursor should blink.
     */
    setCursorBlink(blink: boolean): void;

    /**
     * Gets whether the cursor is blinking.
     * @returns Whether the cursor is blinking.
     */
    getCursorBlink(): boolean;

    /**
     * Checks if the terminal supports colours.
     * @returns Whether the terminal supports colours.
     */
    isColor(): boolean;

    /**
     * Checks if the terminal supports colours. Alias for {@link isColor}.
     * @returns Whether the terminal supports colours.
     */
    isColour(): boolean;

    /**
     * Sets the default text colour.
     * @param color The colour to set (e.g., `colours.white`).
     */
    setTextColor(color: number): void;

    /**
     * Sets the default text colour. Alias for {@link setTextColor}.
     * @param color The colour to set (e.g., `colours.white`).
     */
    setTextColour(color: number): void;

    /**
     * Sets a palette colour.
     * @param colour The colour index.
     * @param r The red component (0-1).
     * @param g The green component (0-1).
     * @param b The blue component (0-1).
     */
    setPaletteColour(colour: number, r: number, g: number, b: number): void;

    /**
     * Sets a palette colour. Alias for {@link setPaletteColour}.
     * @param colour The colour index.
     * @param r The red component (0-1).
     * @param g The green component (0-1).
     * @param b The blue component (0-1).
     */
    setPaletteColor(colour: number, r: number, g: number, b: number): void;

    /**
     * Gets a palette colour.
     * @param colour The colour index.
     * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
     * blue components (0-1).
     */
    getPaletteColour(colour: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Gets a palette colour. Alias for {@link getPaletteColour}.
     * @param colour The colour index.
     * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
     * blue components (0-1).
     */
    getPaletteColor(colour: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Sets the default background colour.
     * @param color The colour to set (e.g., `colours.black`).
     */
    setBackgroundColor(color: number): void;

    /**
     * Sets the default background colour. Alias for {@link setBackgroundColor}.
     * @param color The colour to set (e.g., `colours.black`).
     */
    setBackgroundColour(color: number): void;

    /**
     * Gets the size of the terminal.
     * @returns `LuaMultiReturn<[number, number]>` The width and height of the
     * terminal.
     */
    getSize(): LuaMultiReturn<[number, number]>;

    /**
     * Scrolls the terminal content up by a given number of lines.
     * @param n The number of lines to scroll.
     */
    scroll(n: number): void;

    /**
     * Gets the current default text colour.
     * @returns The current text colour.
     */
    getTextColor(): number;

    /**
     * Gets the current default text colour. Alias for {@link getTextColor}.
     * @returns The current text colour.
     */
    getTextColour(): number;

    /**
     * Gets the current default background colour.
     * @returns The current background colour.
     */
    getBackgroundColor(): number;

    /**
     * Gets the current default background colour. Alias for
     * {@link getBackgroundColor}.
     * @returns The current background colour.
     */
    getBackgroundColour(): number;
  }

  /**
   * Returns a terminal object that is a space within the specified parent
   * terminal object. This can then be used (or even redirected to) in the same
   * manner as eg a wrapped monitor. Refer to the `term` API for a list of
   * functions available to it.
   *
   * `term` itself may not be passed as the parent, though `term.native` is
   * acceptable. Generally, `term.current` or a wrapped monitor will be most
   * suitable, though windows may even have other windows assigned as their
   * parents.
   *
   * @param parent The parent terminal redirect to draw to.
   * @param nX The x coordinate this window is drawn at in the parent terminal.
   * @param nY The y coordinate this window is drawn at in the parent terminal.
   * @param nWidth The width of this window.
   * @param nHeight The height of this window.
   * @param bStartVisible Whether this window is visible by default. Defaults to
   * `true`.
   * @returns The constructed window.
   * @example
   * - Create a smaller window, fill it red and write some text to it.
   * ```ts
   * const my_window = window.create(term.current(), 1, 1, 20, 5);
   * my_window.setBackgroundColour(colours.red);
   * my_window.setTextColour(colours.white);
   * my_window.clear();
   * my_window.write("Testing my window!");
   * ```
   * @example
   * - Create a smaller window and redirect to it.
   * ```ts
   * const my_window = window.create(term.current(), 1, 1, 25, 5);
   * term.redirect(my_window);
   * print("Writing some long text which will wrap around and show the bounds of this window.");
   * ```
   * @changed 1.6 New in version 1.6
   */
  function create(
    parent: TermRedirect,
    nX: number,
    nY: number,
    nWidth: number,
    nHeight: number,
    bStartVisible?: boolean
  ): Window;

  /**
   * The window object. Refer to the module's documentation for a full
   * description.
   * @see {@link window.TermRedirect}
   * @noSelf
   */
  interface Window extends TermRedirect {
    /**
     * Get the buffered contents of a line in this window.
     * @param y The y position of the line to get.
     * @returns `LuaMultiReturn<[string, string, string]>` The textual content
     * of this line, the text colours of this line, and the background colours
     * of this line.
     * @throws If `y` is not between 1 and this window's height.
     * @changed 1.84.0 New in version 1.84.0
     */
    getLine(y: number): LuaMultiReturn<[string, string, string]>;

    /**
     * Set whether this window is visible. Invisible windows will not be drawn
     * to the screen until they are made visible again.
     *
     * Making an invisible window visible will immediately draw it.
     * @param visible Whether this window is visible.
     */
    setVisible(visible: boolean): void;

    /**
     * Get whether this window is visible. Invisible windows will not be drawn
     * to the screen until they are made visible again.
     * @returns Whether this window is visible.
     * @see {@link Window.setVisible}
     * @changed 1.94.0 New in version 1.94.0
     */
    isVisible(): boolean;

    /**
     * Draw this window. This does nothing if the window is not visible.
     * @see {@link Window.setVisible}
     */
    redraw(): void;

    /**
     * Set the current terminal's cursor to where this window's cursor is. This
     * does nothing if the window is not visible.
     */
    restoreCursor(): void;

    /**
     * Get the position of the top left corner of this window.
     * @returns `LuaMultiReturn<[number, number]>` The x position and y position
     * of this window.
     */
    getPosition(): LuaMultiReturn<[number, number]>;

    /**
     * Reposition or resize the given window.
     *
     * This function also accepts arguments to change the size of this window.
     * It is recommended that you fire a `term_resize` event after changing a
     * window's, to allow programs to adjust their sizing.
     * @param new_x The new x position of this window.
     * @param new_y The new y position of this window.
     * @param new_width The new width of this window.
     * @param new_height The new height of this window.
     * @param new_parent The new redirect object this window should draw to.
     * @changed 1.85.0 Add `new_parent` parameter.
     */
    reposition(
      new_x: number,
      new_y: number,
      new_width?: number,
      new_height?: number,
      new_parent?: TermRedirect
    ): void;
  }
}
