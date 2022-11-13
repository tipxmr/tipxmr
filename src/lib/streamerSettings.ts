import { Account,Streamer } from "@prisma/client";

import prisma from "./prisma";

export const getSettings = (id: Streamer["id"]) =>
  prisma.account.findUnique({ where: { streamer: id } });

export const updateSettings = (id: Streamer["id"], account: Account) =>
  prisma.account.update({ where: { streamer: id }, data: account });

export const createSettings = (account: Account) =>
  prisma.account.create({ data: account });
