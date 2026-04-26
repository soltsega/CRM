require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
	res.send('Mini CRM backend is running');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
