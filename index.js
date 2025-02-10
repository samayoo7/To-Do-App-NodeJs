const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');

//declare app
const app = express();
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});