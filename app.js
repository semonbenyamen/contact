//first step
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const Contact = require("./models/Contact");

async function dbconnection() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/firstApp");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
dbconnection();

const Contact = require("./models/Contact");


//post contact
app.post('/api/contact', async (req , res) => {
    try {
        const Contact = await Contact.create (req.body);
        res.json ({
            success: true,
            msg:"created contact successfully",
            data: Contact,
        });
    } catch (error) {
        res.json ({success: false, error: error.message});
    }
});
app.get('/api/contact', async (req, res) => {
    try {
        const allContacts = await Contact.find();
        res.json({
            success: true,
            count: allContacts.length,
            msg: "Contact retrieved successfully",
            data: allContacts
        });
    } catch (error) {
        res.json({success: false, error: error.message});
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running");
});