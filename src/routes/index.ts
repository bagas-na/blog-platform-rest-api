import { NextFunction, Request, Response, Router } from "express";

const router = Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send({
    error: "Not Found",
    message: "The requested resource does not exist.",
  });
});

export default router;
