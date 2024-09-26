import { eq } from "drizzle-orm";
import { NextFunction, Request, Response, Router } from "express";
import db from "../db/db";
import { postsTable as posts } from "../db/table";

interface NewPost {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

interface Post extends NewPost {
  id: number;
  createdAt: string;
  updatedAt: string;
}

const router = Router();

/*
 * CREATE BLOG POST
 * Create a new blog post using the POST method.
 * each post request must contain json encoded [interface NewPost] object.
 * The endpoint should validate the request body and return one of the
 * following:
 * - a `201 Created` status code with the newly created [interface Post]
 *   object, or
 * - a `400 Bad Request` status code with error messages in case of
 *   validation errors.
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const post: NewPost = req.body;
  const { title, content, category, tags } = post;

  // Add post data validation here...
  // Example: const isValid = validatePostData(post);
  // if (!isValid) {
  //   return res.status(400).send({ error: "Validation errors" });
  // }

  try {
    const returnRow = await db
      .insert(posts)
      .values({ title: title, content: content, category: category, tags: tags })
      .returning();

    res.status(201).send(returnRow);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal server error. Your post request has failed.",
    });
    if (typeof err === "string") {
      throw new Error(err);
    }
  }
});

/*
 * UPDATE BLOG POST
 * Update an existing blog post using the PUT method.
 * The endpoint should validate the request body and return one of the
 * following:
 * - a `200 OK` status code with the updated [interface Post] object,
 * - a `400 Bad Request` status code with error messages in case of
 *   validation errors, or
 * - a `404 Not Found` status code if the blog post was not found.
 */
router.put("/:postId", async (req: Request, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.postId || "");
  const post: NewPost = req.body;
  const { title, content, category, tags } = post;

  // Add post data validation here...

  try {
    if (Number.isNaN(postId)) {
      throw new Error("Post id is not type number");
    }

    const returnRow = await db
      .update(posts)
      .set({ title: title, content: content, category: category, tags: tags })
      .where(eq(posts.id, postId))
      .returning();

    if (returnRow.length > 0) {
      res.status(200).send(returnRow);
    } else {
      res
        .status(404)
        .send({ error: `Error. Post id '${postId}' does not exist. No post has been updated.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal server error. Your update request has failed.",
    });
    if (typeof err === "string") {
      throw new Error(err);
    }
  }
});

/*
 * DELETE BLOG POST
 * Delete an existing blog post using the DELETE method.
 * The endpoint should return one of the following:
 *  - a `204 No Content ` status code if the blog post was successfully
 *    deleted, or
 *  - a `404 Not Found` status code if the blog post was not found.
 */
router.delete("/:postId", async (req: Request, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.postId || "");

  try {
    if (Number.isNaN(postId)) {
      throw new Error("Post id is not type number");
    }

    const returnRow = await db.delete(posts).where(eq(posts.id, postId)).returning();

    if (returnRow.length > 0) {
      res.status(204).end();
    } else {
      res
        .status(404)
        .send({ error: `Error. Post id '${postId}' does not exist. No posts has been deleted.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal server error. Your delete request has failed.",
    });
    if (typeof err === "string") {
      throw new Error(err);
    }
  }
});

/*
 * GET A BLOG POST
 * Get a single blog post using the GET method.
 * The endpoint should return one of the following:
 *  - a `200 OK` status code with the blog post [interface Post] object.
 *  - a `404 Not Found` status code if the blog post was not found.
 */
router.get("/:postId", async (req: Request, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.postId || "");

  try {
    if (Number.isNaN(postId)) {
      throw new Error("Post id is not type number");
    }

    const returnRow = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))

    if (returnRow.length > 0) {
      res.status(200).send(returnRow);
    } else {
      res
        .status(404)
        .send({ error: `Error. Post id '${postId}' does not exist.` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Internal server error. Your update request has failed.",
    });
    if (typeof err === "string") {
      throw new Error(err);
    }
  }
})

/*
 * GET ALL BLOG POSTS
 * Get all blog posts using the GET method.
 * The endpoint should return one of the following:
 * - a `200 OK` status code with an array of blog post [interface Post] objects
 * - a `400 Not Found` status code if there is no blog post.
 *
 * Optionally, the search can be filtered by a search term, using the ?term=
 * search parameter.
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    error: "Not Found",
    message: "The requested resource does not exist.",
  });
});

export default router;
