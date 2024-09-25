import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const path = "./data/posts.sqlite"

const sqlite = new Database(path);

const db = drizzle(sqlite);
export default db;
