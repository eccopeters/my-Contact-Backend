import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/connect.js";
import errorHandler from "./middleware/errorHandler.js";
import user from "./routes/user.js";
import contact from "./routes/contact.js";

configDotenv();
const app = express();

app.use(express.json());
app.use(errorHandler);

const port = process.env.PORT;

connectDB(process.env.MONGODB_KEY);


app.use("/api/contacts", contact);
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Listening on port: ${port}...`);
});
