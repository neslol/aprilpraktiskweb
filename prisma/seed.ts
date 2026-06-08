import { prisma } from "../lib/prisme";
import { auth } from "../lib/auth";

async function main() {
  const adminEmail = "admin@example.com";
  const adminPassword = "password123";
  
  console.log("Seeding admin user...");

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    return;
  }

  // Create admin user using better-auth API to handle password hashing and account creation
  const user = await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
      name: "Admin User",
    },
  });

  if (!user) {
    throw new Error("Failed to create admin user");
  }

  // Set admin role manually since signUpEmail doesn't set it by default
  await prisma.user.update({
    where: { email: adminEmail },
    data: {
      role: "admin",
      emailVerified: true,
    },
  });

  console.log(`Admin user created with email: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // We don't have a $disconnect in the custom prisma client provided in prisme.ts
  });
