import { DonationSettings, Streamer } from "@prisma/client";
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
  streamer: DonationSettings["streamer"],
  data: {
    charPrice?: DonationSettings["charPrice"];
    charLimit?: DonationSettings["charLimit"];
    goal?: DonationSettings["goal"];
    minAmount?: DonationSettings["minAmount"];
    secondPrice?: DonationSettings["secondPrice"];
    gifsMinAmount?: DonationSettings["gifsMinAmount"];
  }
) => {
  return prisma?.donation_settings.update({
    where: {
      streamer,
    },
    data,
  });
};
