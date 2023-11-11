const expressAsyncHandler = require("express-async-handler");
const IncomeSchema= require("../models/income")

exports.addIncome = expressAsyncHandler(async (req, res) => {
    const {title, amount,type, category, description, date , userid}  = req.body

    const income = IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    // console.log(income)
});

exports.getIncomes = expressAsyncHandler(async (req, res) =>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
});

exports.getIncome = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    try {
        const income = await IncomeSchema.findById(id);
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
});

exports.updateIncome = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    const {title , amount ,category, description , date , userid} = req.body;
    try {
        const income = await IncomeSchema.findByIdAndUpdate(id , {title , amount ,category, description , date , userid},
            {new: true} );
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
});

exports.deleteIncome =expressAsyncHandler( async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
});



