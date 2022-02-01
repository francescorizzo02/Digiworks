//importing dependences
import mongoose from "mongoose";

//importing loaders
import { connect } from "../../../loaders/database.loaders";

//importing schemas
import DealSchema from "./deals.schema";

export default class DealModel {
  private _dealModel: mongoose.Model<DealModel>;

  constructor() {
    this._setModel();
    this._dealModel = this.getModel();
  }

  public getModel(): mongoose.Model<DealModel> {
    return this._dealModel;
  }
  
  private _setModel() {
    this._dealModel = connect().model("Deal", DealSchema);
  }
}
