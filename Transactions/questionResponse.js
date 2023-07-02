const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {
        Q1,
        Q2,
        Q3,
        Q4,
        Q5,
        Q6,
        Q7,
        Q8,
    } = req.query;

    // Define an array of questions and their corresponding responses
    const questions = [
        { question: Q1, response: 'You must wait for pass 48 hours after you taking  last course of antibiotics to be able to donate.' },
        { question: Q2, response: 'You had a fever a since a short time ago, you must wait until the end of 3 weeks to be able to donate.' },
        { question: Q3, response: 'You must. wait for pass 72 hours after taking the last dose of medication in order to be able to donate.' },
        { question: Q4, response: 'Patients who are on insulin or diabetes medications cannot donate blood.' },
        { question: Q5, response: 'Chronic disease patients cannot donate.' },
        { question: Q6, response: 'The last time you donated blood was a short while ago, after 3 months have passerd, you can donate.' },
        { question: Q7, response: 'Pregnant or breastfeeding women cannot donate.' },
        { question: Q8, response: 'You must be over 18 to be able to donate.' },
    ];

    // Find the first question with an answer of 'yes'
    const answeredQuestion = questions.find(q => q.question === 'yes');

    if (answeredQuestion) {
        res.status(200).json({ message: answeredQuestion.response });
    } else {
        res.status(200).json({ message: 'User is ready to donate.' });
    }
});

module.exports = router;
