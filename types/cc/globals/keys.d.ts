/**
 * Constants for all keyboard "key codes", as queued by the key event.
 *
 * These values are not guaranteed to remain the same between versions. It is
 * recommended that you use the constants provided by this file, rather than the
 * underlying numerical values.
 *
 * @changed 1.4 New in version 1.4
 *
 * @noSelf
 */
declare namespace keys {
  /**
   * Translates a numerical key code to a human-readable name. The
   * human-readable name is one of the constants in the keys API.
   *
   * @param code The key code to look up.
   * @returns The name of the key, or `undefined` if not a valid key code.
   * @example
   * - Example usage
   * ```ts
   * keys.getName(keys.enter);
   * ```
   */
  function getName(code: number): string | undefined;

  // The following are common key code constants implied by the API's nature and
  // usage examples. They are not explicitly enumerated in the provided text but
  // are fundamental to the 'keys' API.

  const multiply: number;
  const g: number;
  /** @customName return */
  const return_: number;
  const e: number;
  const j: number;
  const k: number;
  const h: number;
  const i: number;
  const n: number;
  const o: number;
  const f5: number;
  const period: number;
  const insert: number;
  const up: number;
  const p: number;
  const q: number;
  /** @customName delete */
  const delete_: number;
  const numPad4: number;
  const at: number;
  const numPad9: number;
  const two: number;
  const rightBracket: number;
  const rightAlt: number;
  const b: number;
  const c: number;
  const a: number;
  const zero: number;
  const down: number;
  const numLock: number;
  const semiColon: number;
  const minus: number;
  const left: number;
  const leftShift: number;
  const equals: number;
  const f4: number;
  const numPad3: number;
  const convert: number;
  const f2: number;
  const rightShift: number;
  const one: number;
  const ax: number;
  const numPad0: number;
  const m: number;
  const stop: number;
  const numPadDivide: number;
  const backspace: number;
  const apostrophe: number;
  const cimcumflex: number;
  const f9: number;
  const f1: number;
  const u: number;
  const t: number;
  const three: number;
  const d: number;
  const f13: number;
  const four: number;
  const l: number;
  const s: number;
  const tab: number;
  const eight: number;
  const numPadEnter: number;
  const f12: number;
  const seven: number;
  const f7: number;
  const circumflex: number;
  const f11: number;
  const f: number;
  const leftAlt: number;
  const numPadComma: number;
  const colon: number;
  const f3: number;
  const noconvert: number;
  const home: number;
  const grave: number;
  const numPadAdd: number;
  const f10: number;
  const f8: number;
  const pageDown: number;
  const numPad7: number;
  const f14: number;
  const right: number;
  const enter: number;
  const numPadSubtract: number;
  const space: number;
  const numPad1: number;
  const numPad6: number;
  const numPad5: number;
  const pageUp: number;
  const nine: number;
  const numPad8: number;
  const numPad2: number;
  const capsLock: number;
  const f15: number;
  const comma: number;
  const scrollLock: number;
  const f6: number;
  const yen: number;
  const kanji: number;
  const numPadDecimal: number;
  const r: number;
  const pause: number;
  const six: number;
  const v: number;
  const w: number;
  const end: number;
  const numPadEquals: number;
  const z: number;
  const five: number;
  const x: number;
  const y: number;
  const backslash: number;
  const underscore: number;
  const kana: number;
  const rightCtrl: number;
  const slash: number;
  const scollLock: number;
  const leftCtrl: number;
  const leftBracket: number;
}
