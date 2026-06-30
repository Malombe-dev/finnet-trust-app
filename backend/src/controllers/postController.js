import { validationResult } from "express-validator";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { memoryStore } from "../data/memoryStore.js";
import { usingMemoryStore } from "../config/db.js";

export async function getPostsByUser(req, res, next) {
  try {
    const { userId } = req.params;

    if (usingMemoryStore) {
      const userExists = memoryStore.users.some((u) => u._id === userId);
      if (!userExists) return res.status(404).json({ error: "User not found" });

      const userPosts = memoryStore.posts
        .filter((p) => p.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ data: userPosts });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: "Validation failed", details: errors.array() });
    }

    const { userId } = req.params;
    const { title, body, tag } = req.body;

    if (usingMemoryStore) {
      const userExists = memoryStore.users.some((u) => u._id === userId);
      if (!userExists) return res.status(404).json({ error: "User not found" });

      const newPost = {
        _id: memoryStore.makeId(),
        userId,
        title: title.trim(),
        body: body.trim(),
        tag: tag?.trim() || "General",
        createdAt: new Date(),
      };
      memoryStore.posts.unshift(newPost);
      return res.status(201).json({ data: newPost });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) return res.status(404).json({ error: "User not found" });

    const post = await Post.create({ userId, title, body, tag: tag || "General" });
    res.status(201).json({ data: post });
  } catch (err) {
    next(err);
  }
}
