const mongoose=require("mongoose");

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connection Successful !!")
    } catch (error) {
        console.log("Database Connection Unsuccesful !!"+error)
    }
}

module.exports=connectToDB;