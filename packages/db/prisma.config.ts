// prisma.config.ts
import "dotenv/config"; // Make sure to install dotenv if needed: npm install dotenv --save-dev
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL") // This line is crucial
  }
});
