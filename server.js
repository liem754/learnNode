import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/connectDB";
import initRouter from "./src/routes";
require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRouter(app);
connectDB();
const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is runing on the port ${listener.address().port}`);
});
