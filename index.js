const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 5000;
app.use(express.json())
require('dotenv').config()

app.use("/api",require("./routes/userRoutes"))
app.use("/api",require("./routes/bookRoutes"))

app.listen(process.env.PORT||port, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connects")
    } catch (error) {
        console.log(error)
    }
})