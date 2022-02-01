//importing dependences
import express from "express";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing interface
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { QuerryOptions } from "../../../globals/express";

//importing middleware
import httpMethodNotSupported from "../../../middlewares/httpMethodNotSupported.middleware";
import querryOptions from "../../../middlewares/querryOptions.middleware";

//importing data layers
import ContactsData from "./contacts.data";

//importing trees
import { ContactTree } from "./contacts.schema";

//declaring constans
const CONTACTS_HTTP_METHODS = ["GET", "POST"];

//declaring router
let contactsRouter = express.Router();

contactsRouter
  .route("/")
  .all(httpMethodNotSupported(CONTACTS_HTTP_METHODS))
  .get(
    querryOptions(ContactTree),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //declaration spot
        let options: QuerryOptions = req.options!;
        let contactsData = new ContactsData();

        let data = await contactsData.getContacts(options);

        res.status(200).json({ data: {
          documents: data.documents,
          totalCount: data.totalCount,
          currentCount: data.currentCount,
          currentPage: options.currentPage,
          totalPages: Math.ceil(data.totalCount / options.limit) || 0
        } });
      } catch (error) {
        next(error);
      }
    }
  )
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

      if (!name) {
        throw new Henry("201", "name");
      }
      if (!surname) {
        throw new Henry("201", "surname");
      }
      if (!email) {
        throw new Henry("201", "email");
      }
      if (!phoneNumber) {
        throw new Henry("201", "phoneNumber");
      }

      //organized payload
      payload = {
        name: name,
        surname: surname,
        fullname: `${name} ${surname}`,
        email: email,
        phoneNumber: phoneNumber,
      };

      data = contactsData.createContact(payload);

      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  });

export default contactsRouter;
