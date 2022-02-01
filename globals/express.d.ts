import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

declare module "express" {
  interface Request {
    options?: QuerryOptions,
  }
}

export interface QuerryOptions {
  sort: object,
  limit: number,
  currentPage: number,
  filter: object,
  select?: object,
}