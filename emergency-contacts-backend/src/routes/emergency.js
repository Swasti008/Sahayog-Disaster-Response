import express from "express";
import { clientDb  } from "../config/db.js";
import { EmergencyContactSchema } from "../models/dataSchema.js";

const router = express.Router();

router.get("/getData", async (req, res) => {
  try {
    const db = clientDb.db("SIH");
    const collection = db.collection("StateWiseData");

    const stateWiseData = await collection.find().toArray();

    res.status(200).json(stateWiseData);
  } catch (error) {
    console.error("Error fetching state-wise data:", error);
    res.status(500).json({ error: "Failed to fetch state-wise data" });
  }
});

router.post("/postData", async (req, res) => {
  try {
    const db = clientDb.db("SIH");
    const collection = db.collection("StateWiseData");

    const validatedData = EmergencyContactSchema.parse(req.body);

    const result = await collection.insertOne(validatedData);

    res.status(201).json({ message: "State-wise data added successfully", id: result.insertedId });
  } catch (error) {
    if (error.name === "ZodError") {
      console.error("Validation error:", error.errors);
      res.status(400).json({ error: "Invalid data", details: error.errors });
    } else {
      console.error("Error adding state-wise data:", error);
      res.status(500).json({ error: "Failed to add state-wise data" });
    }
  }
});
router.get("/getDataByLocation", async (req, res) => {
  try {
    const { state, district } = req.query;

    if (!state || !district) {
      return res.status(400).json({ error: "State and district are required" });
    }

    const db = clientDb.db("SIH");
    const collection = db.collection("StateWiseData");

    const stateWiseData = await collection.find({
      state: state,
      "districts.name": district,
    }).toArray();

    if (stateWiseData.length === 0) {
      return res.status(404).json({ error: "No data found for the specified state and district" });
    }
    const districtData = stateWiseData[0].districts.find(d => d.name === district);

    if (!districtData) {
      return res.status(404).json({ error: "District data not found" });
    }
    res.status(200).json({ state: state, district: districtData });
  } catch (error) {
    console.error("Error fetching data by location:", error);
    res.status(500).json({ error: "Failed to fetch data by location" });
  }
});



export default router;
