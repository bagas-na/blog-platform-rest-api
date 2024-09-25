import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db/table.ts",
  dialect: "sqlite",
  out: "./drizzle",
  dbCredentials: {
    url: "file:./data/posts.sqlite",
  },
});
