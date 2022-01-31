//importing dependences
import express from "express";

//importing routers
import contactsRouter from "./contacts/contacts.api";

//declaring router
const rootRouter = express.Router();

//declaring routes
rootRouter.use("/contacts", contactsRouter);

//exporting router
export default rootRouter;