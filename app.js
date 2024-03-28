const express = require('express');
const app = express();
const port = 5001;
const bodyParser =require('body-parser');
require('dotenv').config();
require('./Confiq/confiq');
const cors =require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


const CommonRouter = require('./Router/CommonRouter');
const AdminRouter =require('./Router/AdminRouter');
const userRouter =require('./Router/UserRouter');

app.use('/api/admin', AdminRouter);
app.use('/api/', CommonRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

