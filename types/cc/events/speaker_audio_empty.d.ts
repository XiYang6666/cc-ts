/** @noSelf */
declare namespace os {
  /**
   * Waits for and returns the next event from the event queue.
   *
   * This function blocks until an event matching the `filter` is received.
   *
   * > [!TIP]
   * > The `speaker_audio_empty` event is fired when a speaker's audio buffer becomes empty, indicating it's ready to play more audio.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"speaker_audio_empty"`:
   *            - `name`: The event name, which is `"speaker_audio_empty"`.
   *            - `speakerName`: The name of the speaker which is available to play more audio.
   * @example
   * - This example reads audio data in blocks from "example_song.dfpwm" and attempts to play it using `speaker.playAudio`.
   *   If the speaker's buffer is full, it waits for a `speaker_audio_empty` event and tries again.
   * ```ts
   * // Assuming 'cc.audio.dfpwm' and 'peripheral' are available in the TS environment
   * declare namespace cc.audio.dfpwm {
   *   function make_decoder(): (chunk: string) => string;
   * }
   * declare namespace peripheral {
   *   function find(type: "speaker"): { playAudio(buffer: string): boolean };
   * }
   * declare namespace io {
   *   function lines(path: string, chunkSize: number): LuaIterable<string>;
   * }
   *
   * const dfpwm = cc.audio.dfpwm;
   * const speaker = peripheral.find("speaker");
   *
   * const decoder = dfpwm.make_decoder();
   * for (const chunk of io.lines("data/example.dfpwm", 16 * 1024)) {
   *   const buffer = decoder(chunk);
   *
   *   while (!speaker.playAudio(buffer)) {
   *     os.pullEvent("speaker_audio_empty");
   *   }
   * }
   * ```
   * @see {@link speaker.playAudio} To play audio using the speaker.
   */
  function pullEvent(
    filter: "speaker_audio_empty"
  ): LuaMultiReturn<[name: string, speakerName: string]>;

  /**
   * Waits for and returns the next raw event from the event queue.
   *
   * This function blocks until a raw event matching the `filter` is received. Raw events bypass some internal processing.
   *
   * > [!TIP]
   * > The `speaker_audio_empty` event is fired when a speaker's audio buffer becomes empty, indicating it's ready to play more audio.
   *
   * @param filter The type of event to pull.
   * @returns A tuple containing the event name and event-specific data.
   *          - If `filter` is `"speaker_audio_empty"`:
   *            - `name`: The event name, which is `"speaker_audio_empty"`.
   *            - `speakerName`: The name of the speaker which is available to play more audio.
   * @example
   * - This example reads audio data in blocks from "example_song.dfpwm" and attempts to play it using `speaker.playAudio`.
   *   If the speaker's buffer is full, it waits for a `speaker_audio_empty` event and tries again.
   * ```ts
   * // Assuming 'cc.audio.dfpwm' and 'peripheral' are available in the TS environment
   * declare namespace cc.audio.dfpwm {
   *   function make_decoder(): (chunk: string) => string;
   * }
   * declare namespace peripheral {
   *   function find(type: "speaker"): { playAudio(buffer: string): boolean };
   * }
   * declare namespace io {
   *   function lines(path: string, chunkSize: number): LuaIterable<string>;
   * }
   *
   * const dfpwm = cc.audio.dfpwm;
   * const speaker = peripheral.find("speaker");
   *
   * const decoder = dfpwm.make_decoder();
   * for (const chunk of io.lines("data/example.dfpwm", 16 * 1024)) {
   *   const buffer = decoder(chunk);
   *
   *   while (!speaker.playAudio(buffer)) {
   *     os.pullEventRaw("speaker_audio_empty");
   *   }
   * }
   * ```
   * @see {@link speaker.playAudio} To play audio using the speaker.
   */
  function pullEventRaw(
    filter: "speaker_audio_empty"
  ): LuaMultiReturn<[name: string, speakerName: string]>;
}
