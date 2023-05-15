const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const userRouter = require( "./routes/User.js");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//App routes
app.use( "/auth", userRouter);

//database connection
const connectDB = require( "./config/database.js");
connectDB();

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));




