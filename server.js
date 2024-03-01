import app from "./app.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const DB_HOST =
  "mongodb+srv://tetiana:04OXGbHoyUjBLIpm@cluster0.6ew1jpa.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connect success");
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
