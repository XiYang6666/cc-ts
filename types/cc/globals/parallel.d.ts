/**
 * A simple way to run several functions at once.
 *
 * Functions are not actually executed simultaneously, but rather this API will
 * automatically switch between them whenever they yield (e.g. whenever they
 * call `coroutine.yield`, or functions that call that - such as `os.pullEvent`
 * - or functions that call that, etc - basically, anything that causes the
 *   function to "pause").
 *
 * Each function executed in "parallel" gets its own copy of the event queue,
 * and so "event consuming" functions (again, mostly anything that causes the
 * script to pause - eg `os.sleep`, `rednet.receive`, most of the `turtle` API,
 * etc) can safely be used in one without affecting the event queue accessed by
 * the other.
 *
 * > [!WARNING] When using this API, be careful to pass the functions you want
 * to run in parallel, and not the result of calling those functions.
 *
 * For instance, the following is correct:
 * ```ts
 * const do_sleep = () => sleep(1);
 * parallel.waitForAny(do_sleep, rednet.receive);
 * ```
 * but the following is NOT:
 * ```ts
 * const do_sleep = () => sleep(1);
 * parallel.waitForAny(do_sleep(), rednet.receive); // Incorrect: do_sleep() is called immediately
 * ```
 * @changed 1.2 New in version 1.2
 *
 * @noSelf
 */
declare namespace parallel {
  /**
   * Switches between execution of the functions, until any of them finishes. If
   * any of the functions errors, the message is propagated upwards from the
   * `parallel.waitForAny` call.
   *
   * @param tasks The functions this task will run.
   * @example
   * - Print a message every second until the q key is pressed.
   * ```ts
   * const tick = () => {
   *   while (true) {
   *     os.sleep(1);
   *     print("Tick");
   *   }
   * };
   * const wait_for_q = () => {
   *   let key: number;
   *   do {
   *     const [, k] = os.pullEvent("key");
   *     key = k as number;
   *   } while (key !== keys.q);
   *   print("Q was pressed!");
   * };
   *
   * parallel.waitForAny(tick, wait_for_q);
   * print("Everything done!");
   * ```
   */
  function waitForAny(...tasks: (() => void)[]): void;

  /**
   * Switches between execution of the functions, until all of them are
   * finished. If any of the functions errors, the message is propagated upwards
   * from the `parallel.waitForAll` call.
   *
   * @param tasks The functions this task will run.
   * @example
   * - Start off two timers and wait for them both to run.
   * ```ts
   * const a = () => {
   *   os.sleep(1);
   *   print("A is done");
   * };
   * const b = () => {
   *   os.sleep(3);
   *   print("B is done");
   * };
   *
   * parallel.waitForAll(a, b);
   * print("Everything done!");
   * ```
   */
  function waitForAll(...tasks: (() => void)[]): void;
}
