import { defineConfig } from "prisma/config";

import "dotenv/config";

export default defineConfig({
	schema: "./prisma",
	migrations: {
		path: "./db/migrations",
	},
});
