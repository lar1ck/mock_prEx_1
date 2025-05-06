require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));
app.use('/api/trainees', require('./routes/traineeRoutes'));
app.use('/api/modules', require('./routes/moduleRoutes'));
app.use('/api/marks', require('./routes/markRoutes'));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Running on port: http://localhost:${process.env.PORT}`)
})