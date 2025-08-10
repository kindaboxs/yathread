import { type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { bearer, openAPI, username } from "better-auth/plugins";

import { db } from "@/db";
import { env } from "@/env";

export const authConfig = {
	baseURL: env.NEXT_PUBLIC_APP_URL,
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
	},
	logger: {
		level: env.NODE_ENV === "development" ? "debug" : "error",
	},
	plugins: [bearer(), openAPI(), nextCookies(), username()],
	trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
	secret: env.BETTER_AUTH_SECRET,
} satisfies BetterAuthOptions;
