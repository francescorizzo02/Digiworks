import dotenv from "dotenv";

dotenv.config();

let configs = {
  port: process.env.SERVER_PORT || 80,
};

export default configs;
