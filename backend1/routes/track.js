const express = require("express");
const { addExpense,getExpenses, getExpense, deleteExpense, updateExpense } = require('../controller/expense');
const { addIncome, getIncomes, deleteIncome, getIncome, updateIncome } = require('../controller/income');

const trackrouter = express.Router();


trackrouter.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-income/:id' , getIncome)
    .put('/update-income/:id' , updateIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .get('/get-expense/:id' , getExpense)
    .post('/update-expense/:id' , updateExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = trackrouter;