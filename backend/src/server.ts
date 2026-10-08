// backend/src/server.ts

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth';
import pingRouter from './routes/ping';
import logoutRouter from './routes/logout';
import sessionRouter from './routes/session';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware.
app.use(cors());
app.use(express.json());

// Routes.
app.use('/api/auth', authRouter);
app.use('/api/ping', pingRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/session', sessionRouter);

// Server starten.
app.listen(PORT, () => {
  console.log(`Backend actief op http://localhost:${PORT}`);
});