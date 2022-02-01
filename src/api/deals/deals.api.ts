//importing dependences
import express from "express";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing interfaces
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { QuerryOptions } from "../../../globals/express";

//importing middleware
import httpMethodNotSupported from "../../../middlewares/httpMethodNotSupported.middleware";
import querryOptions from "../../../middlewares/querryOptions.middleware";

//importing data layers
import DealsData from "./deals.data";

//importing trees
import { DealTree } from "./deals.schema";

//declaring costans
const DEALS_HTTP_METHOD = ["GET", "POST"];

//declaring router
let dealsRouter = express.Router();

dealsRouter
  .route("/")
  .all(httpMethodNotSupported(DEALS_HTTP_METHOD))
  .get(
    querryOptions(DealTree),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //declaration spot
        let options: QuerryOptions = req.options!;
        let dealsData = new DealsData();

        let data = await dealsData.getDeals(options);

        res.status(200).json({
          data: {
            document: data.document,
            totalCount: data.totalDeals,
            currentCount: data.currentCount,
            currentPage: options.currentPage,
            totalPage: Math.ceil(data.totalDeals / options.limit) || 0,
          },
        });
      } catch (error) {
        next(error);
      }
    }
  )
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      //declaration spot
      let contact = req.body.contact;
      let object = req.body.object;
      let duration = req.body.duration;
      let payload;
      let dealsData = new DealsData();
      let data;

      if (!contact) {
        throw new Henry("201", "contact");
      }
      if (!object) {
        throw new Henry("201", "object");
      }
      if (!duration) {
        throw new Henry("201", "duration");
      }

      //organized payload
      payload = {
        contact: contact,
        object: object,
        duration: duration,
      };

      data = dealsData.createDeal(payload);

      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  });

export default dealsRouter;
