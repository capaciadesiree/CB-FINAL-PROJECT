const router = require('express').Router();
const { addExpense, getExpense, editExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, editIncome, deleteIncome } = require('../controllers/income')

router.post('/add-income', addIncome)
    .get('/get-income', getIncome)
    .put('/edit-income/:id', editIncome)
    .delete('/delete-income/:id', deleteIncome)
    
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .put('/edit-expense/:id', editExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;