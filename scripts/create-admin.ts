import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.admin.create({
    data: {
      name: "Super Admin",
      email: "admin@homeluxe.com",
      password: hashedPassword,
    },
  });

  console.log(admin);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });