export type Streamer = {
  id: string;
  name: string;
  alias: string;
  socket: string | null;
};

export type Account = {
  streamer: string;
  createdAt: Date;
  isOnline: boolean;
  status: "active" | "inactive";
}

export type Wallet = {
  streamer: string;
  restoreHeight: number;
  lastSyncHeight: number;
}

/* export type Streamer = {
  _id: string;
  animationSettings: {
    bgImg: string;
    charLimit: number;
    charPrice: number;
    fontColor: string;
    fontShadow: boolean;
    fontSize: string;
    gifs: boolean;
    gifsMinAmount: number;
    goal: number;
    goalProgress: number;
    goalReached: boolean;
    minAmount: number;
    secondPrice: number;
    showGoal: boolean;
    sound: string;
  };
  creationDate: Date;
  displayName: string;
  donationStats: {
    allDonations: unknown[];
    largestDonation: number;
    totalDonations: number;
  };
  isOnline: boolean;
  isPremium: boolean;
  profilePicture: string;
  restoreHeight: number;
  stream: {
    category: string;
    description: string;
    language: string;
    platform: string;
    url: string;
  };
  streamerSocketId: string;
  userName: string;
}; */
