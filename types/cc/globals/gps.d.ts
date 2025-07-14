/**
 * Use modems to locate the position of the current turtle or computers.
 *
 * It broadcasts a PING message over rednet and wait for responses. In order for this system to work,
 * there must be at least 4 computers used as gps hosts which will respond and allow trilateration.
 * Three of these hosts should be in a plane, and the fourth should be either above or below the other three.
 * The three in a plane should not be in a line with each other. You can set up hosts using the `gps` program.
 *
 * > [!NOTE]
 * When entering in the coordinates for the host you need to put in the x, y, and z coordinates of the block that the modem is connected to, not the modem.
 * All modem distances are measured from the block that the modem is placed on.
 *
 * Also note that you may choose which axes x, y, or z refers to - so long as your systems have the same definition as any GPS servers that're in range,
 * it works just the same. For example, you might build a GPS cluster according to this tutorial, using z to account for height,
 * or you might use y to account for height in the way that Minecraft's debug screen displays.
 *
 * @see {@link https://tweaked.cc/guide/gps_setup.html Setting up GPS} For more detailed instructions on setting up GPS
 * @changed 1.31 New in version 1.31
 *
 * @noSelf
 */
declare namespace gps {
  /**
   * The channel which GPS requests and responses are broadcast on.
   */
  let CHANNEL_GPS: 65534;

  /**
   * Tries to retrieve the computer or turtle's own location.
   *
   * @param timeout The maximum time in seconds taken to establish our position. Defaults to `2`.
   * @param debug Print debugging messages. Defaults to `false`.
   * @returns `LuaMultiReturn<[number, number, number]>` This computer's x, y, and z position.
   * @returns `undefined` If the position could not be established.
   */
  function locate(
    timeout?: number,
    debug?: boolean
  ): LuaMultiReturn<[x: number, y: number, z: number]> | undefined;
}
