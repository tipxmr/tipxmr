import { Donation } from "@prisma/client";
import prisma from "../prisma";

export const createBlankDonation = async (
  streamer: Donation["streamer"],
  data: {
    subaddress: Donation["subaddress"];
  }
) => {
  const { subaddress } = data;
  console.log({ subaddress });
  return await prisma?.donation.create({
    data: {
      streamer,
      subaddress,
    },
  });
};

export const createDonation = async (
  streamer: Donation["streamer"],
  data: {
    amount?: Donation["amount"];
    message?: Donation["message"];
    displayTimeSeconds?: Donation["displayTimeSeconds"];
    subaddress: Donation["subaddress"];
    giphyUrl?: Donation["giphyUrl"];
    donor?: Donation["donor"];
    timestamp?: Donation["timestamp"];
  }
) => {
  // TODO manual error handeling
  const { subaddress } = data;
  console.log({ subaddress });
  return await prisma?.donation.create({
    data: {
      streamer,
      subaddress,
    },
  });
};

export const updateDonation = (
  streamer: Donation["streamer"],
  data: {
    amount?: Donation["amount"];
    message?: Donation["message"];
    displayTimeSeconds?: Donation["displayTimeSeconds"];
    subaddress: Donation["subaddress"];
    giphyUrl?: Donation["giphyUrl"];
    donor?: Donation["donor"];
    timestamp?: Donation["timestamp"];
  }
) => {
  return prisma?.donation.update({
    where: {
      streamer,
    },
    data,
  });
};

export const getDonation = async (streamer: Donation["streamer"]) => {
  // TODO manual error handeling
  return await prisma.donation.findUnique({
    where: {
      streamer,
    },
  });
};
