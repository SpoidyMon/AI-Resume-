const mongoose = require("mongoose")

const blackListedTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    }
}, {
    timestamps: true
})

const blackListedModel=mongoose.model("blacklistedToken",blackListedTokenSchema);

module.exports=blackListedModel;
