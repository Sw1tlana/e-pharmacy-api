import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/favicon.ico', (req, res) => {
    res.sendStatus(204); 
});

app.get('/', (req, res) => {
    res.send("You are welcomed by the pharmaceutical company E-Pharmacy.");
});

app.use((_, res) => {
    res.status(400).json({ message: "Bad request" });
});

app.use((error, req, res, next) => {
    const {status = 500,  message = 'Internal Server Error'} = err;
    res.status(status), json({message});
})

app.listen(8080, () => {
    console.log("Server is running. Use our API on port: 8080")
});

export default app;