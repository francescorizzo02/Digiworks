//importing dependences
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
//importing configs
import configs from "../.configs";

//mongoose setting
//serve ad es. per tornare il documento modificato aziche info inutili
mongoose.set("returnOriginal", false);

export default class Database {
  private _lane: mongoose.Connection;
  private _adminLane: any;

  constructor() {
    this._lane = this._setLane();
    this._adminLane = this._setAdminLane();
  }

  private _setLane(): mongoose.Connection {
    return mongoose.createConnection(configs.databaseUrl, {
      maxPoolSize: 250,
    });
  }

  private _setAdminLane() {
    return MongoClient.connect(configs.databaseUrl, {
      maxPoolSize: 25,
    });
  }

  public getLane() {
    return this._lane;
  }

  public getAdminLane() {
    return this._adminLane;
  }
}

export const database = new Database();

export function connect():mongoose.Connection {
  return database.getLane().useDb(configs.databaseName, {
    useCache: true,
    noListener: true,
  })
}
