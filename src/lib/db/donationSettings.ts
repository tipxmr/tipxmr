import { DonationSetting, Streamer } from "@prisma/client";
import prisma from "../prisma";

// TODO this is a public data point from every streamer
// therefore, can we really find the steamer by ID?
// maybe.
type DonationSettingUpate = Pick<
  DonationSetting,
  | "charPrice"
  | "charLimit"
  | "goal"
  | "minAmount"
  | "secondPrice"
  | "gifsMinAmount"
>;

export const getDonationSettings = async (name: Streamer["name"]) => {
  // TODO manual error handeling
  // --- first look up the streamer
  const streamer = await prisma.streamer.findUnique({
    where: {
      name,
    },
  });
  if (streamer && streamer.id) {
    // -> then the settings
    return prisma.donationSetting.findUnique({
      where: {
        streamer: streamer.id,
      },
    });
  }
  return undefined;
};

export const updateDonationSettings = (
  streamer: DonationSetting["streamer"],
  data: DonationSettingUpate
) => {
  return prisma?.donationSetting.update({
    where: {
      streamer,
    },
    data,
  });
};
