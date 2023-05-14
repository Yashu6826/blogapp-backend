require("dotenv").config();
const express = require('express');

const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const cors = require('cors');
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

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