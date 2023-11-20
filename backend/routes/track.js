const { addExpense, getExpense, deleteExpense } = require('../controller/expense');
const { addIncome, getIncomes, deleteIncome, getIncome, updateIncome } = require('../controller/income');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-income/:id' , getIncome)
    .put('/update-income' , updateIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;