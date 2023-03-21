import type { Donation, Streamer } from "@prisma/client";

// Streamer Table

const alexStreamer: Streamer = {
  id: "f4d63073a23a",
  alias: "AlexAnarcho",
  name: "alexanarcho",
  socket: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

const grischaStreamer: Streamer = {
  id: "268b7956d61c",
  alias: "hundehausen",
  name: "hundehausen",
  socket: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

const pronasStreamer: Streamer = {
  id: "",
  alias: "Pronas",
  name: "pronas",
  socket: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

export const testStreamers = [alexStreamer, grischaStreamer, pronasStreamer];

// Dummy Donations
const donation1: Partial<Donation> = {
  isPaid: true,
  amount: 123,
  message: "Hello world",
  displayTimeSeconds: 123,
  donor: "Timothy",
  subaddress:
    "84H6qm4apZhg4jTvjyanfRfcmd1TtTjkpYMX7MFdPFxQPGsPmmFPYwte2hWBh9EyMQdCTeEpEhfGpTkN3W6ovWAwBrKckBL",
  socketDonor: "ojIckSD2jqNzOqIrAGzL",
};

const donation2: Partial<Donation> = {
  isPaid: true,
  amount: 3123,
  message: "Hello world 2",
  displayTimeSeconds: 3123,
  donor: "May",
  subaddress:
    "84H6qm4apZhg4jTvjyanfRfcmd1TtTjkpYMX7MFdPFxQPGsPmmFPYwte2hWBh9EyMQdCTeEpEhfGpTkN3W6ovWAwBrKckBL",
  socketDonor: "ojIckSD2jqNzOqIrAGzL",
};

const donation3: Partial<Donation> = {
  isPaid: true,
  amount: 1337,
  message: "Arise",
  displayTimeSeconds: 1337,
  donor: "Julian",
  subaddress:
    "84H6qm4apZhg4jTvjyanfRfcmd1TtTjkpYMX7MFdPFxQPGsPmmFPYwte2hWBh9EyMQdCTeEpEhfGpTkN3W6ovWAwBrKckBL",
  socketDonor: "ojIckSD2jqNzOqIrAGzL",
};

const donation4: Partial<Donation> = {
  isPaid: false,
  amount: 2.123213,
  message:
    "Hey man, really lovin the stream and all, but lately you just have not been as good as usally. Therefore only a tiny donation. Do better.",
  displayTimeSeconds: 7,
  donor: "Anonymous",
  subaddress:
    "84H6qm4apZhg4jTvjyanfRfcmd1TtTjkpYMX7MFdPFxQPGsPmmFPYwte2hWBh9EyMQdCTeEpEhfGpTkN3W6ovWAwBrKckBL",
  socketDonor: "ojIckSD2jqNzOqIrAGzL",
};

export const dummyDonations = [donation1, donation2, donation3, donation4];
