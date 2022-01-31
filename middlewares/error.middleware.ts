// import loaders
import Henry from "../loaders/error.loader";

//importing interfaces
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export default function error() {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    try {
      if (err instanceof Henry) {
        return res.status(err.status).json({
          error: err,
        });
      }
      if (err instanceof Error) {
        //declaration spot
        let error = new Henry("000", "istance of error", false);
        //error description
        error.description = err.message;
        return res.status(error.status).json({
          error: error,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
