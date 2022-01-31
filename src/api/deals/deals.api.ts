//importing dependences
import express from "express";

//importing interfaces
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import Henry from "../../../loaders/error.loader";

//importing middleware
import httpMethodNotSupported from "../../../middlewares/httpMethodNotSupported.middleware";

//importing data layers
import DealsData from "./deals.data";

//declaring costans
const DEALS_HTTP_METHOD = ["GET", "POST"];

//declaring router
let dealsRouter = express.Router();

dealsRouter
  .route("/")
  .all(httpMethodNotSupported(DEALS_HTTP_METHOD))
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({Risposta: "Ecco la trasmissione"})
    } catch (error) {
      next(error);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      //declaration spot
      let contact_deal = req.body.contact_deal;
      let object_deal = req.body.object_deal;
      let duration_deal = req.body.duration_deal;
      let payload;
      let dealsData = new DealsData();
      let data;

      if (!contact_deal) {
        throw new Henry("201", "contact");
      }
      if (!object_deal) {
        throw new Henry("201", "object");
      }
      if (!duration_deal) {
        throw new Henry("201", "duration");
      }

      //organized payload
      payload = {
        contact_deal: contact_deal,
        object_deal: object_deal,
        duration_deal: duration_deal,
      };

      data = dealsData.createDeal(payload);

      res.status(200).json({data: data});
    } catch (error) {
      next(error);
    }
  })

export default dealsRouter;