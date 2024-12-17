// src/app.ts
import express from 'express';
import cors from 'cors';
import { salesRouter } from './routes/salesRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', salesRouter);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});