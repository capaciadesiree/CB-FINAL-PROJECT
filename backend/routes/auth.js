const router = require('express').Router();
const { check, body } = require('express-validator');
const authController = require('../controllers/authController')

router.get('/signup', authController.getSignup)
    .post('/signup', [
      check('first_name')
        .notEmpty()
        .withMessage('First name is required'),
      check('last_name')
        .notEmpty()
        .withMessage('Last name is required'),
      check('email')
        .isEmail()
        .withMessage('Email is invalid'),
      check('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        // restricting the allowed special characters
        .matches(/^[A-Za-z0-9!@#$%&*_+]*$/)
        .withMessage('Password contains invalid special characters. Only !@#$%&*_+ are allowed')
        .not()
        .matches(/\s/)
        .withMessage('Password cannot contain spaces'),
      body('confirmPassword')
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords do not match');
          }
          return true;
        })
    ], authController.postSignup)
    
    .get('/login', authController.getLogin)
    .post('/login', authController.postLogin)

    .get('/logout', authController.logout)

    .get('/user', authController.getUser) //added user route for fetching, authentications and other actions

module.exports = router;