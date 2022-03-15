import { Donation_settings } from "@prisma/client";
import prisma from "../prisma";

export const getDonationSettings = (
  streamer: Donation_settings["streamer"]
) => {
  // TODO manual error handeling
  return prisma.donation_settings.findUnique({
    where: {
      streamer,
    },
  });
};

// export const removeAccount = (streamer: Account["streamer"]) => {
//   return prisma.account.delete({
//     where: {
//       streamer,
//     },
//   });
// };

// export const createAccount = (
//   streamer: Account["streamer"],
//   data: {
//     createdAt: Account["createdAt"];
//     isOnline: Account["isOnline"];
//     status: Statuses;
//   }
// ) => {
//   return prisma?.account.create({
//     data: {
//       streamer,
//       ...data,
//     },
//   });
// };

export const updateDonationSettings = (
  streamer: Donation_settings["streamer"],
  data: {
    charPrice?: Donation_settings["charPrice"]
    charLimit?: Donation_settings["charLimit"]
    goal?: Donation_settings["goal"]
    minAmount?: Donation_settings["minAmount"]
    secondPrice?: Donation_settings["secondPrice"]
    gifsMinAmount?: Donation_settings["gifsMinAmount"]
  }
) => {
  return prisma?.donation_settings.update({
    where: {
      streamer,
    },
    data,
  });
};
