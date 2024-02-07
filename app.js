const express = require('express');
const app = express();
const port = 5000;
const bodyParser =require("body-parser")
require('dotenv').config()
const mongoose =require("./Confiq/confiq")
const cors =require("cors")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

const CommonRouter = require("./Router/CommonRouter")
const AdminRouter =require("./Router/AdminRouter")
const userRouter =require("./Router/UserRouter")

app.use("/",CommonRouter)
// app.use("/admin",AdminRouter)
// app.use("/user",userRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
