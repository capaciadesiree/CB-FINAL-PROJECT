const router = require('express').Router();
const { addExpense, getExpense, editExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncome, editIncome, deleteIncome } = require('../controllers/income');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/add-income', isAuthenticated, addIncome)
    .get('/get-income', getIncome)
    .put('/edit-income/:_id', editIncome)
    .delete('/delete-income/:_id', deleteIncome)
    
    .post('/add-expense', isAuthenticated, addExpense)
    .get('/get-expense', getExpense)
    .put('/edit-expense/:_id', isAuthenticated, editExpense)
    .delete('/delete-expense/:_id', isAuthenticated, deleteExpense)

module.exports = router;