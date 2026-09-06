require("dotenv").config();
const connectToDB = require("./config/database");


const PORT = process.env.PORT;




const app = require("./app");



const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server connected successfully on PORT ${PORT}`);
        });
    } catch (error) {
        console.log("Database connection failed:", error);
    }
};

startServer();