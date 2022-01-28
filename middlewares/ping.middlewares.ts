import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export default function ping() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send("Pong");
    } catch (error) {
      next(error);
    }
  }
}