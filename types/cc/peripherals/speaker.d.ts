/**
 * The speaker peripheral allows your computer to play notes and other sounds.
 *
 * The speaker can play three kinds of sound, in increasing orders of
 * complexity:
 *
 * - `playNote` allows you to play noteblock note.
 * - `playSound` plays any built-in Minecraft sound, such as block sounds or mob
 *   noises.
 * - `playAudio` can play arbitrary audio.
 *
 * @since 1.80pr1
 *
 * @noSelf
 */
declare interface SpeakerPeripheral extends BasePeripheral {
  /**
   * Plays a note block note through the speaker.
   *
   * This takes the name of a note to play, as well as optionally the volume and
   * pitch to play the note at.
   *
   * The pitch argument uses semitones as the unit. This directly maps to the
   * number of clicks on a note block. For reference, 0, 12, and 24 map to F#,
   * and 6 and 18 map to C.
   *
   * A maximum of 8 notes can be played in a single tick. If this limit is hit,
   * this function will return `false`.
   *
   * Valid instruments: `"harp"`, `"basedrum"`, `"snare"`, `"hat"`, `"bass"`,
   * `"flute"`, `"bell"`, `"guitar"`, `"chime"`, `"xylophone"`,
   * `"iron_xylophone"`, `"cow_bell"`, `"didgeridoo"`, `"bit"`, `"banjo"` and
   * `"pling"`.
   *
   * @param instrument The instrument to use to play this note.
   * @param [volume=1.0] The volume to play the note at, from 0.0 to 3.0.
   * @param [pitch=12] The pitch to play the note at in semitones, from 0 to 24.
   * @returns Whether the note could be played as the limit was reached.
   * @throws If the instrument doesn't exist.
   */
  playNote(instrument: string, volume?: number, pitch?: number): boolean;

  /**
   * Plays a Minecraft sound through the speaker.
   *
   * This takes the name of a Minecraft sound, such as
   * `"minecraft:block.note_block.harp"`, as well as an optional volume and
   * pitch.
   *
   * Only one sound can be played at once. This function will return `false` if
   * another sound was started this tick, or if some audio is still playing.
   *
   * @param name The name of the sound to play.
   * @param [volume=1.0] The volume to play the sound at, from 0.0 to 3.0.
   * @param [pitch=1.0] The speed to play the sound at, from 0.5 to 2.0.
   * @returns Whether the sound could be played.
   * @throws If the sound name was invalid.
   */
  playSound(name: string, volume?: number, pitch?: number): boolean;

  /**
   * Attempt to stream some audio data to the speaker.
   *
   * This accepts a list of audio samples as amplitudes between -128 and 127.
   * These are stored in an internal buffer and played back at 48kHz. If this
   * buffer is full, this function will return `false`. Programs should wait for
   * a `speaker_audio_empty` event before trying to play audio again.
   *
   * The speaker only buffers a single call to `playAudio` at once. This means
   * if you try to play a small number of samples, you'll have a lot of stutter.
   * You should try to play as many samples in one call as possible (up to
   * 128×1024), as this reduces the chances of audio stuttering or halting,
   * especially when the server or computer is lagging.
   *
   * While the speaker accepts 8-bit PCM audio, the audio stream is re-encoded
   * before being played. This means that the supplied samples may not be played
   * out exactly.
   *
   * @param audio A list of amplitudes.
   * @param [volume] The volume to play this audio at. If not given, defaults to
   * the previous volume given to `playAudio`.
   * @returns If there was room to accept this audio data.
   * @throws If the audio data is malformed.
   * @link cc.audio.dfpwm Provides utilities for decoding DFPWM audio files into
   * a format which can be played by the speaker.
   * @link Playing audio with speakers For a more complete introduction to the
   * `playAudio` function.
   * @since 1.100
   */
  playAudio(audio: number[], volume?: number): boolean;

  /**
   * Stop all audio being played by this speaker.
   *
   * This clears any audio that `playAudio` had queued and stops the latest
   * sound played by `playSound`.
   * @since 1.100
   */
  stop(): void;
}
