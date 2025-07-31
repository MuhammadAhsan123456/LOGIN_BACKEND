
// const express = require("express")
// const cors = require("cors"); // ✅ CORS import
// const { connectToDB } = require("./config/database")
// const { appRouter } = require("./router/auth"); 
// const { userRouter } = require("./router/user");
// const cookieParser = require("cookie-parser");


// const app = express()
// app.use(express.json())
// app.use(cookieParser());


// // server.js or app.js — jahan tumne express & cors use kiya hai

// app.use(cors({
//   origin: "http://localhost:5173", // ✅ only one https://
//   credentials: true
// }));



// app.use(appRouter); 
// app.use("/api", userRouter);

// connectToDB().then(() => {
//     console.log("Database is connected to MongoDB")
// }).catch((err) => {
//     console.log(err)
// })

// app.listen(5000, () => {
//     console.log("Server is running on port 5000")
// })

const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./config/database");
const { appRouter } = require("./router/auth");
const { userRouter } = require("./router/user");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://iridescent-peony-bd857f.netlify.app",
  credentials: true
}));

app.use(appRouter);
app.use("/api", userRouter);

// ✅ Add this route at the end
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

connectToDB()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

module.exports = app; // ✅ sirf export, no app.listen()



