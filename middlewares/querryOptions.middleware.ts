//importing dependences
import querrie from "querrie";

//importing scripts
import isObjectEmpty from "../globals/isObjectEmpty.script";

//importing interfaces
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export default function querryOptions(Tree: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //declaration spot
      let options;
      let page = "1";
      let tree = Tree;
      let limit = "10";
      let filter = querrie.sieve(req.query, Object.keys(tree));
      let select = querrie.grabber(req.query, Object.keys(tree));
      let sort = querrie.organizer(req.query, { aggregationFormat: true });

      if (req.query.limit) {
        limit = req.query.limit.toString();
      }
      if (req.query.page) {
        page = req.query.page.toString();
      }

      //organaizing options
      options = {
        filter: filter,
        limit: parseInt(limit),
        currentPage: parseInt(page),
        sort: isObjectEmpty(sort) ? { _id: -1 } : sort,
        select: isObjectEmpty(select) ? undefined : select,
      };

      req.options = options;

      next();
    } catch (error) {
      next(error);
    }
  };
}
