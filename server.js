const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlPool = require('./config/db');

// Configure dotenv
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/v1/student', require("./routes/userRoutes"));

// Test route
app.get('/test', (req, res) => {
    res.status(200).send('<h1>Welcome</h1>');
});

// Port configuration
const PORT = process.env.PORT || 9999;

// Function to start server after successful database connection
function startServer() {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`.bgBlue.green);
    });
}

// Function to connect to MySQL and start server
async function connectToMySQLAndStartServer() {
    try {
        await mysqlPool.query("SELECT 1");
        console.log("MySQL DB Connected".bgGreen.white);
        startServer();
    } catch (error) {
        console.error("Error connecting to MySQL:", error);
        process.exit(1); // Exit the process with error status
    }
}

// Connect to MySQL and start server
connectToMySQLAndStartServer();
