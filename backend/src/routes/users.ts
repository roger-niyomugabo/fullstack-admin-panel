import express from "express";
import protobuf from "protobufjs";
import path from "path";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
  exportUsers,
} from "../services/userService";

const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  try {
    const user = await createUser(
      req.body.email,
      req.body.role,
      req.body.status
    );
    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Update User
router.put("/:id", async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

// Export as Protobuf
router.get("/export", async (req, res) => {
  try {
    const users = await exportUsers();
    const root = await protobuf.load(
      path.join(process.cwd(), "src/user.proto")
    );
    const UserList = root.lookupType("UserList");
    const buffer = UserList.encode(UserList.create({ users })).finish();

    res.setHeader("Content-Type", "application/x-protobuf");
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: "Failed to export users" });
  }
});

// Stats
router.get("/stats", async (req, res) => {
  try {
    const stats = await getUserStats();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
