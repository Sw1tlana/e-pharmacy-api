import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.use((req, res, next) => {

})

app.get('/', (req, res) => {
    res.send("You are welcomed by the pharmaceutical company E-Pharmacy.");
})

app.listen(8080, () => {
    console.log("Server is running. Use our API on port: 8080")
})