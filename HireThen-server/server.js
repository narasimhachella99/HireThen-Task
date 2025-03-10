import express from 'express';  
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  
import authRouter from './routes/authRoutes.js';
import budgetRouter from './routes/budgetRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';


dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());



app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/budgets', budgetRouter); 

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
