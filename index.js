const express = require("express");
const { Router } = require("./routes/route");
const app = express();
var cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());


app.use("/check", Router )

app.listen(PORT, '0.0.0.0' , () => {
    console.log(`Server is available in ${PORT} port`)
})
