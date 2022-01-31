//importing dependences
import express from "express";

//importing interface
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import Henry from "../../../loaders/error.loader";

//importing middleware
import httpMethodNotSupported from "../../../middlewares/httpMethodNotSupported.middleware";

//importing data layers
import ContactsData from "./contacts.data";

//declaring constans
const CONTACTS_HTTP_METHODS = ["GET", "POST"];

//declaring router
let contactsRouter = express.Router();

contactsRouter
  .route("/")
  .all(httpMethodNotSupported(CONTACTS_HTTP_METHODS))
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({Risposta: "Tieni i contatti!!"});
    } catch (error) {
      next(error);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      //declaration spot
      let name = req.body.name;
      let surname = req.body.surname;
      let email = req.body.email;
      let phoneNumber = req.body.phoneNumber;
      let payload;
      let contactsData = new ContactsData();
      let data;

      if(!name) {
        throw new Henry("201", "name");
      }
      if(!surname) {
        throw new Henry("201", "surname");
      }
      if(!email) {
        throw new Henry("201", "email");
      }
      if(!phoneNumber) {
        throw new Henry("201", "phoneNumber");
      }

      //organized payload
      payload = {
        name: name,
        surname: surname,
        fullname: `${name} ${surname}`,
        email: email,
        phoneNumber: phoneNumber,
      }

      data = contactsData.createContact(payload);
      
      res.status(200).json({data: data});
    } catch (error) {
      next(error);
    }
  })

export default contactsRouter;
