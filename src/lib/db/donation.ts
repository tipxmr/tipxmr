import { Donation } from "@prisma/client";

import prisma from "../prisma";

type BlankDonation = Pick<Donation, "subaddress">;
type DonationInputType = Pick<
  Donation,
  | "amount"
  | "message"
  | "displayTimeSeconds"
  | "subaddress"
  | "giphyUrl"
  | "donor"
  | "timestamp"
>;

export const createBlankDonation = async (
  streamer: Donation["streamer"],
  data: BlankDonation
) => {
  const { subaddress } = data;
  return prisma?.donation.create({
    data: {
      streamer,
      subaddress,
    },
  });
};

export const createDonation = async (
  streamer: Donation["streamer"],
  data: DonationInputType
) => {
  // TODO manual error handeling
  const { subaddress } = data;
  return prisma?.donation.create({
    data: {
      streamer,
      subaddress,
    },
  });
};

export const updateDonation = async (
  streamer: Donation["streamer"],
  data: DonationInputType
) => {
  // TODO to update the right donation, we have to get it by id... not by the streamer.
  if (streamer === null) throw new Error("Cannot do this - sorry");
  return prisma?.donation.update({
    where: {
      streamer,
    },
    data,
  });
};

export const getDonation = async (streamer: Donation["streamer"]) => {
  // TODO manual error handeling
  return prisma.donation.findFirstOrThrow({
    where: {
      streamer,
    },
  });
};
