require("dotenv").config();
const connectToDB = require("./config/database");


const PORT = process.env.PORT || 5000;




const app = require("./app");



const startServer = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is missing. Add it to your .env file.");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing. Add it to your .env file.");
        }

        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server connected successfully on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error.message || error);
        process.exit(1);
    }
};

startServer();