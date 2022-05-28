import { Account, Status } from "@prisma/client";
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
    status: Status;
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
    status?: Status;
  }
) => {
  return prisma?.account.update({
    where: {
      streamer,
    },
    data,
  });
};
