const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const database = require('./config/database')
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

database.connect()
app.use(express.json());

// Database Connection
//connect to the database
const dbConnect = require('./config/database');


// Routes
const projectRoutes = require('./routers/projectRoutes');
app.use('/api/projects', projectRoutes);

const progressRoutes = require('./routers/progressRoutes');
app.use('/api/progress', progressRoutes)

const candidateRoutes = require('./routers/candidateRoutes');
app.use('/api/candidates', candidateRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
