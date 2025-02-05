const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv"); 
const connectDb = require("./src/config/db"); 
const noteRoutes = require('./src/routes/notes.routes'); 


dotenv.config()
const app = express(); 
const port = process.env.PORT; 

app.use(express.json()); 
app.use(morgan('dev'));
app.use ('/api/v1/note', noteRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Notabene')
});

app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);
});