import { Streamer } from "@prisma/client";
import type { Namespace } from "socket.io";
import type { Socket } from "socket.io-client";

export interface StreamerClientToServerEvents {
  online: (socketId: string) => void;
  offline: () => void;
}

export interface StreamerServerToClientEvents {
  fetch: (foobar: string) => void;
}

// Unused for now
// interface StreamerInterServerEvents {
//   // ...
// }

// interface StreamerSocketData {
//   // ...
// }

export interface DonationClientToServerEvents {
  create: (streamerId: string) => void;
  fetched: (subaddress: Streamer) => void;
}

export interface DonationServerToClientEvents {
  created: (subaddress: string) => void;
}

// Unused for now
// interface DonationInterServerEvents {
//   // ...
// }

// interface DonationSocketData {
//   // ...
// }

// Used on server
export type StreamerNsp = Namespace<
  StreamerClientToServerEvents,
  StreamerServerToClientEvents
  // StreamerInterServerEvents,
  // StreamerSocketData
>;

// Used on server
export type DonationNsp = Namespace<
  DonationClientToServerEvents,
  DonationServerToClientEvents
  // DonationInterServerEvents,
  // DonationSocketData
>;

export type Namespaces = {
  streamerNsp: StreamerNsp;
  donationNsp: DonationNsp;
};

// Used on client
export type StreamerSocket = Socket<
  StreamerServerToClientEvents,
  StreamerClientToServerEvents
>;

// Used on client
export type DonationSocket = Socket<
  DonationServerToClientEvents,
  DonationClientToServerEvents
>;
