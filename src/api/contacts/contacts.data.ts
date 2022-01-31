//importing models
import ContactModel from "./contacts.model";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing interfaces
import { Model } from "mongoose";

export default class ContactsData {
  private _contactModel: Model<ContactModel>;

  constructor() {
    this._contactModel = new ContactModel().getModel();
  }

  async getContacts() {

  }

  async createContact(payload: CreateContactInterface) {
    try {
      let contact = await this._contactModel.insertMany(payload);
    
      if(!contact) {
        throw new Henry("001", "while creating users");
      }

      return contact;
    
    } catch (error) {
      throw error;
    }

  }
}

interface CreateContactInterface {
  name: string,
  surname: string,
  fullname: string,
  email: string,
  phoneNumber: string,
}