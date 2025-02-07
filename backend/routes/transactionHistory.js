const router = require('express').Router();
const { getExpense} = require('../controllers/expense');
const { getIncome } = require('../controllers/income')

router.get('/get-income', getIncome)
    
    .get('/get-expense', getExpense)

module.exports = router;