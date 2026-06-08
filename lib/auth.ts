import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { prisma } from "./prisme";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql", // Prisma schema uses mysql
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        admin()
    ]
});
