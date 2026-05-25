import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma 7 reads the datasource URL from config instead of schema.prisma.
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
