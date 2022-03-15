import { Account, Statuses } from "@prisma/client";
import prisma from "../prisma";

export const getAccount = (streamer: Account["streamer"]) => {
  // TODO manual error handeling
  return prisma.account.findUnique({
    where: {
      streamer,
    },
  });
};

export const removeAccount = (streamer: Account["streamer"]) => {
  return prisma.account.delete({
    where: {
      streamer,
    },
  });
};

export const createAccount = (
  streamer: Account["streamer"],
  data: {
    createdAt: Account["createdAt"];
    isOnline: Account["isOnline"];
    status: Statuses;
  }
) => {
  return prisma?.account.create({
    data: {
      streamer,
      ...data,
    },
  });
};

export const updateAccount = (
  streamer: Account["streamer"],
  data: {
    createdAt?: Account["createdAt"];
    isOnline?: Account["isOnline"];
    status?: Statuses;
  }
) => {
  return prisma?.account.update({
    where: {
      streamer,
    },
    data,
  });
};
