const app = require("./index"); // Adjust the path to point to index.js
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5454;

const startServer = async () => {
    try {
        await connectDb();
        console.log("Connected to the database successfully.");
        
        app.listen(PORT, () => {
            console.log(`Ecommerce API listening on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with failure
    }
};

startServer();
