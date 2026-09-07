const mongoose = require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connection Successful !!");
    } catch (error) {
        console.error("Database Connection Unsuccessful !!", error.message);
        throw error;
    }
}

module.exports=connectToDB;