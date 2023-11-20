const mongoose = require('mongoose');


const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    paymentmethod:{
       type: String,
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"],
    }
}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema)