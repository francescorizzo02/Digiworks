//importing models
import ContactModel from "./contacts.model";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing utils
import querryAggregator from "../../../globals/querryAggregator.util";

//importing interfaces
import { Model } from "mongoose";
import { QuerryOptions } from "../../../globals/express";

export default class ContactsData {
  private _contactModel: Model<ContactModel>;

  constructor() {
    this._contactModel = new ContactModel().getModel();
  }

  async getContacts(options: QuerryOptions) {
    //declaration spot
    let stages: any = querryAggregator(options);
    let contacts = await this._contactModel?.aggregate(stages);
    let totalCount = await this._contactModel?.countDocuments(options.filter);

    if(!contacts) {
      throw new Henry("202", "contacts");
    }

    return {
      documents: contacts,
      totalCount: totalCount,
      currentCount: contacts.length,
    };
  }

  async createContact(payload: CreateContactInterface) {
    try {
      let contact = await this._contactModel.insertMany(payload);

      if (!contact) {
        throw new Henry("001", "while creating users");
      }

      return contact;
    } catch (error) {
      throw error;
    }
  }
}

interface CreateContactInterface {
  name: string;
  surname: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}
