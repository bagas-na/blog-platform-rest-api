import { NextFunction, Request, Response, Router } from "express";

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
router.post("/posts", (req: Request, res: Response, next: NextFunction) => {});

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
router.put("/posts/:postId", (req: Request, res: Response, next: NextFunction) => {});

/*
 * DELETE BLOG POST
 * Delete an existing blog post using the DELETE method.
 * The endpoint should return one of the following:
 *  - a `204 No Content ` status code if the blog post was successfully 
 *    deleted, or
 *  - a `404 Not Found` status code if the blog post was not found.
 */ 
router.delete("/posts/:postId", (req: Request, res: Response, next: NextFunction) => {});

/*
 * GET A BLOG POST
 * Get a single blog post using the GET method.
 * The endpoint should return one of the following:
 *  - a `200 OK` status code with the blog post [interface Post] object.
 *  - a `404 Not Found` status code if the blog post was not found.
*/ 
router.get("/posts/:postId", (req: Request, res: Response, next: NextFunction) => {
});

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
router.get("/posts", (req: Request, res: Response, next: NextFunction) => {
});


export default router;
