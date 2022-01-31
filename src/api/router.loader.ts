//importing dependences
import express from "express";

//importing routers
import contactsRouter from "./contacts/contacts.api";
import dealsRouter from "./deals/deals.api";

//declaring router
const rootRouter = express.Router();

//declaring routes
rootRouter.use("/contacts", contactsRouter);
rootRouter.use("/deals", dealsRouter);

//exporting router
export default rootRouter;