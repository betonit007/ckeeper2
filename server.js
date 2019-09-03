const express = require('express');
const connectDB = require('./config/db');
const path = require('path') //deals with file paths

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); //now can accept data from req.body

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve react in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000; //process.env.PORT is for production

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

