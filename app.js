//first step
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoDB')
.then(() => console.log("connected to mongoDB"))
.catch(err => console.error("could not connect", err));


const Contact = require("./models/Contact");




//post contact
app.post('/api/contact', async (req , res) => {
    try {
        const {fullName, phones=[], socialMedia={}} = req.body;
        const contact = await Contact.create ({fullName, phones, socialMedia})
        res.json ({
            success: true,
            msg:"created contact successfully",
            data: contact,
        });
    } catch (error) {
        res.json ({ error: error.message});
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