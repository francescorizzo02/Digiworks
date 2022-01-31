//importing loaders
import Henry from "../loaders/error.loader";

//importing interfaces
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export default function httpMethodNotSupported(httpMethods: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if(httpMethods.includes(req.method)) {
        return next();
      }
      next(new Henry("101")); 
    } catch (error) {
      next(error);
    }
  }
}