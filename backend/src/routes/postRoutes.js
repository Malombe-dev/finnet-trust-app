import { Router } from "express";
import { body } from "express-validator";
import { getPostsByUser, createPost } from "../controllers/postController.js";

const router = Router({ mergeParams: true });

const postValidationRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 140 })
    .withMessage("Title must be 140 characters or fewer"),
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Post content is required")
    .isLength({ max: 2000 })
    .withMessage("Post content must be 2000 characters or fewer"),
  body("tag").optional().trim().isLength({ max: 30 }).withMessage("Tag must be 30 characters or fewer"),
];

router.get("/", getPostsByUser);
router.post("/", postValidationRules, createPost);

export default router;
