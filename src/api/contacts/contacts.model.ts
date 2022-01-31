//import dependences
import mongoose from "mongoose";

//import loaders
import { connect } from "../../../loaders/database.loaders";

//import schemas
import ContactSchema from "./contacts.schema";

class ContactModel {
  private _contactModel: mongoose.Model<ContactModel, {}, {}, {} | undefined>;

  constructor() {
    this._setModel();
    this._contactModel = this.getModel();
  }

  public getModel(): mongoose.Model<ContactModel, {}, {}, {} | undefined> {
    return this._contactModel;
  }

  private _setModel() {
    this._contactModel = connect().model("Contact", ContactSchema);
  }
}
