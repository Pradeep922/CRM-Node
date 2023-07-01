import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketRoutes from './routes/ticketRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use('/api/ticket', ticketRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is listening on ${PORT}`)); 