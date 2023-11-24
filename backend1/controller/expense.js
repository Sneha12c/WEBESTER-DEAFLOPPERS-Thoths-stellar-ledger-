const expressAsyncHandler = require("express-async-handler");
const ExpenseSchema = require("../models/expense")

exports.addExpense = expressAsyncHandler(async (req, res) => {
    const {title, amount, category, description, date , userid}  = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userid
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        const existingexpense = await ExpenseSchema.findOne({
            title,
            amount,
            date,
            category,
            description,
            userid,
        });
        if(existingexpense){
        res.send("exist");
        }
        await expense.save()
        res.send("notexist");
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

});

exports.getExpenses = expressAsyncHandler(async (req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
});

exports.getExpense = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    try {
        const expenseRecords = await ExpenseSchema.find({ userid: id });
        res.status(200).json(expenseRecords)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
});

exports.updateExpense = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    const {title , amount ,category, description , date , userid} = req.body;
    try {
        const expense = await ExpenseSchema.findByIdAndUpdate(id , {title , amount ,category, description , date , userid},
            {new: true} );
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
});

exports.deleteExpense = expressAsyncHandler( async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
});