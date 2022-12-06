import { PrismaClient } from "@prisma/client";

import { dummyDonations, testStreamers } from "../src/data/intialTables";

const prisma = new PrismaClient();

// Seeding functions
async function seedStreamers() {
  const promises = testStreamers.map((streamer) => {
    return prisma.streamer.upsert({
      where: { id: streamer.id },
      update: {},
      create: {
        id: streamer.id,
        name: streamer.name,
        alias: streamer.alias,
        socket: streamer.socket || null,
      },
    });
  });
  return Promise.all(promises);
}

async function seedDonations() {
  const streamers = await prisma.streamer.findMany({});
  for (const streamer of streamers) {
    const dummyData = dummyDonations.map((d) => ({
      ...d,
      streamer: streamer.id,
    }));
    await prisma.donation.createMany({
      data: dummyData,
      skipDuplicates: true,
    });
  }
  return;
}

async function seedDonationSettings() {
  const streamers = await prisma.streamer.findMany({});
  const donationSettingPromises = streamers.map((streamer) =>
    prisma.donationSetting.create({
      data: {
        streamer: streamer.id,
      },
    })
  );
  return Promise.all(donationSettingPromises);
}

async function seedWalletSettings() {
  const streamers = await prisma.streamer.findMany({});
  const donationSettingPromises = streamers.map((streamer) =>
    prisma.wallet.create({
      data: {
        streamer: streamer.id,
        restoreHeight: 0,
        lastSyncHeight: 0,
      },
    })
  );
  return Promise.all(donationSettingPromises);
}

const seed = async () => {
  await seedStreamers();
  console.log("seeded streamers 🎙️");
  await seedDonations();
  console.log("seeded donations 💸");
  await seedDonationSettings();
  console.log("seeded DonationSettings ⚙️");
  await seedWalletSettings();
  console.log("seeded WalletSettings 👛");
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
