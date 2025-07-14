/**
 * Convert between streams of DFPWM audio data and a list of amplitudes.
 *
 * DFPWM (Dynamic Filter Pulse Width Modulation) is an audio codec designed by GreaseMonkey.
 * It's a relatively compact format compared to raw PCM data, only using 1 bit per sample,
 * but is simple enough to encode and decode in real time.
 *
 * Typically DFPWM audio is read from the filesystem or a a web request as a string,
 * and converted a format suitable for `speaker.playAudio`.
 *
 * ### Encoding and decoding files
 * This module exposes two key functions, {@link make_decoder} and {@link make_encoder},
 * which construct a new decoder or encoder. The returned encoder/decoder is itself a function,
 * which converts between the two kinds of data.
 *
 * These encoders and decoders have lots of hidden state, so you should be careful to use the
 * same encoder or decoder for a specific audio stream. Typically you will want to create a
 * decoder for each stream of audio you read, and an encoder for each one you write.
 *
 * ### Converting audio to DFPWM
 * DFPWM is not a popular file format and so standard audio processing tools may not have an
 * option to export to it. Instead, you can convert audio files online using `music.madefor.cc`,
 * the `LionRay Wav Converter` Java application or `FFmpeg 5.1` or later.
 *
 * @example
 * - Reads "data/example.dfpwm" in chunks, decodes them and then doubles the speed of the audio.
 *   The resulting audio is then re-encoded and saved to "speedy.dfpwm".
 *   This processed audio can then be played with the speaker program.
 * ```ts
 * import * as dfpwm from "cc.audio.dfpwm";
 *
 * const encoder = dfpwm.make_encoder();
 * const decoder = dfpwm.make_decoder();
 *
 * const [out] = fs.open("speedy.dfpwm", "wb");
 * if (out) {
 *   for (const input of io.lines("data/example.dfpwm", 16 * 1024 * 2)) {
 *     const decoded = decoder(input);
 *     const output: number[] = [];
 *
 *     // Read two samples at once and take the average.
 *     for (let i = 0; i < decoded.length; i += 2) {
 *       const value_1 = decoded[i];
 *       const value_2 = decoded[i + 1];
 *       // If decoded.length is odd, value_2 will be undefined. Average value_1 with itself.
 *       output[Math.floor((i + 1) / 2)] = (value_1 + (value_2 ?? value_1)) / 2;
 *     }
 *
 *     out.write(encoder(output));
 *
 *     sleep(0); // This program takes a while to run, so we need to make sure we yield.
 *   }
 *   out.close();
 * }
 * ```
 * @see {@link Playing audio with speakers} Gives a more general introduction to audio processing and the speaker.
 * @see {@link speaker.playAudio} To play the decoded audio data.
 * @changed 1.100.0 New in version 1.100.0
 * 
 * @noSelf
 */
declare module "cc.audio.dfpwm" {
    /**
     * Create a new encoder for converting PCM audio data into DFPWM.
     *
     * The returned encoder is itself a function. This function accepts a table of amplitude data
     * between -128 and 127 and returns the encoded DFPWM data.
     *
     * > [!WARNING] Reusing encoders
     * Encoders have lots of internal state which tracks the state of the current stream.
     * If you reuse an encoder for multiple streams, or use different encoders for the same stream,
     * the resulting audio may not sound correct.
     *
     * @returns The encoder function: `(pcm: number[]) => string`.
     * @see {@link encode} A helper function for encoding an entire file of audio at once.
     */
    function make_encoder(): (pcm: number[]) => string;

    /**
     * A convenience function for encoding a complete file of audio at once.
     *
     * This should only be used for complete pieces of audio. If you are writing multiple chunks
     * to the same place, you should use an encoder returned by {@link make_encoder} instead.
     *
     * @param input The table of amplitude data.
     * @returns The encoded DFPWM data.
     * @see {@link make_encoder}
     */
    export function encode(input: number[]): string;

    /**
     * Create a new decoder for converting DFPWM into PCM audio data.
     *
     * The returned decoder is itself a function. This function accepts a string and returns a
     * table of amplitudes, each value between -128 and 127.
     *
     * > [!WARNING] Reusing decoders
     * Decoders have lots of internal state which tracks the state of the current stream.
     * If you reuse an decoder for multiple streams, or use different decoders for the same stream,
     * the resulting audio may not sound correct.
     *
     * @returns The decoder function: `(dfpwm: string) => number[]`.
     * @example
     * - Reads "data/example.dfpwm" in blocks of 16KiB (the speaker can accept a maximum of 128×1024 samples),
     *   decodes them and then plays them through the speaker.
     * ```ts
     * import * as dfpwm from "cc.audio.dfpwm";
     * const speaker = peripheral.find("speaker");
     *
     * const decoder = dfpwm.make_decoder();
     * for (const input of io.lines("data/example.dfpwm", 16 * 1024)) {
     *   const decoded = decoder(input);
     *   while (!speaker.playAudio(decoded)) {
     *     os.pullEvent("speaker_audio_empty");
     *   }
     * }
     * ```
     * @see {@link decode} A helper function for decoding an entire file of audio at once.
     */
    export function make_decoder(): (dfpwm: string) => number[];

    /**
     * A convenience function for decoding a complete file of audio at once.
     *
     * This should only be used for short files. For larger files, one should read the file in chunks
     * and process it using {@link make_decoder}.
     *
     * @param input The DFPWM data to convert.
     * @returns The produced amplitude data.
     * @see {@link make_decoder}
     */
    export function decode(input: string): number[];
}