import { db } from "~/server/db";

await db.invoice.deleteMany({});
await db.donation.deleteMany({});
await db.donationSetting.deleteMany({});
await db.stream.deleteMany({});
await db.streamer.deleteMany({});
