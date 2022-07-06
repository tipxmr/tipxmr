import { Streamer, Account } from "@prisma/client";

// Streamer Table

const alexStreamer: Streamer = {
  id: "f4d63073a23a9bdf441dc2d2a0d00643a766a37d9ce549739a95536876bdffa2",
  alias: "AlexAnarcho",
  name: "alexanarcho",
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

const grischaStreamer: Streamer = {
  id: "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399",
  alias: "hundehausen",
  name: "hundehausen",
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

const pronasStreamer: Streamer = {
  id: "",
  alias: "Pronas",
  name: "pronas",
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

export const testStreamers = [alexStreamer, grischaStreamer, pronasStreamer];
