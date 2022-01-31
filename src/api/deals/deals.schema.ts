//importing mongoose
import mongoose from "mongoose";

let DealSchema = new mongoose.Schema({
  contact_deal: {
    type: String,
    trim: true,
    required: true,
  },
  object_deal: {
    type: String,
    trim: true,
    required: true,
  },
  description_deal: {
    type: String,
    trim: true,
  },
  duration_deal: {
    type: String,
    trim: true,
    required: true,
  },
  created_deal: {
    type: String,
    default: new Date(),
  },
});

export default DealSchema;

export interface DealInterface {
  contact_deal: string;
  object_deal: string;
  description_deal: string;
  duration_deal: string;
  created_deal: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

let DealTree = DealSchema.obj;

DealTree._id = {};

export { DealTree };
