import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';
import storesRouter from "./routes/storesRouter.js";
import productsRouter from "./routes/productsRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/userRouter.js";

import './db.js';
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/stores', storesRouter);
app.use('/api/products', productsRouter);
app.use('/api/customer-reviews', reviewsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);

app.use('/favicon.ico', (req, res) => {
    res.sendStatus(204); 
});

app.get('/', (req, res) => {
    res.send("You are welcomed by the pharmaceutical company E-Pharmacy.");
});

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  
  app.use((err, req, res, next) => {
    const { status = 500, message = "Internal Server error" } = err;
    res.status(status).json({ message });
  });

app.listen(8080, () => {
    console.log("Server is running. Use our API on port: 8080")
});

export default app;