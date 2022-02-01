//importing models
import DealModel from "./deals.model";

//importing loaders
import Henry from "../../../loaders/error.loader";

//importing utils
import querryAggregator from "../../../globals/querryAggregator.util";

//importing interface
import { Model } from "mongoose";
import { QuerryOptions } from "../../../globals/express";

export default class DealsData {
  private _dealModel: Model<DealModel>;

  constructor() {
    this._dealModel = new DealModel().getModel();
  }

  async getDeals(options: QuerryOptions) {
    //declaration spot
    let stages: any = querryAggregator(options);
    let deals = await this._dealModel?.aggregate(stages);
    let totalDeals = await this._dealModel?.countDocuments(options.filter);

    if (!deals) {
      throw new Henry("202", "Deals");
    }

    return {
      document: deals,
      totalDeals: totalDeals,
      currentCount: deals.length,
    };
  }

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
