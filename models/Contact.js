const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phones: {
        type: [String],
    },
    socialMedia: {
        platform: {
            type: String,
            enum: ["facebook", "linkedin"],
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        }
    }
}, { timestamps: true }); 

module.exports = mongoose.model("Contact", ContactSchema);
