const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/user");
const Transaction = require("./models/transaction");

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());


const connection_url = process.env.MONGODB_URI || "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.PASSWORDMONGO + "@cluster0.xynqggk.mongodb.net/postmandb?retryWrites=true&w=majority";

mongoose.connect(connection_url, () => {
    console.log("connected to db")
});

//customer signup
app.post("/customer/signup", async(req, res) => {
    try {
        const {name,contact, password} = req.body;
        const user = await User.findOne({contact});
        if(user) throw new Error("user already exists");
        else {
            const result = await User.create({name,contact,password});
            res.status(201).json(result);
        }        
    } catch (e){
        let msg;
        if(e.code == 11000){
            msg = "User alrady exists";
        } else {
            msg = e.message;
        }
        console.log(e);
        res.status(400).json(msg);
    }
});

//customer login
app.post("/customer/login", async(req, res) => {
    try {
        const {contact, password} = req.body;
        const user = await User.findOne({contact});
        if(!user) throw new Error('invalid name or password')
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('invalid name or password')
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//adding transaction
app.post("/addTransaction", async(req, res) => {
    try {
        if(!req.body.name){
            res.status(400).json("name is required");
        }

        const user = await User.findOne({_id: req.body.name});
        if(!user) throw new Error("user not found");

        const {type, amount, name, category} = req.body;
        const result = await Transaction.create({type, amount, name, category});
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json(e.message);
    }   
});

//getting all transactions for a particular user
app.post("/getTransactions", async(req, res) => {
    try {
        if(!req.body.id){
            res.status(400).json("id is required");
        }
        
        const name = req.body.id;
        const user = await User.find({_id: name});
        if(!user) throw new Error("user not found");

        const transactions =  await Transaction.find({name : name});
        res.status(200).json(transactions);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//delete transaction for a particular user
app.delete("/deleteTransaction", async(req, res) => {
    try {
        const id = req.body.id;
        const success = await Transaction.deleteOne({_id: id});
        res.status(200).json(success);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//getting all transactions of type income for a particular user
app.post("/getIncomeTransactions", async(req, res) => {
    try {
        if(!req.body.id){
            res.status(400).json("id is required");
        }

        const name = req.body.id;
        const user = await User.find({_id: name});
        if(!user) throw new Error("user not found");

        const transactions =  await Transaction.find({name : name, type: "income"});
        res.status(200).json(transactions);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//get all transactions of type expense for a particular user
app.post("/getExpenseTransactions", async(req, res) => {
    try {
        if(!req.body.id){
            res.status(400).json("id is required");
        }

        const name = req.body.id;
        const user = await User.find({_id: name});
        if(!user) throw new Error("user not found");

        const transactions =  await Transaction.find({name : name, type: "expense"});
        res.status(200).json(transactions);
    } catch (e) {
        res.status(400).json(e.message);
    }
});


//edit transaction of type income for a particular user
app.put("/editIncomeTransaction", async(req, res) => {
    try {
        if(!req.body.id){
            res.status(400).json("id is required");
        }

        const id = req.body.id;
        const amount = req.body.amount;
        const category = req.body.category;
        const date = req.body.date;

        const transaction = Transaction.findOne({_id: id});
        if(!transaction) throw new Error("transaction not found");

        const success = await Transaction.updateOne({_id: id}, {amount: amount, category: category, date: date});
        res.status(200).json(success);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//edit transaction of type expense for a particular user
app.put("/editExpenseTransaction", async(req, res) => {
    try {
        const id = req.body.id;
        const amount = req.body.amount;
        const category = req.body.category;
        const date = req.body.date;

        const transaction = Transaction.findOne({_id: id});
        if(!transaction) throw new Error("transaction not found");
        const success = await Transaction.updateOne({_id: id}, {amount: amount, category: category, date: date});
        res.status(200).json(success);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//saving firebase user in mongodb
app.post("/saveUser", async(req, res) => {
    try {
        const {name, email,contact} = req.body;
        // const user = await Customer.create({name, email,contact});
        const user = await User.findOne({contact});
        if(user) throw new Error("user already exists");
        else {
            const result = await User.create({name,email,contact});
            res.status(201).json(result);
        }
        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

     

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});