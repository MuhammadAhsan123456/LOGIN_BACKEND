const express = require("express")
const cors = require("cors");
const { connectToDB } = require("./config/database")
const { appRouter } = require("./router/auth"); 
const { userRouter } = require("./router/user");
const cookieParser = require("cookie-parser");
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://elegant-griffin-702b07.netlify.app",
  credentials: true
}));

// ✅ Add this route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

app.use(appRouter); 
app.use("/api", userRouter);

connectToDB().then(() => {
  console.log("Database is connected to MongoDB");
}).catch((err) => {
  console.log(err);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
