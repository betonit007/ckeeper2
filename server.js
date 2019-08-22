const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to Contact Keeper API!'}));

// Define Routes

app.use('/api/user', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000; //process.env.PORT is for production

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

