 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import financialRecordRouter from './routes/financial-record.js'; // Corrected path

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const mongoURL = process.env.mongoURL;

mongoose
  .connect(mongoURL)
  .then(() => console.log('✅ CONNECTED TO DATABASE'))
  .catch((err) => console.error('❌ ERROR CONNECTING TO DATABASE:', err.message));

app.use('/financial-record', financialRecordRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
