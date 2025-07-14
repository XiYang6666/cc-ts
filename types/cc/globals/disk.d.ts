/**
 * Interact with disk drives.
 *
 * These functions can operate on locally attached or remote disk drives. To use
 * a locally attached drive, specify “side” as one of the six sides (e.g. left);
 * to use a remote disk drive, specify its name as printed when enabling its
 * modem (e.g. drive_0).
 *
 * > [!TIP] All computers (except command computers), turtles and pocket
 * > computers can be placed within a disk drive to access it's internal storage
 * > like a disk.
 *
 * @since 1.2
 * 
 * @noSelf
 */
declare namespace disk {
  /**
   * Checks whether any item at all is in the disk drive
   * @param name The name of the disk drive.
   * @returns If something is in the disk drive.
   * @example
   * ```ts
   * disk.isPresent("top");
   * ```
   */
  function isPresent(name: string): boolean;

  /**
   * Get the label of the floppy disk, record, or other media within the given
   * disk drive.
   *
   * If there is a computer or turtle within the drive, this will set the label
   * as read by os.getComputerLabel.
   * @param name The name of the disk drive.
   * @returns The name of the current media, or `undefined` if the drive is not
   * present or empty.
   * @see {@link disk.setLabel}
   */
  function getLabel(name: string): string | undefined;

  /**
   * Set the label of the floppy disk or other media
   * @param name The name of the disk drive.
   * @param label The new label of the disk.
   */
  function setLabel(name: string, label: string | undefined): void;

  /**
   * Check whether the current disk provides a mount.
   *
   * This will return `true` for disks and computers, but not records.
   * @param name The name of the disk drive.
   * @returns If the disk is present and provides a mount.
   * @see {@link disk.getMountPath}
   */
  function hasData(name: string): boolean;

  /**
   * Find the directory name on the local computer where the contents of the
   * current floppy disk (or other mount) can be found.
   * @param name The name of the disk drive.
   * @returns The mount's directory, or `undefined` if the drive does not
   * contain a floppy or computer.
   * @see {@link disk.hasData}
   */
  function getMountPath(name: string): string | undefined;

  /**
   * Whether the current disk is a music disk as opposed to a floppy disk or
   * other item.
   *
   * If this returns `true`, you will can play the record.
   * @param name The name of the disk drive.
   * @returns If the disk is present and has audio saved on it.
   */
  function hasAudio(name: string): boolean;

  /**
   * Get the title of the audio track from the music record in the drive.
   *
   * This generally returns the same as `disk.getLabel` for records.
   * @param name The name of the disk drive.
   * @returns The track title, `false` if there is not a music record in the
   * drive or `undefined` if no drive is present.
   */
  function getAudioTitle(name: string): string | boolean | undefined;

  /**
   * Starts playing the music record in the drive.
   *
   * If any record is already playing on any disk drive, it stops before the
   * target drive starts playing. The record stops when it reaches the end of
   * the track, when it is removed from the drive, when `disk.stopAudio` is
   * called, or when another record is started.
   * @param name The name of the disk drive.
   * @example
   * ```ts
   * disk.playAudio("bottom");
   * ```
   */
  function playAudio(name: string): void;

  /**
   * Stops the music record in the drive from playing, if it was started with
   * `disk.playAudio`.
   * @param name The name of the disk drive.
   */
  function stopAudio(name: string): void;

  /**
   * Ejects any item currently in the drive, spilling it into the world as a
   * loose item.
   * @param name The name of the disk drive.
   * @example
   * ```ts
   * disk.eject("bottom");
   * ```
   */
  function eject(name: string): void;

  /**
   * Returns a number which uniquely identifies the disk in the drive.
   *
   * Note, unlike `disk.getLabel`, this does not return anything for other
   * media, such as computers or turtles.
   * @param name The name of the disk drive.
   * @returns The disk ID, or `undefined` if the drive does not contain a floppy
   * disk.
   * @since 1.4
   */
  function getID(name: string): string | undefined;
}
