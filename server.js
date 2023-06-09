require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const app = express();
app.use(express.json());
// const corsOptions ={
//   origin:process.env.CORS_POLICY, 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

const dbUrl =
  process.env.MONGO_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
}).then(console.log("connected"))
.catch((error) =>(console.log(error)));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});