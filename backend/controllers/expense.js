const ExpenseSchema = require('../models/expense');

exports.addExpense = async (req, res) => {
  const {typeOf, description, date, amount} = req.body;

  const expense = ExpenseSchema({
    typeOf,
    description,
    date,
    amount
  });

  try {
    // validations
    if(!typeOf || !description || !date) {
      return res.status(400).json({ message: 'All fields required'});
    }
    if(amount <= 0 || !amount === 'number ') {
      return res.status(400).json({ message: 'Amount must be higher than 0'});
    }
    await expense.save();
      res.setHeader('Content-Type', 'application/json'); // for json formatting
      res.status(200).json({ message: 'Expense Successfully Added' });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json'); // for json formatting
      res.status(500).json({ message: 'SERVER ERROR' });
    
  }
  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 }); // sorted by most recent
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json(expense);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });    
  }
};

exports.editExpense = async (req, res) => {
  const { _id } = req.params;
  const updateData = req.body;
 
  ExpenseSchema.findByIdAndUpdate(_id, updateData, { new: true }) // find and update ID with new data, and returns the update if true
   .then((expense) => {
     if (!expense) {
       return res.status(404).json({ message: 'Expense not found' });
     }
     res.setHeader('Content-Type', 'application/json'); // for json formatting
     res.status(200).json({ message: 'Expense Successfully Edited' });
   })
   .catch((err) => {
     res.setHeader('Content-Type', 'application/json'); // for json formatting
     res.status(500).json({ message: 'SERVER ERROR' });
   })
 };

exports.deleteExpense = async (req, res) => {
 const { _id } = req.params;
 ExpenseSchema.findByIdAndDelete(_id) // find and delete ID
  .then((expense) => {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json({ message: 'Expense Successfully Deleted' });
  })
  .catch((err) => {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });
  })
};