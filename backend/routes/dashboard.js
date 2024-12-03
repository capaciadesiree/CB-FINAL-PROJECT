const router = require('express').Router();
const { getExpense} = require('../controllers/expense');
const { getIncome } = require('../controllers/income')

router.get('/get-income', getIncome)
    // .post('/add-income', addIncome)
    // .delete('/delete-income/:id', deleteIncome)
    
    .get('/get-expense', getExpense)
    // .post('/add-expense', addExpense)
    // .delete('/delete-expense/:id', deleteExpense)

module.exports = router;