import { PrismaClient } from "../src/generated/prisma/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seeds the genres table from the data/genres.json file.
 * @returns {Promise<void>} Resolves when the seeding is done.
 */
async function main() {
  const filePath = path.join(__dirname, "../data/genres.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  for (const genreName of data.genres) {
    await prisma.genre.upsert({
      where: { name: genreName },
      update: {},
      create: { name: genreName },
    });
  }

  console.log("✅ Genres seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
