const expressAsyncHandler = require("express-async-handler");
const IncomeSchema= require("../models/income")

exports.addIncome = expressAsyncHandler(async (req, res) => {
    const {title, amount, category, description, date , userid}  = req.body;

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        const existingIncome = await IncomeSchema.findOne({
            title,
            amount,
            date,
            category,
            description,
            userid,
        });
        if(existingIncome){
        res.send("exist");
        }
        const newIncome = new IncomeSchema({
            title,
            amount: Number(amount), 
            category,
            description,
            date,
            userid,
          });
          await newIncome.save();
        return res.status(201).json({ message: "Income successfully added!" });
    } catch (error) {
        return res.status(500).json({message: error})
    }

});

exports.getIncomes = expressAsyncHandler(async (req, res) =>{
        try {
          const { startDate, endDate, userid } = req.query;
      
          if (!startDate || !endDate || !userid) {
            return res.status(400).json({ message: "Start date, end date, and userId are required" });
          }
          
          const incomes = await IncomeSchema.find({
            userid,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
          
          res.status(200).json(incomes);
        } catch (error) {
          console.error("Error fetching income:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
});

exports.getIncome = expressAsyncHandler(async (req, res) =>{
    const {id} = req?.params;
    try {
        const incomeRecords = await IncomeSchema.find({ userid: id });
        res.status(200).json(incomeRecords)
    } catch (error) {
        console.log(error);
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
    try{
    const {id} = req?.params;
    const deletedincome = await IncomeSchema.findByIdAndDelete(id);
    if(!deletedincome){
     return res.status(400).json({message: 'Income not found'});
    }
    return res.status(200).json({message: 'Income Deleted'});
    }
    catch(err){
    return res.status(500).json({message: err.message});
    }
});



