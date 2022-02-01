//importing mongoose
import mongoose from "mongoose";

let ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  dataDiNascita: {
    type: Date,
  },
  luogoDiNascita: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  indirizzo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

export default ContactSchema;

export interface ContactInterface {
  name: string;
  surname: string;
  fullname: string;
  email: string;
  dataDiNascita: Date;
  luogoDiNascita: string;
  phoneNumber: string;
  indirizzo: string;
  createdAt: Date;
  isDisabled: boolean;
  _id: mongoose.Schema.Types.ObjectId;
}

let ContactTree = ContactSchema.obj;

ContactTree._id = {};

export { ContactTree };
