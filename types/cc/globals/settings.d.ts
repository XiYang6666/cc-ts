/**
 * Read and write configuration options for CraftOS and your programs.
 *
 * When a computer starts, it reads the current value of settings from the
 * `/.settings` file. These values then may be read or modified.
 *
 * > [!WARNING] Calling {@link settings.set} does not update the settings file
 * by default. You must call {@link settings.save} to persist values.
 *
 * @noSelf
 */
declare namespace settings {
  /**
   * Define a new setting, optionally specifying various properties about it.
   *
   * While settings do not have to be added before being used, doing so allows
   * you to provide defaults and additional metadata.
   *
   * @param name The name of this option.
   * @param options Options for this setting.
   * @example
   * - Define an basic setting `123` and read its value.
   * ```ts
   * settings.define("my.setting", {
   *     description: "An example setting",
   *     default: 123,
   *     type: "number",
   * });
   * print("my.setting = " + settings.get("my.setting")); // 123
   * ```
   * You can then use the `set` program to change its value (e.g. `set my.setting 456`),
   * and then re-run the example program to check it has changed.
   * @changed 1.78 New in version 1.78 (for the module itself)
   * @changed 1.87.0 New in version 1.87.0 (for this function)
   */
  function define(name: string, options?: SettingOptions): void;

  /**
   * Options for defining a setting.
   * @internal
   */
  interface SettingOptions {
    /**
     * A description which may be printed when running the `set` program.
     */
    description?: string;
    /**
     * A default value, which is returned by {@link settings.get} if the setting
     * has not been changed.
     */
    default?: unknown;
    /**
     * Require values to be of this type. Setting the value to another type will error.
     * Must be one of: `"number"`, `"string"`, `"boolean"`, or `"table"`.
     */
    type?: "number" | "string" | "boolean" | "table";
  }

  /**
   * Remove a definition of a setting.
   *
   * If a setting has been changed, this does not remove its value. Use
   * {@link settings.unset} for that.
   *
   * @param name The name of this option.
   * @changed 1.87.0 New in version 1.87.0
   */
  function undefine(name: string): void;

  /**
   * Set the value of a setting.
   *
   * > [!WARNING] Calling `settings.set` does not update the settings file by
   * default. You must call {@link settings.save} to persist values.
   *
   * @param name The name of the setting to set.
   * @param value The setting's value. This cannot be `undefined`, and must be
   * serialisable by `textutils.serialize`.
   * @throws If this value cannot be serialised.
   * @see {@link settings.unset}
   */
  function set(name: string, value: unknown): void;

  /**
   * Get the value of a setting.
   *
   * @param name The name of the setting to get.
   * @param defaultValue The value to use should there be no pre-existing value
   *                     for this setting. If not given, it will use the
   *                     setting's default value if defined, or `undefined`
   *                     otherwise.
   * @returns The setting's value, or the default if the setting has not been
   * changed.
   * @changed 1.87.0 Now respects default value if pre-defined and default is
   * unset.
   */
  function get(name: string, defaultValue?: unknown): unknown;

  /**
   * Get details about a specific setting.
   *
   * @param name The name of the setting to get.
   * @returns Information about this setting. This includes all information from
   * {@link settings.define}, as well as this setting's value.
   * @changed 1.87.0 New in version 1.87.0
   */
  function getDetails(name: string): SettingDetails;

  /**
   * Details about a specific setting, including its current value.
   * @internal
   */
  interface SettingDetails {
    /** A description which may be printed when running the `set` program. */
    description?: string;
    /** A default value, which is returned by {@link settings.get} if the
     * setting has not been changed. */
    default?: unknown;
    /** The required type for this setting. */
    type?: "number" | "string" | "boolean" | "table";
    /** The current value of the setting. */
    value?: unknown;
  }

  /**
   * Remove the value of a setting, setting it to the default.
   *
   * {@link settings.get} will return the default value until the setting's
   * value is set, or the computer is rebooted.
   *
   * @param name The name of the setting to unset.
   * @see {@link settings.set}
   * @see {@link settings.clear}
   */
  function unset(name: string): void;

  /**
   * Resets the value of all settings. Equivalent to calling
   * {@link settings.unset} on every setting.
   * @see {@link settings.unset}
   */
  function clear(): void;

  /**
   * Get the names of all currently defined settings.
   *
   * @returns An alphabetically sorted list of all currently-defined settings.
   */
  function getNames(): string[];

  /**
   * Load settings from the given file.
   *
   * Existing settings will be merged with any pre-existing ones. Conflicting
   * entries will be overwritten, but any others will be preserved.
   *
   * @param path The file to load from. Defaults to `".settings"`.
   * @returns Whether settings were successfully read from this file. Reasons
   * for failure may include the file not existing or being corrupted.
   * @see {@link settings.save}
   * @changed 1.87.0 `path` is now optional.
   */
  function load(path?: string): boolean;

  /**
   * Save settings to the given file.
   *
   * This will entirely overwrite the pre-existing file. Settings defined in the
   * file, but not currently loaded will be removed.
   *
   * @param path The path to save settings to. Defaults to `".settings"`.
   * @returns If the settings were successfully saved.
   * @see {@link settings.load}
   * @changed 1.87.0 `path` is now optional.
   */
  function save(path?: string): boolean;
}
