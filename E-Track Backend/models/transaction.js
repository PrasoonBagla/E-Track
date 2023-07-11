const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Can't be blank"]
    },
    amount: {
        type: Number,
        required: [true, "Can't be blank"]
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Can't be blank"]
    },
    category: {
        type: String,
        required: [true, "Can't be blank"]
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    {timestamps: true});


const Transaction = new mongoose.model("Transaction", transactionSchema);
module.exports = Transaction