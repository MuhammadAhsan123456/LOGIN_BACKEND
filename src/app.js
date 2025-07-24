
const express = require("express")
const cors = require("cors"); // ✅ CORS import
const { connectToDB } = require("./config/database")
const { appRouter } = require("./router/auth"); 
const { userRouter } = require("./router/user");
const cookieParser = require("cookie-parser");


const app = express()
app.use(express.json())
app.use(cookieParser());


// server.js or app.js — jahan tumne express & cors use kiya hai

app.use(
  cors({
    origin: "https://jocular-parfait-39ce10.netlify.app", // ✅ Netlify URL
    credentials: true, // 🔐 allow cookies/auth headers
  })
);


app.use(appRouter); 
app.use("/api", userRouter);

connectToDB().then(() => {
    console.log("Database is connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})


