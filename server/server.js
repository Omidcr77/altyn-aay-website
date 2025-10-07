// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leadRoutes = require('./routes/leads.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes
app.get('/api', (req, res) => res.send('Altyn Aay API Running'));
app.use('/api/leads', leadRoutes);

// DB Connection
if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI environment variable. Set it in your .env file.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((err) => {
    console.error('Failed to connect to MongoDB. Error:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });