import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export default function status() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        data: {
          up: true,
          uptime: process.uptime(),
          version: process.env.npm_package_version,
          timestamp: new Date()
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
