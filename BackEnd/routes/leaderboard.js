const express=require('express');
const authenticateMiddleware=require('../middlewares/auth');
const leaderboardController=require('../controllers/leaderboard');
const { application } = require('express');

const router=express.Router();
router.get('/getUsers',authenticateMiddleware.authenticate,leaderboardController.getUsers);
router.get('/getUserExpenses/:userId',authenticateMiddleware.authenticate,leaderboardController.getUserExpenses);

module.exports=router;