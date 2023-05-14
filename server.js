require("dotenv").config();
const express = require('express');

const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const app = express();
app.use(express.json());


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