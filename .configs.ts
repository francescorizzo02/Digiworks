import dotenv from "dotenv";

dotenv.config();

let configs = {
  port: process.env.SERVER_PORT || 80,
  databaseUrl: "mongodb://localhost:27017",
  databaseName: "Digiworks",
};

export default configs;
