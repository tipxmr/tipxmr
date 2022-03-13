import { Streamer, Account } from "@prisma/client";

// Streamer Table

const alexStreamer: Streamer = {
  id: "f4d63073a23a9bdf441dc2d2a0d00643a766a37d9ce549739a95536876bdffa2",
  alias: "AlexAnarcho",
  name: "alexanarcho",
  socket: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isOnline: false,
  status: "active",
};

const grischaStreamer: Streamer = {
  id: "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399",
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

// Account Table
// const  alexAccount: Account = {
//   streamer: alexStreamer.id,
//   isOnline: false,
//   status: "active"
// }

// const  grischaAccount: Account = {
//   streamer: grischaStreamer.id,
//   isOnline: false,
//   status: "active"
// }

// const  pronasAccount: Account = {
//   streamer: pronasStreamer.id,
//   isOnline: false,
//   status: "active"
// }

// export const testAccounts = [alexAccount, grischaAccount, pronasAccount];

/* const alex: Streamer = {
  id: "f4d63073a23a9bdf441dc2d2a0d00643a766a37d9ce549739a95536876bdffa2",
  animationSettings: {
    bgImg: "",
    charLimit: 99,
    charPrice: 0.0004,
    fontColor: "#FFFFFF",
    fontShadow: true,
    fontSize: "text-4xl",
    gifs: true,
    gifsMinAmount: 0,
    goal: 100,
    goalProgress: 0,
    goalReached: false,
    minAmount: 0,
    secondPrice: 0.00042,
    showGoal: true,
    sound: "",
  },
  creationDate: new Date("2020-09-01"),
  displayName: "AlexAnarcho",
  donationStats: {
    allDonations: [],
    largestDonation: 0,
    totalDonations: 0,
  },
  isOnline: false,
  isPremium: true,
  profilePicture:
    "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  restoreHeight: 667580,
  stream: {
    category: "politics",
    description: "I am a great streamer.",
    language: "🇩🇪",
    platform: "twitch",
    url: "https://www.twitch.tv/n00bprogrammer",
  },
  streamerSocketId: "",
  userName: "alexanarcho",
};

const grischa: Streamer = {
  _id: "b8185a25bbe3b4206e490558ab50b0567deca446d15282e92c5c66fde6693399",
  animationSettings: {
    bgImg: "",
    charLimit: 100,
    charPrice: 0.0004,
    fontColor: "#F23456",
    fontShadow: false,
    fontSize: "xl",
    gifs: true,
    gifsMinAmount: 0,
    goal: 0,
    goalProgress: 0,
    goalReached: false,
    minAmount: 0,
    secondPrice: 0.0042,
    showGoal: false,
    sound: "",
  },
  creationDate: new Date("2020-09-01"),
  displayName: "hundehausen",
  donationStats: {
    allDonations: [],
    largestDonation: 0,
    totalDonations: 0,
  },
  isOnline: false,
  isPremium: false,
  profilePicture: "",
  restoreHeight: 667580,
  stream: {
    category: "XXX",
    description: "I am a greater streamer.",
    language: "🇩🇪",
    platform: "Chaturbate",
    url: "chaturbate.com",
  },
  streamerSocketId: "",
  userName: "hundehausen",
};

const pronas: Streamer = {
  _id: "",
  animationSettings: {
    bgImg: "",
    charLimit: 1000,
    charPrice: 0.0004,
    fontColor: "#F23456",
    fontShadow: false,
    fontSize: "xl",
    gifs: true,
    gifsMinAmount: 0,
    goal: 0,
    goalProgress: 0,
    goalReached: false,
    minAmount: 0,
    secondPrice: 0,
    showGoal: false,
    sound: "",
  },
  creationDate: new Date("2020-09-15"),
  displayName: "Pronas",
  donationStats: {
    allDonations: [],
    largestDonation: 0,
    totalDonations: 0,
  },
  isOnline: false,
  isPremium: true,
  profilePicture: "",
  restoreHeight: 667580,
  streamerSocketId: "",
  stream: {
    category: "technology",
    description: "I am the greatest streamer.",
    language: "🇩🇪",
    platform: "youtube",
    url: "youtube.com",
  },
  userName: "pronas",
};

export const testStreamers = [alex, grischa, pronas];
 */
