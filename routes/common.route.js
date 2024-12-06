const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');
const subCategory = require('../controllers/subcategory.controller');
const payment = require('../controllers/paymnet.controller');
const expenditures = require('../controllers/expenditures.controller');
const expenses = require('../controllers/expenses.controller');
const auth = require('../middlewere/auth.middleware');
// category Routes
// router.post('/addCategory',function(req,res){
//     res.send("welcome");
// });
router.post('/addCategory',category.addCategory);
router.get('/getAllCategory',category.getAllCategory);
router.put('/updateCategory',category.updateCategory);
router.delete('/deleteCategory/:categoryId',category.deleteCategory);

// SubCategoey Routes
router.post('/addSubCategory',subCategory.addSubCategory);
router.get('/getAllSubCategory',subCategory.getAllSubCategory);
router.put('/updateSubCategory',subCategory.updateSubCategory);
router.delete('/deleteSubCategory/:subCategoryId',subCategory.deleteSubCategory);

// Payment Routes
router.post('/addPayment',payment.addPayment);
router.get('/getAllPayment',payment.getAllPayment);
router.put('/updatePayment',payment.updatePayment);
router.delete('/deletePayment/:paymentId',payment.deletePayment);

// Expenditures Routes
router.post('/addExpenditures',expenditures.addExpenditures);
router.get('/getAllExpenditures',expenditures.getAllExpenditures);
router.put('/updateExpenditures',expenditures.updateExpenditures);
router.delete('/deleteExpenditures/:expendituresId',expenditures.deleteExpenditures);

// Expenses Routes
router.post('/addExpenses',expenses.addExpenses);
router.get('/getAllExpenses',expenses.getAllExpenses);
router.put('/updateExpenses',expenses.updateExpenses);
router.delete('/deleteExpenses/:expensesId',expenses.deleteExpenses);


// Spectial Routes
router.get('/getcategoryBasedSubCategory',subCategory.getcategoryBasedSubCategory);

module.exports = router;