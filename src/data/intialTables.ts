import { Account, Streamer } from '@prisma/client'

// Streamer Table

const alexStreamer: Streamer = {
  id: 'f4d63073a23a9bdf441dc2d2a0d00643a766a37d9ce549739a95536876bdffa2',
  alias: 'AlexAnarcho',
  name: 'alexanarcho',
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: 'active',
}

const grischaStreamer: Streamer = {
  id: 'b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399',
  alias: 'hundehausen',
  name: 'hundehausen',
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: 'active',
}

const pronasStreamer: Streamer = {
  id: '',
  alias: 'Pronas',
  name: 'pronas',
  socket: null,
  updatedAt: new Date(),
  isOnline: false,
  status: 'active',
}

export const testStreamers = [alexStreamer, grischaStreamer, pronasStreamer]

// Dummy Donations
const donation1 = {
  isPaid: true,
  amount: 123,
  message: 'Hello world',
  displayTimeSeconds: 123,
  donor: 'Timothy',
}

const donation2 = {
  isPaid: true,
  amount: 3123,
  message: 'Hello world 2',
  displayTimeSeconds: 3123,
  donor: 'May',
}

const donation3 = {
  isPaid: true,
  amount: 1337,
  message: 'Arise',
  displayTimeSeconds: 1337,
  donor: 'Julian',
}

const donation4 = {
  isPaid: false,
  amount: 2.123213,
  message:
    'Hey man, really lovin the stream and all, but lately you just have not been as good as usally. Therefore only a tiny donation. Do better.',
  displayTimeSeconds: 7,
  donor: 'Anonymous',
}

export const dummyDonations = [donation1, donation2, donation3, donation4]
