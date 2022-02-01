//importing mongoose
import mongoose from "mongoose";

let DealSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  object: {
    type: String,
    trim: true, //spazi prima e dopo il testo
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: String,
    default: new Date(),
  },
});

export default DealSchema;

export interface DealInterface {
  contact: string;
  object: string;
  description: string;
  duration: string;
  created: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

let DealTree = DealSchema.obj;

DealTree._id = {};

export { DealTree };
