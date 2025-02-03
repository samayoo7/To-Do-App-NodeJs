const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;

const taskRoutes = require('./src/routes/taskRoutes');

//declare app
const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

// Start the server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});