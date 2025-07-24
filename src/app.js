
const express = require("express")
const cors = require("cors"); // ✅ CORS import
const { connectToDB } = require("./config/database")
const { appRouter } = require("./router/auth"); 
const { userRouter } = require("./router/user");
const cookieParser = require("cookie-parser");


const app = express()
app.use(express.json())
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173", // frontend port
  credentials: true // cookie bhejne dena
}));

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


