import { MongoClient } from "mongodb";
import "dotenv/config";

const clientDb = new MongoClient(process.env.MONGODB_ATLAS_URI);

export async function connectDB() {
  try {
    await clientDb.connect();
    console.log("Successfully connected to DMS_db!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export { clientDb };
