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
router.post('/addCategory',auth,category.addCategory);
router.get('/getAllCategory',auth,category.getAllCategory);
router.put('/updateCategory',auth,category.updateCategory);
router.delete('/deleteCategory/:categoryId',auth,category.deleteCategory);

// SubCategoey Routes
router.post('/addSubCategory',auth,subCategory.addSubCategory);
router.get('/getAllSubCategory',auth,subCategory.getAllSubCategory);
router.put('/updateSubCategory',auth,subCategory.updateSubCategory);
router.delete('/deleteSubCategory/:subCategoryId',auth,subCategory.deleteSubCategory);

// Payment Routes
router.post('/addPayment',auth,payment.addPayment);
router.get('/getAllPayment',auth,payment.getAllPayment);
router.put('/updatePayment',auth,payment.updatePayment);
router.delete('/deletePayment/:paymentId',auth,payment.deletePayment);

// Expenditures Routes
router.post('/addExpenditures',auth,expenditures.addExpenditures);
router.get('/getAllExpenditures',auth,expenditures.getAllExpenditures);
router.put('/updateExpenditures',auth,expenditures.updateExpenditures);
router.delete('/deleteExpenditures/:expendituresId',expenditures.deleteExpenditures);

// Expenses Routes
router.post('/addExpenses',auth,expenses.addExpenses);
router.get('/getAllExpenses',auth,expenses.getAllExpenses);
router.put('/updateExpenses',auth,expenses.updateExpenses);
router.delete('/deleteExpenses/:expensesId',auth,expenses.deleteExpenses);


// Spectial Routes
router.get('/getcategoryBasedSubCategory',auth,subCategory.getcategoryBasedSubCategory);

module.exports = router;