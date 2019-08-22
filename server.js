const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); //now can accept data from req.body

app.get('/', (req, res) => res.json({ msg: 'Welcome to Contact Keeper API!'}));

// Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000; //process.env.PORT is for production

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

