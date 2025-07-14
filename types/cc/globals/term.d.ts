/**
 * Interact with a computer's terminal or monitors, writing text and drawing
 * ASCII graphics.
 *
 * ### Writing to the terminal
 * The simplest operation one can perform on a terminal is displaying (or
 * writing) some text. This can be performed with the {@link term.write} method.
 *
 * ```ts
 * term.write("Hello, world!");
 * ```
 *
 * When you write text, this advances the cursor, so the next call to
 * {@link term.write} will write text immediately after the previous one.
 *
 * ```ts
 * term.write("Hello, world!");
 * term.write("Some more text");
 * ```
 *
 * {@link term.getCursorPos} and {@link term.setCursorPos} can be used to
 * manually change the cursor's position.
 *
 * ```ts
 * term.clear();
 *
 * term.setCursorPos(1, 1); // The first column of line 1
 * term.write("First line");
 *
 * term.setCursorPos(20, 2); // The 20th column of line 2
 * term.write("Second line");
 * ```
 *
 * {@link term.write} is a relatively basic and low-level function, and does not
 * handle more advanced features such as line breaks or word wrapping. If you
 * just want to display text to the screen, you probably want to use `print` or
 * `write` instead.
 *
 * ### Colours
 * So far we've been writing text in black and white. However, advanced
 * computers are also capable of displaying text in a variety of colours, with
 * the {@link term.setTextColour} and {@link term.setBackgroundColour}
 * functions.
 *
 * ```ts
 * print("This text is white");
 * term.setTextColour(colors.green);
 * print("This text is green");
 * ```
 *
 * These functions accept any of the constants from the `colors` API.
 * Combinations of colours may be accepted, but will only display a single
 * colour (typically following the behaviour of `colors.toBlit`).
 *
 * The `paintutils` API provides several helpful functions for displaying
 * graphics using {@link term.setBackgroundColour}.
 *
 * @noSelf
 */
declare namespace term {
  /**
   * A base class for all objects which interact with a terminal. Namely the
   * `term` and `monitors`.
   *
   * @noSelf
   */
  interface Redirect {
    /**
     * Write text at the current cursor position, moving the cursor to the end
     * of the text.
     *
     * Unlike functions like `write` and `print`, this does not wrap the text -
     * it simply copies the text to the current terminal line.
     *
     * @param text The text to write.
     */
    write(text: string): void;

    /**
     * Move all positions up (or down) by `y` pixels.
     *
     * Every pixel in the terminal will be replaced by the line `y` pixels below it.
     * If `y` is negative, it will copy pixels from above instead.
     *
     * @param y The number of lines to move up by. This may be a negative number.
     */
    scroll(y: number): void;

    /**
     * Get the position of the cursor.
     *
     * @returns `LuaMultiReturn<[number, number]>` The x and y position of the cursor.
     */
    getCursorPos(): LuaMultiReturn<[x: number, y: number]>;

    /**
     * Set the position of the cursor. terminal writes will begin from this position.
     *
     * @param x The new x position of the cursor.
     * @param y The new y position of the cursor.
     */
    setCursorPos(x: number, y: number): void;

    /**
     * Checks if the cursor is currently blinking.
     *
     * @returns If the cursor is blinking.
     * @changed 1.80pr1.9 New in version 1.80pr1.9
     */
    getCursorBlink(): boolean;

    /**
     * Sets whether the cursor should be visible (and blinking) at the current
     * cursor position.
     *
     * @param blink Whether the cursor should blink.
     */
    setCursorBlink(blink: boolean): void;

    /**
     * Get the size of the terminal.
     *
     * @returns `LuaMultiReturn<[number, number]>` The terminal's width and
     * height.
     */
    getSize(): LuaMultiReturn<[w: number, h: number]>;

    /**
     * Clears the terminal, filling it with the current background colour.
     */
    clear(): void;

    /**
     * Clears the line the cursor is currently on, filling it with the current
     * background colour.
     */
    clearLine(): void;

    /**
     * Return the colour that new text will be written as.
     *
     * @returns The current text colour.
     * @see {@link colors} For a list of colour constants, returned by this
     * function.
     * @changed 1.74 New in version 1.74
     */
    getTextColour(): number;

    /**
     * Return the colour that new text will be written as.
     *
     * @returns The current text colour.
     * @see {@link colors} For a list of colour constants, returned by this
     * function.
     * @changed 1.74 New in version 1.74
     */
    getTextColor(): number;

    /**
     * Set the colour that new text will be written as.
     *
     * @param colour The new text colour.
     * @see {@link colors} For a list of colour constants.
     * @changed 1.45 New in version 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being
     * changed to grayscale on screen.
     */
    setTextColour(colour: number): void;

    /**
     * Set the colour that new text will be written as.
     *
     * @param colour The new text colour.
     * @see {@link colors} For a list of colour constants.
     * @changed 1.45 New in version 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being
     * changed to grayscale on screen.
     */
    setTextColor(colour: number): void;

    /**
     * Return the current background colour. This is used when writing text and
     * clearing the terminal.
     *
     * @returns The current background colour.
     * @see {@link colors} For a list of colour constants, returned by this
     * function.
     * @changed 1.74 New in version 1.74
     */
    getBackgroundColour(): number;

    /**
     * Return the current background colour. This is used when writing text and
     * clearing the terminal.
     *
     * @returns The current background colour.
     * @see {@link colors} For a list of colour constants, returned by this
     * function.
     * @changed 1.74 New in version 1.74
     */
    getBackgroundColor(): number;

    /**
     * Set the current background colour. This is used when writing text and
     * clearing the terminal.
     *
     * @param colour The new background colour.
     * @see {@link colors} For a list of colour constants.
     * @changed 1.45 New in version 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being
     * changed to grayscale on screen.
     */
    setBackgroundColour(colour: number): void;

    /**
     * Set the current background colour. This is used when writing text and
     * clearing the terminal.
     *
     * @param colour The new background colour.
     * @see {@link colors} For a list of colour constants.
     * @changed 1.45 New in version 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being
     * changed to grayscale on screen.
     */
    setBackgroundColor(colour: number): void;

    /**
     * Determine if this terminal supports colour.
     *
     * Terminals which do not support colour will still allow writing coloured
     * text/backgrounds, but it will be displayed in greyscale.
     *
     * @returns Whether this terminal supports colour.
     * @changed 1.45 New in version 1.45
     */
    isColour(): boolean;

    /**
     * Determine if this terminal supports colour.
     *
     * Terminals which do not support colour will still allow writing coloured
     * text/backgrounds, but it will be displayed in greyscale.
     *
     * @returns Whether this terminal supports colour.
     * @changed 1.45 New in version 1.45
     */
    isColor(): boolean;

    /**
     * Writes text to the terminal with the specific foreground and background
     * colours.
     *
     * As with {@link Redirect.write}, the text will be written at the current
     * cursor location, with the cursor moving to the end of the text.
     *
     * `textColour` and `backgroundColour` must both be strings the same length
     * as `text`. All characters represent a single hexadecimal digit, which is
     * converted to one of CC's colours. For instance, "a" corresponds to
     * purple.
     *
     * @param text The text to write.
     * @param textColour The corresponding text colours.
     * @param backgroundColour The corresponding background colours.
     * @throws If the three inputs are not the same length.
     * @example
     * - Prints "Hello, world!" in rainbow text.
     * ```ts
     * term.blit("Hello, world!","01234456789ab","0000000000000");
     * ```
     * @see {@link colors} For a list of colour constants, and their hexadecimal
     * values.
     * @changed 1.74 New in version 1.74
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being
     * changed to grayscale on screen.
     */
    blit(text: string, textColour: string, backgroundColour: string): void;

    /**
     * Set the palette for a specific colour.
     *
     * ComputerCraft's palette system allows you to change how a specific colour
     * should be displayed. For instance, you can make `colors.red` more red by
     * setting its palette to `#FF0000`. This does not allow you to draw more
     * colours - you are still limited to 16 on the screen at one time - but you
     * can change which colours are used.
     *
     * @param index The colour whose palette should be changed.
     * @param colour A 24-bit integer representing the RGB value of the colour.
     * For instance the integer `0xFF0000` corresponds to the colour `#FF0000`.
     * @example
     * - Change the red colour from the default `#CC4C4C` to `#FF0000`.
     * ```ts
     * term.setPaletteColour(colors.red, 0xFF0000);
     * term.setTextColour(colors.red);
     * print("Hello, world!");
     * ```
     * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
     * separate channels.
     * @see {@link colors.packRGB} To convert from three separate channels to
     * the 24-bit format.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    setPaletteColour(index: number, colour: number): void;

    /**
     * Set the palette for a specific colour.
     *
     * ComputerCraft's palette system allows you to change how a specific colour
     * should be displayed. For instance, you can make `colors.red` more red by
     * setting its palette to `#FF0000`. This does not allow you to draw more
     * colours - you are still limited to 16 on the screen at one time - but you
     * can change which colours are used.
     *
     * @param index The colour whose palette should be changed.
     * @param r The intensity of the red channel, between 0 and 1.
     * @param g The intensity of the green channel, between 0 and 1.
     * @param b The intensity of the blue channel, between 0 and 1.
     * @example
     * - As above, but specifying each colour channel separately.
     * ```ts
     * term.setPaletteColour(colors.red, 1, 0, 0);
     * term.setTextColour(colors.red);
     * print("Hello, world!");
     * ```
     * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
     * separate channels.
     * @see {@link colors.packRGB} To convert from three separate channels to
     * the 24-bit format.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    setPaletteColour(index: number, r: number, g: number, b: number): void;

    /**
     * Set the palette for a specific colour.
     *
     * ComputerCraft's palette system allows you to change how a specific colour
     * should be displayed. For instance, you can make `colors.red` more red by
     * setting its palette to `#FF0000`. This does not allow you to draw more
     * colours - you are still limited to 16 on the screen at one time - but you
     * can change which colours are used.
     *
     * @param index The colour whose palette should be changed.
     * @param colour A 24-bit integer representing the RGB value of the colour.
     * For instance the integer `0xFF0000` corresponds to the colour `#FF0000`.
     * @example
     * - Change the red colour from the default `#CC4C4C` to `#FF0000`.
     * ```ts
     * term.setPaletteColor(colors.red, 0xFF0000);
     * term.setTextColor(colors.red);
     * print("Hello, world!");
     * ```
     * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
     * separate channels.
     * @see {@link colors.packRGB} To convert from three separate channels to
     * the 24-bit format.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    setPaletteColor(index: number, colour: number): void;

    /**
     * Set the palette for a specific colour.
     *
     * ComputerCraft's palette system allows you to change how a specific colour
     * should be displayed. For instance, you can make `colors.red` more red by
     * setting its palette to `#FF0000`. This does not allow you to draw more
     * colours - you are still limited to 16 on the screen at one time - but you
     * can change which colours are used.
     *
     * @param index The colour whose palette should be changed.
     * @param r The intensity of the red channel, between 0 and 1.
     * @param g The intensity of the green channel, between 0 and 1.
     * @param b The intensity of the blue channel, between 0 and 1.
     * @example
     * - As above, but specifying each colour channel separately.
     * ```ts
     * term.setPaletteColor(colors.red, 1, 0, 0);
     * term.setTextColor(colors.red);
     * print("Hello, world!");
     * ```
     * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
     * separate channels.
     * @see {@link colors.packRGB} To convert from three separate channels to
     * the 24-bit format.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    setPaletteColor(index: number, r: number, g: number, b: number): void;

    /**
     * Get the current palette for a specific colour.
     *
     * @param colour The colour whose palette should be fetched.
     * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
     * blue channels, will be between 0 and 1.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    getPaletteColour(
      colour: number
    ): LuaMultiReturn<[r: number, g: number, b: number]>;

    /**
     * Get the current palette for a specific colour.
     *
     * @param colour The colour whose palette should be fetched.
     * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
     * blue channels, will be between 0 and 1.
     * @changed 1.80pr1 New in version 1.80pr1
     */
    getPaletteColor(
      colour: number
    ): LuaMultiReturn<[r: number, g: number, b: number]>;
  }

  /**
   * Get the default palette value for a colour.
   *
   * @param colour The colour whose palette should be fetched.
   * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
   * blue channels, will be between 0 and 1.
   * @throws When given an invalid colour.
   * @see {@link term.Redirect.setPaletteColour} To change the palette colour.
   * @changed 1.81.0 New in version 1.81.0
   */
  function nativePaletteColour(
    colour: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * Get the default palette value for a colour.
   *
   * @param colour The colour whose palette should be fetched.
   * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
   * blue channels, will be between 0 and 1.
   * @throws When given an invalid colour.
   * @see {@link term.Redirect.setPaletteColour} To change the palette colour.
   * @changed 1.81.0 New in version 1.81.0
   */
  function nativePaletteColor(
    colour: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * Write text at the current cursor position, moving the cursor to the end of
   * the text.
   *
   * Unlike functions like `write` and `print`, this does not wrap the text - it
   * simply copies the text to the current terminal line.
   *
   * @param text The text to write.
   */
  function write(text: string): void;

  /**
   * Move all positions up (or down) by `y` pixels.
   *
   * Every pixel in the terminal will be replaced by the line `y` pixels below
   * it. If `y` is negative, it will copy pixels from above instead.
   *
   * @param y The number of lines to move up by. This may be a negative number.
   */
  function scroll(y: number): void;

  /**
   * Get the position of the cursor.
   *
   * @returns `LuaMultiReturn<[number, number]>` The x and y position of the
   * cursor.
   */
  function getCursorPos(): LuaMultiReturn<[x: number, y: number]>;

  /**
   * Set the position of the cursor. terminal writes will begin from this
   * position.
   *
   * @param x The new x position of the cursor.
   * @param y The new y position of the cursor.
   */
  function setCursorPos(x: number, y: number): void;

  /**
   * Checks if the cursor is currently blinking.
   *
   * @returns If the cursor is blinking.
   * @changed 1.80pr1.9 New in version 1.80pr1.9
   */
  function getCursorBlink(): boolean;

  /**
   * Sets whether the cursor should be visible (and blinking) at the current
   * cursor position.
   *
   * @param blink Whether the cursor should blink.
   */
  function setCursorBlink(blink: boolean): void;

  /**
   * Get the size of the terminal.
   *
   * @returns `LuaMultiReturn<[number, number]>` The terminal's width and
   * height.
   */
  function getSize(): LuaMultiReturn<[w: number, h: number]>;

  /**
   * Clears the terminal, filling it with the current background colour.
   */
  function clear(): void;

  /**
   * Clears the line the cursor is currently on, filling it with the current
   * background colour.
   */
  function clearLine(): void;

  /**
   * Return the colour that new text will be written as.
   *
   * @returns The current text colour.
   * @see {@link colors} For a list of colour constants, returned by this
   * function.
   * @changed 1.74 New in version 1.74
   */
  function getTextColour(): number;

  /**
   * Return the colour that new text will be written as.
   *
   * @returns The current text colour.
   * @see {@link colors} For a list of colour constants, returned by this
   * function.
   * @changed 1.74 New in version 1.74
   */
  function getTextColor(): number;

  /**
   * Set the colour that new text will be written as.
   *
   * @param colour The new text colour.
   * @see {@link colors} For a list of colour constants.
   * @changed 1.45 New in version 1.45
   * @changed 1.80pr1 Standard computers can now use all 16 colors, being
   * changed to grayscale on screen.
   */
  function setTextColour(colour: number): void;

  /**
   * Set the colour that new text will be written as.
   *
   * @param colour The new text colour.
   * @see {@link colors} For a list of colour constants.
   * @changed 1.45 New in version 1.45
   * @changed 1.80pr1 Standard computers can now use all 16 colors, being
   * changed to grayscale on screen.
   */
  function setTextColor(colour: number): void;

  /**
   * Return the current background colour. This is used when writing text and
   * clearing the terminal.
   *
   * @returns The current background colour.
   * @see {@link colors} For a list of colour constants, returned by this
   * function.
   * @changed 1.74 New in version 1.74
   */
  function getBackgroundColour(): number;

  /**
   * Return the current background colour. This is used when writing text and
   * clearing the terminal.
   *
   * @returns The current background colour.
   * @see {@link colors} For a list of colour constants, returned by this
   * function.
   * @changed 1.74 New in version 1.74
   */
  function getBackgroundColor(): number;

  /**
   * Set the current background colour. This is used when writing text and
   * clearing the terminal.
   *
   * @param colour The new background colour.
   * @see {@link colors} For a list of colour constants.
   * @changed 1.45 New in version 1.45
   * @changed 1.80pr1 Standard computers can now use all 16 colors, being
   * changed to grayscale on screen.
   */
  function setBackgroundColour(colour: number): void;

  /**
   * Set the current background colour. This is used when writing text and
   * clearing the terminal.
   *
   * @param colour The new background colour.
   * @see {@link colors} For a list of colour constants.
   * @changed 1.45 New in version 1.45
   * @changed 1.80pr1 Standard computers can now use all 16 colors, being
   * changed to grayscale on screen.
   */
  function setBackgroundColor(colour: number): void;

  /**
   * Determine if this terminal supports colour.
   *
   * Terminals which do not support colour will still allow writing coloured
   * text/backgrounds, but it will be displayed in greyscale.
   *
   * @returns Whether this terminal supports colour.
   * @changed 1.45 New in version 1.45
   */
  function isColour(): boolean;

  /**
   * Determine if this terminal supports colour.
   *
   * Terminals which do not support colour will still allow writing coloured
   * text/backgrounds, but it will be displayed in greyscale.
   *
   * @returns Whether this terminal supports colour.
   * @changed 1.45 New in version 1.45
   */
  function isColor(): boolean;

  /**
   * Writes text to the terminal with the specific foreground and background
   * colours.
   *
   * As with {@link term.write}, the text will be written at the current cursor
   * location, with the cursor moving to the end of the text.
   *
   * `textColour` and `backgroundColour` must both be strings the same length as
   * `text`. All characters represent a single hexadecimal digit, which is
   * converted to one of CC's colours. For instance, "a" corresponds to purple.
   *
   * @param text The text to write.
   * @param textColour The corresponding text colours.
   * @param backgroundColour The corresponding background colours.
   * @throws If the three inputs are not the same length.
   * @example
   * - Prints "Hello, world!" in rainbow text.
   * ```ts
   * term.blit("Hello, world!","01234456789ab","0000000000000");
   * ```
   * @see {@link colors} For a list of colour constants, and their hexadecimal
   * values.
   * @changed 1.74 New in version 1.74
   * @changed 1.80pr1 Standard computers can now use all 16 colors, being
   * changed to grayscale on screen.
   */
  function blit(
    text: string,
    textColour: string,
    backgroundColour: string
  ): void;

  /**
   * Set the palette for a specific colour.
   *
   * ComputerCraft's palette system allows you to change how a specific colour
   * should be displayed. For instance, you can make `colors.red` more red by
   * setting its palette to `#FF0000`. This does not allow you to draw more
   * colours - you are still limited to 16 on the screen at one time - but you
   * can change which colours are used.
   *
   * @param index The colour whose palette should be changed.
   * @param colour A 24-bit integer representing the RGB value of the colour.
   * For instance the integer `0xFF0000` corresponds to the colour `#FF0000`.
   * @example
   * - Change the red colour from the default `#CC4C4C` to `#FF0000`.
   * ```ts
   * term.setPaletteColour(colors.red, 0xFF0000);
   * term.setTextColour(colors.red);
   * print("Hello, world!");
   * ```
   * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
   * separate channels.
   * @see {@link colors.packRGB} To convert from three separate channels to the
   * 24-bit format.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function setPaletteColour(index: number, colour: number): void;

  /**
   * Set the palette for a specific colour.
   *
   * ComputerCraft's palette system allows you to change how a specific colour
   * should be displayed. For instance, you can make `colors.red` more red by
   * setting its palette to `#FF0000`. This does not allow you to draw more
   * colours - you are still limited to 16 on the screen at one time - but you
   * can change which colours are used.
   *
   * @param index The colour whose palette should be changed.
   * @param r The intensity of the red channel, between 0 and 1.
   * @param g The intensity of the green channel, between 0 and 1.
   * @param b The intensity of the blue channel, between 0 and 1.
   * @example
   * - As above, but specifying each colour channel separately.
   * ```ts
   * term.setPaletteColour(colors.red, 1, 0, 0);
   * term.setTextColour(colors.red);
   * print("Hello, world!");
   * ```
   * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
   * separate channels.
   * @see {@link colors.packRGB} To convert from three separate channels to the
   * 24-bit format.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function setPaletteColour(
    index: number,
    r: number,
    g: number,
    b: number
  ): void;

  /**
   * Set the palette for a specific colour.
   *
   * ComputerCraft's palette system allows you to change how a specific colour
   * should be displayed. For instance, you can make `colors.red` more red by
   * setting its palette to `#FF0000`. This does not allow you to draw more
   * colours - you are still limited to 16 on the screen at one time - but you
   * can change which colours are used.
   *
   * @param index The colour whose palette should be changed.
   * @param colour A 24-bit integer representing the RGB value of the colour.
   * For instance the integer `0xFF0000` corresponds to the colour `#FF0000`.
   * @example
   * - Change the red colour from the default `#CC4C4C` to `#FF0000`.
   * ```ts
   * term.setPaletteColor(colors.red, 0xFF0000);
   * term.setTextColor(colors.red);
   * print("Hello, world!");
   * ```
   * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
   * separate channels.
   * @see {@link colors.packRGB} To convert from three separate channels to the
   * 24-bit format.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function setPaletteColor(index: number, colour: number): void;

  /**
   * Set the palette for a specific colour.
   *
   * ComputerCraft's palette system allows you to change how a specific colour
   * should be displayed. For instance, you can make `colors.red` more red by
   * setting its palette to `#FF0000`. This does not allow you to draw more
   * colours - you are still limited to 16 on the screen at one time - but you
   * can change which colours are used.
   *
   * @param index The colour whose palette should be changed.
   * @param r The intensity of the red channel, between 0 and 1.
   * @param g The intensity of the green channel, between 0 and 1.
   * @param b The intensity of the blue channel, between 0 and 1.
   * @example
   * - As above, but specifying each colour channel separately.
   * ```ts
   * term.setPaletteColor(colors.red, 1, 0, 0);
   * term.setTextColor(colors.red);
   * print("Hello, world!");
   * ```
   * @see {@link colors.unpackRGB} To convert from the 24-bit format to three
   * separate channels.
   * @see {@link colors.packRGB} To convert from three separate channels to the
   * 24-bit format.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function setPaletteColor(
    index: number,
    r: number,
    g: number,
    b: number
  ): void;

  /**
   * Get the current palette for a specific colour.
   *
   * @param colour The colour whose palette should be fetched.
   * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
   * blue channels, will be between 0 and 1.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function getPaletteColour(
    colour: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * Get the current palette for a specific colour.
   *
   * @param colour The colour whose palette should be fetched.
   * @returns `LuaMultiReturn<[number, number, number]>` The red, green, and
   * blue channels, will be between 0 and 1.
   * @changed 1.80pr1 New in version 1.80pr1
   */
  function getPaletteColor(
    colour: number
  ): LuaMultiReturn<[r: number, g: number, b: number]>;

  /**
   * Redirects terminal output to a monitor, a window, or any other custom
   * terminal object. Once the redirect is performed, any calls to a "term"
   * function - or to a function that makes use of a term function, as print -
   * will instead operate with the new terminal object.
   *
   * A "terminal object" is simply a table that contains functions with the same
   * names - and general features - as those found in the term table. For
   * example, a wrapped monitor is suitable.
   *
   * The redirect can be undone by pointing back to the previous terminal object
   * (which this function returns whenever you switch).
   *
   * @param target The terminal redirect the `term` API will draw to.
   * @returns The previous redirect object, as returned by {@link term.current}.
   * @example
   * - Redirect to a monitor on the right of the computer.
   * ```ts
   * term.redirect(peripheral.wrap("right"));
   * ```
   * @changed 1.31 New in version 1.31
   */
  function redirect(target: Redirect): Redirect;

  /**
   * Returns the current terminal object of the computer.
   *
   * @returns The current terminal redirect.
   * @example
   * - Create a new window which draws to the current redirect target.
   * ```ts
   * window.create(term.current(), 1, 1, 10, 10);
   * ```
   * @changed 1.6 New in version 1.6
   */
  function current(): Redirect;

  /**
   * Get the native terminal object of the current computer.
   *
   * It is recommended you do not use this function unless you absolutely have
   * to. In a multitasked environment, `term.native` will not be the current
   * terminal object, and so drawing may interfere with other programs.
   *
   * @returns The native terminal redirect.
   * @changed 1.6 New in version 1.6
   */
  function native(): Redirect;
}
