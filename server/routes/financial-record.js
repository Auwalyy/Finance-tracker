import express from 'express';
import FinancialRecordModel from '../schema/financial-record.js'; // Ensure correct path and extension

const router = express.Router();

// GET: Retrieve all financial records for a user
router.get("/getAllByUserID/:userID", async (req, res) => {
  try {
    const userId = req.params.userID; // Match the parameter name
    const records = await FinancialRecordModel.find({ userId });

    if (records.length === 0) {
      return res.status(404).send("No records found for the user.");
    }

    res.status(200).send(records);
  } catch (err) {
    res.status(500).send("An error occurred while fetching records.");
  }
});

// POST: Create a new financial record
router.post("/", async (req, res) => {
  try {
    const newRecord = new FinancialRecordModel(req.body);
    const savedRecord = await newRecord.save();

    res.status(201).send(savedRecord);
  } catch (err) {
    res.status(500).send("An error occurred while saving the record.");
  }
});

// PUT: Update a financial record by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).send("No record found with the given ID.");
    }

    res.status(200).send(updatedRecord);
  } catch (err) {
    res.status(500).send("An error occurred while updating the record.");
  }
});

// DELETE: Remove a financial record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await FinancialRecordModel.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).send("No record found with the given ID.");
    }

    res.status(200).send(deletedRecord);
  } catch (err) {
    res.status(500).send("An error occurred while deleting the record.");
  }
});

export default router;
