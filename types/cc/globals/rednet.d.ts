/**
 * Communicate with other computers by using modems. `rednet` provides a layer
 * of abstraction on top of the main modem peripheral, making it slightly easier
 * to use.
 *
 * ### Basic usage
 * In order to send a message between two computers, each computer must have a
 * modem on one of its sides (or in the case of pocket computers and turtles,
 * the modem must be equipped as an upgrade). The two computers should then call
 * {@link rednet.open}, which sets up the modems ready to send and receive
 * messages.
 *
 * Once `rednet` is opened, you can send messages using {@link rednet.send} and
 * receive them using {@link rednet.receive}. It's also possible to send a
 * message to every `rednet`-using computer using {@link rednet.broadcast}.
 *
 * > [!WARNING] Network security While `rednet` provides a friendly way to send
 * messages to specific computers, it doesn't provide any guarantees about
 * security. Other computers could be listening in to your messages, or even
 * pretending to send messages from other computers!
 *
 * If you're playing on a multi-player server (or at least one where you don't
 * trust other players), it's worth encrypting or signing your `rednet`
 * messages.
 *
 * ### Protocols and hostnames
 * Several `rednet` messages accept "protocol"s - simple string names describing
 * what a message is about. When sending messages using {@link rednet.send} and
 * {@link rednet.broadcast}, you can optionally specify a protocol for the
 * message. This same protocol can then be given to {@link rednet.receive}, to
 * ignore all messages not using this protocol.
 *
 * It's also possible to look-up computers based on protocols, providing a basic
 * system for service discovery and DNS. A computer can advertise that it
 * supports a particular protocol with {@link rednet.host}, also providing a
 * friendly "hostname". Other computers may then find all computers which
 * support this protocol using {@link rednet.lookup}.
 *
 * @see rednet_message Queued when a rednet message is received.
 * @see modem Rednet is built on top of the modem peripheral. Modems provide a
 * more bare-bones but flexible interface.
 * @changed 1.2 New in version 1.2
 *
 * @noSelf
 */
declare namespace rednet {
  /**
   * The channel used by the Rednet API to broadcast messages.
   */
  const CHANNEL_BROADCAST: 65535;

  /**
   * The channel used by the Rednet API to repeat messages.
   */
  const CHANNEL_REPEAT: 65533;

  /**
   * The number of channels rednet reserves for computer IDs.
   * Computers with IDs greater or equal to this limit wrap around to 0.
   */
  const MAX_ID_CHANNELS: 65500;

  /**
   * Opens a modem with the given peripheral name, allowing it to send and
   * receive messages over rednet.
   *
   * This will open the modem on two channels: one which has the same ID as the
   * computer, and another on the broadcast channel.
   *
   * @param modem The name of the modem to open.
   * @throws If there is no such modem with the given name.
   * @example
   * - Open rednet on the back of the computer, allowing you to send and receive rednet messages using it.
   * ```ts
   * rednet.open("back");
   * ```
   * @example
   * - Open rednet on all attached modems. This abuses the "filter" argument to peripheral.find.
   * ```ts
   * peripheral.find("modem", rednet.open);
   * ```
   * @see {@link rednet.close}
   * @see {@link rednet.isOpen}
   */
  function open(modem: string): void;

  /**
   * Close a modem with the given peripheral name, meaning it can no longer send
   * and receive rednet messages.
   *
   * @param modem The side the modem exists on. If not given, all open modems
   * will be closed.
   * @throws If there is no such modem with the given name.
   * @see {@link rednet.open}
   */
  function close(modem?: string): void;

  /**
   * Determine if rednet is currently open.
   *
   * @param modem Which modem to check. If not given, all connected modems will
   * be checked.
   * @returns If the given modem is open.
   * @see {@link rednet.open}
   * @changed 1.31 New in version 1.31
   */
  function isOpen(modem?: string): boolean;

  /**
   * Allows a computer or turtle with an attached modem to send a message
   * intended for a computer with a specific ID. At least one such modem must
   * first be opened before sending is possible.
   *
   * Assuming the target was in range and also had a correctly opened modem, the
   * target computer may then use {@link rednet.receive} to collect the message.
   *
   * @param recipient The ID of the receiving computer.
   * @param message The message to send. Like with `modem.transmit`, this can
   * contain any primitive type (numbers, booleans and strings) as well as
   * tables. Other types (like functions), as well as metatables, will not be
   * transmitted.
   * @param protocol The "protocol" to send this message under. When using
   * {@link rednet.receive} one can filter to only receive messages sent under a
   * particular protocol.
   * @returns If this message was successfully sent (i.e. if rednet is currently
   * open). Note, this does not guarantee the message was actually received.
   * @example
   * - Send a message to computer #2.
   * ```ts
   * rednet.send(2, "Hello from rednet!");
   * ```
   * @see {@link rednet.receive}
   * @changed 1.6 Added protocol parameter.
   * @changed 1.82.0 Now returns whether the message was successfully sent.
   */
  function send(recipient: number, message: any, protocol?: string): boolean;

  /**
   * Broadcasts a string message over the predefined {@link CHANNEL_BROADCAST}
   * channel. The message will be received by every device listening to rednet.
   *
   * @param message The message to send. This should not contain coroutines or
   * functions, as they will be converted to `undefined`.
   * @param protocol The "protocol" to send this message under. When using
   * {@link rednet.receive} one can filter to only receive messages sent under a
   * particular protocol.
   * @example
   * - Broadcast the words "Hello, world!" to every computer using rednet.
   * ```ts
   * rednet.broadcast("Hello, world!");
   * ```
   * @see {@link rednet.receive}
   * @changed 1.6 Added protocol parameter.
   */
  function broadcast(message: any, protocol?: string): void;

  /**
   * Wait for a rednet message to be received, or until `timeout` seconds have
   * elapsed.
   *
   * @param protocol_filter The protocol the received message must be sent with.
   * If specified, any messages not sent under this protocol will be discarded.
   * @param timeout The number of seconds to wait if no message is received.
   * @returns `LuaMultiReturn<[number, any, string | undefined]>` The computer
   * which sent this message, the received message, and the protocol this
   * message was sent under.
   * @returns `LuaMultiReturn<[undefined]>` If the timeout elapsed and no
   * message was received.
   * @example
   * - Receive a rednet message.
   * ```ts
   * const [id, message] = rednet.receive();
   * print(`Computer ${id} sent message ${message}`);
   * ```
   * @example
   * - Receive a message, stopping after 5 seconds if no message was received.
   * ```ts
   * const [id, message] = rednet.receive(undefined, 5);
   * if (id === undefined) {
   *   printError("No message received");
   * } else {
   *   print(`Computer ${id} sent message ${message}`);
   * }
   * ```
   * @example
   * - Receive a message from computer #2.
   * ```ts
   * let id: number | undefined;
   * let message: any;
   * do {
   *   [id, message] = rednet.receive();
   * } while (id !== 2);
   *
   * print(message);
   * ```
   * @see {@link rednet.broadcast}
   * @see {@link rednet.send}
   * @changed 1.6 Added protocol filter parameter.
   */
  function receive(
    protocol_filter?: string,
    timeout?: number
  ): LuaMultiReturn<
    [id: number, message: string, protocol: string | undefined] | [undefined]
  >;

  /**
   * Register the system as "hosting" the desired protocol under the specified
   * name. If a rednet lookup is performed for that protocol (and maybe name) on
   * the same network, the registered system will automatically respond via a
   * background process, hence providing the system performing the lookup with
   * its ID number.
   *
   * Multiple computers may not register themselves on the same network as
   * having the same names against the same protocols, and the title `localhost`
   * is specifically reserved. They may, however, share names as long as their
   * hosted protocols are different, or if they only join a given network after
   * "registering" themselves before doing so (eg while offline or part of a
   * different network).
   *
   * @param protocol The protocol this computer provides.
   * @param hostname The name this computer exposes for the given protocol.
   * @throws If trying to register a hostname which is reserved, or currently in
   * use.
   * @see {@link rednet.unhost}
   * @see {@link rednet.lookup}
   * @changed 1.6 New in version 1.6
   */
  function host(protocol: string, hostname: string): void;

  /**
   * Stop hosting a specific protocol, meaning it will no longer respond to {@link rednet.lookup} requests.
   *
   * @param protocol The protocol to unregister your self from.
   * @changed 1.6 New in version 1.6
   */
  function unhost(protocol: string): void;

  /**
   * Search the local rednet network for systems hosting the desired protocol
   * and returns any computer IDs that respond as "registered" against it.
   *
   * @param protocol The protocol to search for.
   * @returns A list of computer IDs hosting the given protocol.
   * @example
   * - Find all computers which are hosting the "chat" protocol.
   * ```ts
   * const computers = rednet.lookup("chat");
   * print(`${computers.length} computers available to chat`);
   * for (const computer of computers) {
   *   print(`Computer #${computer}`);
   * }
   * ```
   * @changed 1.6 New in version 1.6
   */
  function lookup(protocol: string): number[];

  /**
   * Search the local rednet network for systems hosting the desired protocol
   * and returns any computer IDs that respond as "registered" against it.
   *
   * If a hostname is specified, only one ID will be returned (assuming an exact
   * match is found).
   *
   * @param protocol The protocol to search for.
   * @param hostname The hostname to search for.
   * @returns The computer ID with the provided hostname and protocol, or
   * `undefined` if none exists.
   * @example
   * - Find a computer hosting the "chat" protocol with a hostname of "my_host".
   * ```ts
   * const id = rednet.lookup("chat", "my_host");
   * if (id !== undefined) {
   *   print(`Found my_host at computer #${id}`);
   * } else {
   *   printError("Cannot find my_host");
   * }
   * ```
   * @changed 1.6 New in version 1.6
   */
  function lookup(protocol: string, hostname: string): number | undefined;

  /**
   * Listen for modem messages and converts them into rednet messages, which may
   * then be received.
   *
   * This is automatically started in the background on computer startup, and
   * should not be called manually.
   */
  function run(): void;
}
