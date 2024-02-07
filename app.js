const express = require('express');
const app = express();
const port = 5000;
const bodyParser =require("body-parser")
const  mongoose = require ('./Confiq/confiq')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())


app.post('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
