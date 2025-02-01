import mongoose from 'mongoose';

const financialRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },  // Corrected spelling of category
  paymentMethod: { type: String, required: true }
});

const FinancialRecordModel = mongoose.model('FinancialRecord', financialRecordSchema);

// Use export default for ES module syntax
export default FinancialRecordModel;
