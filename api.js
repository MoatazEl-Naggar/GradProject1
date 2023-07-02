const express = require('express');
const app = express();
app.use(express.json());

const loginRouter = require('./auth/login');
const registerRouter = require('./auth/register');
const forgotPasswordRouter = require('./auth/forgot-password');
const resetPasswordRouter = require('./auth/reset-password');

const profileRouter = require('./profile/profile');

const transactionsRouter = require('./Transactions/transactions');
const getTransactionsRouter = require('./Transactions/getTransaction');
const questionResponseRouter = require('./Transactions/questionResponse');

const getBranchesRouter = require('./branches/getBranches')

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/reset-password', resetPasswordRouter);

app.use('/profile', profileRouter);

app.use('/transactions', transactionsRouter);
app.use('/getTransactions', getTransactionsRouter);
app.use('/questionResponse', questionResponseRouter);

app.use('/getBranches', getBranchesRouter);

app.listen(3003, () => {
  console.log('Server listening on port 3003');
});
