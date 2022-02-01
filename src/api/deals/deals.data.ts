//importing models
import DealModel from "./deals.model";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing interface
import { Model } from "mongoose";

export default class DealsData {
  private _dealModel: Model<DealModel>;

  constructor() {
    this._dealModel = new DealModel().getModel();
  }

  async getDeals() {}

  async createDeal(payload: CreateDealInterface) {
    try {
      let deal = await this._dealModel.insertMany(payload);

      if (!deal) {
        throw new Henry("001", "while create deals");
      }

      return deal;

    } catch (error) {
      throw error;
    }
  }
}

interface CreateDealInterface {
  contact: string;
  object: string;
  duration: string;
}
