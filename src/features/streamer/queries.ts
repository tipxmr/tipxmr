const streamerKeys = {
  all: ["streamer"] as const,
  online: () => [...streamerKeys.all, "online"] as const,
  subaddress: () => [...streamerKeys.all, "subaddress"] as const,
};

export default streamerKeys;
