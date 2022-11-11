const streamerKeys = {
  all: ["streamer"] as const,
  online: () => [...streamerKeys.all, "online"] as const,
};

export default streamerKeys;
