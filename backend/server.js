// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); // ensures DB and tables created
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.send('Task Manager API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
