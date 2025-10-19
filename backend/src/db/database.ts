import sqlite3 from "sqlite3";

const isTestEnv = process.env.NODE_ENV === "test";

const dbFile = isTestEnv ? "./testDatabase.sqlite" : "./database.sqlite";

export const db = new sqlite3.Database(dbFile, (err) => {
  if (err) console.error("Error opening database:", err);
  else
    console.log(`Connected to SQLite ${isTestEnv ? "test" : "main"} database`);
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      status TEXT NOT NULL DEFAULT 'active',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      emailHash TEXT,
      signature TEXT
    )`
  );
});

export const dbAll = (sql: string, params: any[] = []): Promise<any[]> =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

export const dbGet = (sql: string, params: any[] = []): Promise<any> =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });

export const dbRun = (sql: string, params: any[] = []): Promise<void> =>
  new Promise((resolve, reject) => {
    db.run(sql, params, (err) => (err ? reject(err) : resolve()));
  });
