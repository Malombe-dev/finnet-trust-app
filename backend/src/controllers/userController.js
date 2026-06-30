import User from "../models/User.js";
import { memoryStore } from "../data/memoryStore.js";
import { usingMemoryStore } from "../config/db.js";

export async function getUsers(req, res, next) {
  try {
    if (usingMemoryStore) {
      return res.status(200).json({ data: memoryStore.users });
    }
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;

    if (usingMemoryStore) {
      const user = memoryStore.users.find((u) => u._id === userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json({ data: user });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
}
