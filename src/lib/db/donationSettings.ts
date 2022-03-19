import { Donation_settings, Streamer } from "@prisma/client";
import prisma from "../prisma";

// TODO this is a public data point from every streamer
// therefore, can we really find the steamer by ID?
// maybe.

export const getDonationSettings = async (name: Streamer["name"]) => {
  // TODO manual error handeling

  const streamer = await prisma.streamer.findUnique({
    where: {
      name,
    },
  });
  if (streamer && streamer.id) {
    const donationSettings = await prisma.donation_settings.findUnique({
      where: {
        streamer: streamer.id,
      },
    });
    return donationSettings;
  }
  return undefined;
};

export const updateDonationSettings = (
  streamer: Donation_settings["streamer"],
  data: {
    charPrice?: Donation_settings["charPrice"];
    charLimit?: Donation_settings["charLimit"];
    goal?: Donation_settings["goal"];
    minAmount?: Donation_settings["minAmount"];
    secondPrice?: Donation_settings["secondPrice"];
    gifsMinAmount?: Donation_settings["gifsMinAmount"];
  }
) => {
  console.log(`DB Streamer: ${streamer}`);
  console.log(`DB Data: ${data}`);
  return prisma?.donation_settings.update({
    where: {
      streamer,
    },
    data,
  });
};
