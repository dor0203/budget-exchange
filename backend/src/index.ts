import express from "express";
import { Client } from 'pg';
import { Database } from "./database";
import dataframe from "../../dataframe.json";

const master: Client = new Client();
const database: Database = new Database(dataframe, master);

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from backend!");
});

app.listen(PORT, () => {
    console.log(`Backend listening at http://localhost:${PORT}`);
});
