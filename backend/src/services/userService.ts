import { dbAll, dbGet, dbRun } from "../db/database";
import { signData } from "../utils/crypto";
import crypto from "crypto";

function generateId(): string {
  return crypto.randomBytes(16).toString("hex");
}

export async function createUser(
  email: string,
  role = "user",
  status = "active"
) {
  const existing = await dbGet("SELECT id FROM users WHERE email = ?", [email]);
  if (existing) throw new Error("Email already exists");

  const id = generateId();
  const { emailHash, signature } = signData(email);
  await dbRun(
    "INSERT INTO users (id, email, role, status, emailHash, signature) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, role, status, emailHash, signature]
  );
  return dbGet("SELECT * FROM users WHERE id = ?", [id]);
}

export async function updateUser(id: string, data: any) {
  const existing = await dbGet("SELECT * FROM users WHERE id = ?", [id]);
  if (!existing) throw new Error("User not found");

  const { email, role, status } = data;

  if (email && email !== existing.email) {
    const duplicate = await dbGet("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (duplicate) throw new Error("Email already exists");

    const { emailHash, signature } = signData(email);
    await dbRun(
      "UPDATE users SET email = ?, role = ?, status = ?, emailHash = ?, signature = ? WHERE id = ?",
      [email, role, status, emailHash, signature, id]
    );
  } else {
    await dbRun("UPDATE users SET role = ?, status = ? WHERE id = ?", [
      role,
      status,
      id,
    ]);
  }

  return dbGet("SELECT * FROM users WHERE id = ?", [id]);
}

export async function deleteUser(id: string) {
  const existing = await dbGet("SELECT id FROM users WHERE id = ?", [id]);
  if (!existing) throw new Error("User not found");
  await dbRun("DELETE FROM users WHERE id = ?", [id]);
}

export async function getUserStats() {
  return dbAll(
    `SELECT DATE(createdAt) as date, COUNT(*) as count
     FROM users WHERE createdAt >= date('now', '-7 days')
     GROUP BY DATE(createdAt) ORDER BY date`
  );
}

export async function exportUsers() {
  return dbAll("SELECT * FROM users ORDER BY createdAt DESC");
}
