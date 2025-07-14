/**
 * Interact with the computer's files and filesystem, allowing you to manipulate
 * files, directories and paths.
 *
 * This includes:
 * - Reading and writing files: Call {@link fs.open} to obtain a file "handle",
 *   which can be used to read from or write to a file.
 * - Path manipulation: {@link fs.combine}, {@link fs.getName} and
 *   {@link fs.getDir} allow you to manipulate file paths, joining them together
 *   or extracting components.
 * - Querying paths: For instance, checking if a file exists, or whether it's a
 *   directory. See {@link fs.getSize}, {@link fs.exists}, {@link fs.isDir},
 *   {@link fs.isReadOnly} and {@link fs.attributes}.
 * - File and directory manipulation: For instance, moving or copying files. See
 *   {@link fs.makeDir}, {@link fs.move}, {@link fs.copy} and {@link fs.delete}.
 *
 * > [!NOTE] All functions in the API work on absolute paths, and do not take
 * the current directory into account. You can use `shell.resolve` to convert a
 * relative path into an absolute one.
 *
 * ### Mounts
 * While a computer can only have one hard drive and filesystem, other
 * filesystems may be "mounted" inside it. For instance, the drive peripheral
 * mounts its disk's contents at "disk/", "disk1/", etc...
 *
 * You can see which mount a path belongs to with the {@link fs.getDrive}
 * function. This returns "hdd" for the computer's main filesystem ("/"), "rom"
 * for the rom ("rom/").
 *
 * Most filesystems have a limited capacity, operations which would cause that
 * capacity to be reached (such as writing an incredibly large file) will fail.
 * You can see a mount's capacity with {@link fs.getCapacity} and the remaining
 * space with {@link fs.getFreeSpace}.
 *
 * @noSelf
 */
declare namespace fs {
  /**
   * Provides completion for a file or directory name, suitable for use with
   * `_G.read`.
   *
   * When a directory is a possible candidate for completion, two entries are
   * included - one with a trailing slash (indicating that entries within this
   * directory exist) and one without it (meaning this entry is an immediate
   * completion candidate). `include_dirs` can be set to `false` to only include
   * those with a trailing slash.
   *
   * @param path The path to complete.
   * @param location The location where paths are resolved from.
   * @param include_files When `false`, only directories will be included in the
   * returned list. Defaults to `true`.
   * @param include_dirs When `false`, "raw" directories will not be included in
   * the returned list. Defaults to `true`.
   * @returns A list of possible completion candidates.
   * @example
   * - Complete files in the root directory.
   * ```ts
   * read(undefined, undefined, (str) => fs.complete(str, "", true, false));
   * ```
   * @changed 1.74 New in version 1.74
   * @changed 1.101.0 Changed in version 1.101.0
   */
  function complete(
    path: string,
    location: string,
    include_files?: boolean,
    include_dirs?: boolean
  ): string[];

  /**
   * Provides completion for a file or directory name, suitable for use with
   * `_G.read`.
   *
   * This table form is an expanded version of the previous syntax. The
   * `include_files` and `include_dirs` arguments from above are passed in as
   * fields.
   *
   * @param path The path to complete.
   * @param location The location where paths are resolved from.
   * @param options Options for completion.
   * @returns A list of possible completion candidates.
   * @example
   * - Complete files in the root directory, hiding hidden files by default.
   * ```ts
   * read(undefined, undefined, (str) =>
   *   fs.complete(str, "", {
   *     include_files: true,
   *     include_dirs: false,
   *     include_hidden: false,
   *   })
   * );
   * ```
   * @changed 1.74 New in version 1.74
   * @changed 1.101.0 Changed in version 1.101.0
   */
  function complete(
    path: string,
    location: string,
    options: CompleteOptions
  ): string[];

  /**
   * Options for the `fs.complete` function when using the table form.
   */
  interface CompleteOptions {
    /**
     * Whether to include directories in the returned list. When `false`, "raw"
     * directories will not be included.
     */
    include_dirs?: boolean;
    /**
     * Whether to include files in the returned list. When `false`, only
     * directories will be included.
     */
    include_files?: boolean;
    /**
     * Whether to include hidden files (those starting with `.`) by default.
     * They will still be shown when typing a `.`
     */
    include_hidden?: boolean;
  }

  /**
   * Searches for files matching a string with wildcards.
   *
   * This string looks like a normal path string, but can include wildcards,
   * which can match multiple paths:
   * - `?` matches any single character in a file name.
   * - `*` matches any number of characters.
   *
   * For example, `rom/*​/command*` will look for any path starting with
   * `command` inside any subdirectory of `/rom`.
   *
   * Note that these wildcards match a single segment of the path. For instance
   * `rom/*.lua` will include `rom/startup.lua` but not include
   * `rom/programs/list.lua`.
   *
   * @param path The wildcard-qualified path to search for.
   * @returns A list of paths that match the search string.
   * @throws If the supplied path was invalid.
   * @example
   * - List all Markdown files in the help folder
   * ```ts
   * fs.find("rom/help/*.md");
   * ```
   * @changed 1.6 New in version 1.6
   * @changed 1.106.0 Added support for the `?` wildcard.
   */
  function find(path: string): string[];

  /**
   * Returns `true` if a path is mounted to the parent filesystem.
   *
   * The root filesystem "/" is considered a mount, along with disk folders and
   * the rom folder.
   *
   * @param path The path to check.
   * @returns If the path is mounted, rather than a normal file/folder.
   * @throws If the path does not exist.
   * @see {@link fs.getDrive}
   * @changed 1.87.0 New in version 1.87.0
   */
  function isDriveRoot(path: string): boolean;

  /**
   * Returns a list of files in a directory.
   *
   * @param path The path to list.
   * @returns A table with a list of files in the directory.
   * @throws If the path doesn't exist.
   * @example
   * - List all files under `/rom/`
   * ```ts
   * const files = fs.list("/rom/");
   * for (let i = 0; i < files.length; i++) {
   *   print(files[i]);
   * }
   * ```
   */
  function list(path: string): string[];

  /**
   * Combines several parts of a path into one full path, adding separators as
   * needed.
   *
   * @param path The first part of the path. For example, a parent directory
   * path.
   * @param parts Additional parts of the path to combine.
   * @returns The new path, with separators added between parts as needed.
   * @throws On argument errors.
   * @example
   * - Combine several file paths together
   * ```ts
   * fs.combine("/rom/programs", "../apis", "parallel.lua");
   * // => rom/apis/parallel.lua
   * ```
   * @changed 1.95.0 Now supports multiple arguments.
   */
  function combine(path: string, ...parts: string[]): string;

  /**
   * Returns the file name portion of a path.
   *
   * @param path The path to get the name from.
   * @returns The final part of the path (the file name).
   * @example
   * - Get the file name of `rom/startup.lua`
   * ```ts
   * fs.getName("rom/startup.lua");
   * // => startup.lua
   * ```
   * @changed 1.2 New in version 1.2
   */
  function getName(path: string): string;

  /**
   * Returns the parent directory portion of a path.
   *
   * @param path The path to get the directory from.
   * @returns The path with the final part removed (the parent directory).
   * @example
   * - Get the directory name of `rom/startup.lua`
   * ```ts
   * fs.getDir("rom/startup.lua");
   * // => rom
   * ```
   * @changed 1.63 New in version 1.63
   */
  function getDir(path: string): string;

  /**
   * Returns the size of the specified file.
   *
   * @param path The file to get the file size of.
   * @returns The size of the file, in bytes.
   * @throws If the path doesn't exist.
   * @changed 1.3 New in version 1.3
   */
  function getSize(path: string): number;

  /**
   * Returns whether the specified path exists.
   *
   * @param path The path to check the existence of.
   * @returns Whether the path exists.
   */
  function exists(path: string): boolean;

  /**
   * Returns whether the specified path is a directory.
   *
   * @param path The path to check.
   * @returns Whether the path is a directory.
   */
  function isDir(path: string): boolean;

  /**
   * Returns whether a path is read-only.
   *
   * @param path The path to check.
   * @returns Whether the path cannot be written to.
   */
  function isReadOnly(path: string): boolean;

  /**
   * Creates a directory, and any missing parents, at the specified path.
   *
   * @param path The path to the directory to create.
   * @throws If the directory couldn't be created.
   */
  function makeDir(path: string): void;

  /**
   * Moves a file or directory from one path to another.
   *
   * Any parent directories are created as needed.
   *
   * @param path The current file or directory to move from.
   * @param dest The destination path for the file or directory.
   * @throws If the file or directory couldn't be moved.
   */
  function move(path: string, dest: string): void;

  /**
   * Copies a file or directory to a new path.
   *
   * Any parent directories are created as needed.
   *
   * @param path The file or directory to copy.
   * @param dest The path to the destination file or directory.
   * @throws If the file or directory couldn't be copied.
   */
  function copy(path: string, dest: string): void;

  /**
   * Deletes a file or directory.
   *
   * If the path points to a directory, all of the enclosed files and
   * subdirectories are also deleted.
   *
   * @param path The path to the file or directory to delete.
   * @throws If the file or directory couldn't be deleted.
   *
   * @customName delete
   */
  function delete_(path: string): void;

  /**
   * Opens a file for reading or writing at a path.
   *
   * The mode string can be any of the following:
   * - `"r"`: Read mode.
   * - `"w"`: Write mode.
   * - `"a"`: Append mode.
   * - `"r+"`: Update mode (allows reading and writing), all data is preserved.
   * - `"w+"`: Update mode, all data is erased.
   *
   * The mode may also have a `"b"` at the end, which opens the file in "binary
   * mode". This changes {@link ReadHandle.read} and {@link WriteHandle.write}
   * to read/write single bytes as numbers rather than strings.
   *
   * @param path The path to the file to open.
   * @param mode The mode to open the file with.
   * @returns A file handle object for the file.
   * @returns `LuaMultiReturn<[undefined, string | undefined]>` If the file does
   * not exist, or cannot be opened, returns `undefined` and an optional error
   * message.
   * @throws If an invalid mode was specified.
   * @example
   * - Read the contents of a file.
   * ```ts
   * const [file] = fs.open("/rom/help/intro.txt", "r");
   * if (file) {
   *   const contents = file.readAll();
   *   file.close();
   *   print(contents);
   * }
   * ```
   * @example
   * - Open a file and read all lines into a table. `io.lines` offers an alternative way to do this.
   * ```ts
   * const [file] = fs.open("/rom/motd.txt", "r");
   * if (file) {
   *   const lines: string[] = [];
   *   while (true) {
   *     const line = file.readLine();
   *     // If line is undefined then we've reached the end of the file and should stop
   *     if (line === undefined) break;
   *     lines.push(line);
   *   }
   *   file.close();
   *   print(lines[math.random(1, lines.length) - 1]); // Pick a random line and print it.
   * }
   * ```
   * @example
   * - Open a file and write some text to it. You can run `edit out.txt` to see the written text.
   * ```ts
   * const [file] = fs.open("out.txt", "w");
   * if (file) {
   *   file.write("Just testing some code");
   *   file.close(); // Remember to call close, otherwise changes may not be written!
   * }
   * ```
   * @changed 1.109.0 Add support for update modes (r+ and w+).
   * @changed 1.109.0 Opening a file in non-binary mode now uses the raw bytes
   * of the file rather than encoding to UTF-8.
   */
  function open(path: string, mode: "r" | "rb"): ReadHandle;
  function open(path: string, mode: "w" | "wb"): WriteHandle;
  function open(path: string, mode: "a" | "ab"): Omit<WriteHandle, "seek">;
  function open(
    path: string,
    mode: "r+" | "r+b" | "w+" | "w+b"
  ): ReadWriteHandle;

  /**
   * Returns the name of the mount that the specified path is located on.
   *
   * @param path The path to get the drive of.
   * @returns The name of the drive that the file is on; e.g. `hdd` for local
   * files, or `rom` for ROM files.
   * @throws If the path doesn't exist.
   * @example
   * - Print the drives of a couple of mounts:
   * ```ts
   * print("/: " + fs.getDrive("/"));
   * print("/rom/: " + fs.getDrive("rom"));
   * ```
   */
  function getDrive(path: string): string | undefined;

  /**
   * Returns the amount of free space available on the drive the path is located
   * on.
   *
   * @param path The path to check the free space for.
   * @returns The amount of free space available, in bytes, or `"unlimited"`.
   * @throws If the path doesn't exist.
   * @see {@link fs.getCapacity} To get the capacity of this drive.
   * @changed 1.4 New in version 1.4
   */
  function getFreeSpace(path: string): number | "unlimited";

  /**
   * Returns the capacity of the drive the path is located on.
   *
   * @param path The path of the drive to get.
   * @returns This drive's capacity. This will be `undefined` for "read-only"
   * drives, such as the ROM or treasure disks.
   * @throws If the capacity cannot be determined.
   * @see {@link fs.getFreeSpace} To get the free space available on this drive.
   * @changed 1.87.0 New in version 1.87.0
   */
  function getCapacity(path: string): number | undefined;

  /**
   * Get attributes about a specific file or folder.
   *
   * The returned attributes table contains information about the size of the
   * file, whether it is a directory, when it was created and last modified, and
   * whether it is read only.
   *
   * The creation and modification times are given as the number of milliseconds
   * since the UNIX epoch. This may be given to `os.date` in order to convert it
   * to more usable form.
   *
   * @param path The path to get attributes for.
   * @returns The resulting attributes.
   * @throws If the path does not exist.
   * @see {@link fs.getSize} If you only care about the file's size.
   * @see {@link fs.isDir} If you only care whether a path is a directory or
   * not.
   * @changed 1.87.0 New in version 1.87.0
   * @changed 1.91.0 Renamed `modification` field to `modified`.
   * @changed 1.95.2 Added `isReadOnly` to attributes.
   */
  function attributes(path: string): FileAttributes;

  /**
   * Attributes about a specific file or folder.
   */
  interface FileAttributes {
    /** The size of the file, in bytes. */
    size: number;
    /** Whether the path is a directory. */
    isDir: boolean;
    /** Whether the path is read-only. */
    isReadOnly: boolean;
    /** The creation time as milliseconds since the UNIX epoch. */
    created: number;
    /** The last modification time as milliseconds since the UNIX epoch. */
    modified: number;
  }

  /**
   * Base interface for file handles, providing common methods.
   *
   * @noSelf
   * @internal
   */
  interface FileHandle {
    /**
     * Seek to a new position within the file, changing where bytes are written
     * to. The new position is an offset given by `offset`, relative to a start
     * position determined by `whence`:
     * - `"set"`: `offset` is relative to the beginning of the file.
     * - `"cur"`: Relative to the current position. This is the default.
     * - `"end"`: Relative to the end of the file.
     *
     * In case of success, `seek` returns the new file position from the
     * beginning of the file.
     *
     * @param whence Where the offset is relative to. Defaults to `"cur"`.
     * @param offset The offset to seek to. Defaults to `0`.
     * @returns The new position.
     * @returns `LuaMultiReturn<[undefined, string]>` If seeking failed, returns
     * `undefined` and a reason string.
     * @throws If the file has been closed.
     * @changed 1.80pr1.9 New in version 1.80pr1.9
     * @changed 1.109.0 Now available on all file handles, not just binary-mode
     * handles.
     */
    seek(
      whence?: "set" | "cur" | "end",
      offset?: number
    ): number | LuaMultiReturn<[whence: undefined, offset: string]>;

    /**
     * Close this file, freeing any resources it uses.
     *
     * Once a file is closed it may no longer be read or written to.
     *
     * @throws If the file has already been closed.
     */
    close(): void;
  }

  /**
   * A file handle opened for reading with `fs.open`.
   *
   * @noSelf
   */
  interface ReadHandle extends FileHandle {
    /**
     * Read a number of bytes from this file.
     *
     * If the file was opened in binary mode (`"b"` suffix), `read()` (without
     * `count`) returns a number representing the byte value. Otherwise, or if
     * `count` is provided, it returns a string.
     *
     * @returns The value of the byte read (if binary mode and `count` absent),
     * or the bytes read as a string (if `count` given or non-binary mode).
     * Returns `undefined` if at the end of the file.
     * @throws When trying to read a negative number of bytes.
     * @throws If the file has been closed.
     * @changed 1.80pr1 Now accepts an integer argument to read multiple bytes,
     * returning a string instead of a number.
     */
    read(): string | number | undefined;
    /**
     * Read a number of bytes from this file.
     *
     * If the file was opened in binary mode (`"b"` suffix), `read()` (without
     * `count`) returns a number representing the byte value. Otherwise, or if
     * `count` is provided, it returns a string.
     *
     * @param count The number of bytes to read. This may be `0` to determine we
     * are at the end of the file.
     * @returns The value of the byte read (if binary mode and `count` absent),
     * or the bytes read as a string (if `count` given or non-binary mode).
     * Returns `undefined` if at the end of the file.
     * @throws When trying to read a negative number of bytes.
     * @throws If the file has been closed.
     * @changed 1.80pr1 Now accepts an integer argument to read multiple bytes,
     * returning a string instead of a number.
     */
    read(count: number): string | undefined;

    /**
     * Read the remainder of the file.
     *
     * @returns The remaining contents of the file, or `undefined` in the event
     * of an error.
     * @throws If the file has been closed.
     * @changed 1.80pr1 New in version 1.80pr1
     * @changed 1.109.0 Binary-mode handles are now consistent with non-binary
     * files, and return an empty string at the end of the file, rather than
     * `undefined`.
     */
    readAll(): string | undefined;

    /**
     * Read a line from the file.
     *
     * @param withTrailing Whether to include the newline characters with the
     * returned string. Defaults to `false`.
     * @returns The read line or `undefined` if at the end of the file.
     * @throws If the file has been closed.
     * @changed 1.80pr1.9 New in version 1.80pr1.9
     * @changed 1.81.0 `\r` is now stripped.
     */
    readLine(withTrailing?: boolean): string | undefined;
  }

  /**
   * A file handle opened for writing by `fs.open`.
   *
   * @noSelf
   */
  interface WriteHandle extends FileHandle {
    /**
     * Write a string or byte to the file.
     *
     * If the file was opened in binary mode, you can pass a `number` representing a byte.
     * Otherwise, pass a `string`.
     *
     * @param contents The string to write, or the byte to write (if binary mode).
     * @throws If the file has been closed.
     * @changed 1.80pr1 Now accepts a string to write multiple bytes.
     */
    write(...contents: (string | number)[]): void;

    /**
     * Write a string of characters to the file, following them with a new line
     * character.
     *
     * @param text The text to write to the file.
     * @throws If the file has been closed.
     */
    writeLine(text: string): void;

    /**
     * Save the current file without closing it.
     *
     * @throws If the file has been closed.
     */
    flush(): void;
  }

  /**
   * A file handle opened for reading and writing with `fs.open`.
   *
   * @noSelf
   */
  interface ReadWriteHandle extends ReadHandle, WriteHandle {
    // All methods are inherited from ReadHandle and WriteHandle. The
    // documentation lists all methods again, but they are identical to the
    // ReadHandle/WriteHandle definitions.
  }
}
