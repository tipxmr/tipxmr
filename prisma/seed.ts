import { PrismaClient } from "@prisma/client";
import { testStreamers } from "../src/data/intialTables";

const prisma = new PrismaClient();

// Helper functions
const truncateHashedSeed = (hashedSeed: string) => hashedSeed.slice(0, 11);

// Seeding functions
async function seedStreamers() {
  const promises = testStreamers.map(async (streamer) => {
    return prisma.streamer.upsert({
      where: { id: truncateHashedSeed(streamer.id) },
      update: {},
      create: {
        id: truncateHashedSeed(streamer.id),
        name: streamer.name,
        alias: streamer.alias,
        socket: streamer.socket || null,
      },
    });
  });
  return Promise.all(promises);
}

const seed = async () => {
  await seedStreamers();
  // await seedAccounts();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
