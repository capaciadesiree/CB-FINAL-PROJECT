const IncomeSchema = require('../models/income');

exports.addIncome = async (req, res) => {
  const {typeOf, description, date, amount} = req.body;

  const income = IncomeSchema({
    typeOf,
    description,
    date,
    amount,
    userId: req.user._id
  });

  try {
    // validations
    if(!typeOf || !description || !date) {
      return res.status(400).json({ message: 'All fields required'});
    }
    if(amount <= 0 || !amount === 'number') {
      return res.status(400).json({ message: 'Amount must be higher than 0'});
    }
    await income.save();
      res.setHeader('Content-Type', 'application/json'); // for json formatting
      res.status(200).json({ message: 'Income Successfully Added' });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json'); // for json formatting
      res.status(500).json({ message: 'SERVER ERROR' });
    
  }
};

exports.getIncome = async (req, res) => {
  try {
    const income = await IncomeSchema.find({ userId: req.user._id }).sort({ createdAt: -1 }); // find user by userId & sorted by most recent
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json(income);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });    
  }
};

exports.editIncome = async (req, res) => {
 const { _id } = req.params;
 const updateData = req.body;

IncomeSchema.findOneAndUpdate({ _id, userId: req.user._id }, updateData, { new: true })
  .then((income) => {
    if (!income) {
      return res.status(404).json({ message: 'Income not found or unauthorized' });
    }
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json({ message: 'Income Successfully Edited', data: income });
  })
  .catch((err) => {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });
  })
};

exports.deleteIncome = async (req, res) => {
 const { _id } = req.params;
 IncomeSchema.findOneAndDelete({ _id, userId: req.user._id })
  .then((income) => {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(200).json({ message: 'Income Successfully Deleted' });
  })
  .catch((err) => {
    res.setHeader('Content-Type', 'application/json'); // for json formatting
    res.status(500).json({ message: 'SERVER ERROR' });
  })
};