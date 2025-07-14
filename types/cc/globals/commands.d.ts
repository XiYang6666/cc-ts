/** @noSelfInFile */

/**
 * Execute Minecraft commands and gather data from the results from a command computer.
 *
 * 🛈 note
 * This API is only available on Command computers. It is not accessible to normal players.
 *
 * While one may use commands.exec directly to execute a command, the commands API also provides helper methods to execute every command. For instance, commands.say("Hi!") is equivalent to commands.exec("say Hi!").
 *
 * commands.async provides a similar interface to execute asynchronous commands. commands.async.say("Hi!") is equivalent to commands.execAsync("say Hi!").
 *
 * @example
 * - Set the block above this computer to stone:
 * ```ts
 * commands.setblock("~", "~1", "~", "minecraft:stone")
 * ```
 *
 * @noSelf
 */
declare const commands: CommandsType & CommandNode;

/** @internal */
interface CommandNode {
  /**
   * This is a placeholder for dynamically generated command helper functions.
   * For instance, `commands.say("Hi!")` is equivalent to `commands.exec("say Hi!")`.
   * @param args Arguments for the command.
   * @returns The return values of the executed command.
   */
  [command: string]: CommandNode &
    ((
      ...args: any[]
    ) => LuaMultiReturn<
      [success: boolean, output: string[], affected: number | undefined]
    >);
}

/** @internal */
interface AsyncCommandNode {
  /**
   * Asynchronously execute a specific command.
   * This is a placeholder for dynamically generated command helper functions.
   * @param args Arguments for the command.
   * @returns The "task id".
   */
  [command: string]: AsyncCommandNode & ((...args: any[]) => number);
}

/**
 * @internal
 */
declare interface CommandsType {
  /**
   * Execute a specific command.
   * @param command The command to execute.
   * @returns Whether the command executed successfully.
   * @returns The output of this command, as a list of lines.
   * @returns The number of "affected" objects, or `undefined` if the command failed. The definition of this varies from command to command.
   * @example
   * - Set the block above the command computer to stone.
   * ```ts
   * commands.exec("setblock ~ ~1 ~ minecraft:stone")
   * ```
   */
  exec(
    command: string
  ): LuaMultiReturn<[boolean, string[], number | undefined]>;

  /**
   * Asynchronously execute a command.
   *
   * Unlike exec, this will immediately return, instead of waiting for the command to execute. This allows you to run multiple commands at the same time.
   *
   * When this command has finished executing, it will queue a task_complete event containing the result of executing this command (what exec would return).
   * @param command The command to execute.
   * @returns The "task id". When this command has been executed, it will queue a task_complete event with a matching id.
   * @example
   * - Asynchronously sets the block above the computer to stone.
   * ```ts
   * commands.execAsync("setblock ~ ~1 ~ minecraft:stone")
   * ```
   * @see {@link parallel} One may also use the parallel API to run multiple commands at once.
   */
  execAsync(command: string): number;

  /**
   * List all available commands which the computer has permission to execute.
   * @param subCommand The sub-command to complete.
   * @returns A list of all available commands
   */
  list(...subCommand: string[]): string[];

  /**
   * Get the position of the current command computer.
   * @returns This computer's x position.
   * @returns This computer's y position.
   * @returns This computer's z position.
   * @see {@link gps.locate} To get the position of a non-command computer.
   */
  getBlockPosition(): LuaMultiReturn<[x: number, y: number, z: number]>;

  /**
   * Get information about a range of blocks.
   *
   * This returns the same information as getBlockInfo, just for multiple blocks at once.
   *
   * Blocks are traversed by ascending y level, followed by z and x - the returned table may be indexed using x + z*width + y*width*depth + 1.
   * @param minX The start x coordinate of the range to query.
   * @param minY The start y coordinate of the range to query.
   * @param minZ The start z coordinate of the range to query.
   * @param maxX The end x coordinate of the range to query.
   * @param maxY The end y coordinate of the range to query.
   * @param maxZ The end z coordinate of the range to query.
   * @param dimension The dimension to query (e.g. "minecraft:overworld"). Defaults to the current dimension.
   * @returns A list of information about each block.
   * @throws If the coordinates are not within the world.
   * @throws If trying to get information about more than 4096 blocks.
   * @example
   * - Print out all blocks in a cube around the computer.
   * ```ts
   * // Get a 3x3x3 cube around the computer
   * const [x, y, z] = commands.getBlockPosition();
   * const [min_x, min_y, min_z, max_x, max_y, max_z] = [x - 1, y - 1, z - 1, x + 1, y + 1, z + 1];
   * const blocks = commands.getBlockInfos(min_x, min_y, min_z, max_x, max_y, max_z);
   *
   * // Then loop over all blocks and print them out.
   * const [width, height, depth] = [max_x - min_x + 1, max_y - min_y + 1, max_z - min_z + 1];
   * for (let x_coord = min_x; x_coord <= max_x; x_coord++) {
   *   for (let y_coord = min_y; y_coord <= max_y; y_coord++) {
   *     for (let z_coord = min_z; z_coord <= max_z; z_coord++) {
   *       // Lua is 1-indexed, TS is 0-indexed. Adjust index calculation.
   *       const index = (x_coord - min_x) + (z_coord - min_z) * width + (y_coord - min_y) * width * depth;
   *       console.log(`${x_coord}, ${y_coord} ${z_coord} => ${blocks[index].name}`);
   *     }
   *   }
   * }
   * ```
   */
  getBlockInfos(
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number,
    dimension?: string
  ): BlockInfo[];

  /**
   * Get some basic information about a block.
   *
   * The returned table contains the current name, metadata and block state (as with turtle.inspect). If there is a block entity for that block, its NBT will also be returned.
   * @param x The x position of the block to query.
   * @param y The y position of the block to query.
   * @param z The z position of the block to query.
   * @param dimension The dimension to query (e.g. "minecraft:overworld"). Defaults to the current dimension.
   * @returns The given block's information.
   * @throws If the coordinates are not within the world, or are not currently loaded.
   */
  getBlockInfo(x: number, y: number, z: number, dimension?: string): BlockInfo;

  /**
   * The builtin commands API, without any generated command helper functions
   *
   * This may be useful if a built-in function (such as commands.list) has been overwritten by a command.
   */
  readonly native: CommandsType & CommandNode;

  /**
   * A table containing asynchronous wrappers for all commands.
   *
   * As with commands.execAsync, this returns the "task id" of the enqueued command.
   * @example
   * - Asynchronously sets the block above the computer to stone.
   * ```ts
   * commands.async.setblock("~", "~1", "~", "minecraft:stone")
   * ```
   * @see {@link execAsync}
   */
  readonly async: AsyncCommandNode;
}
