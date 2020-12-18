const mongoose  = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const budgetModel = require('../model/budget');
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret : secretKey,
    algorithms: ['HS256']
})

router.get('/', (req,res)=>{  
        
    budgetModel.find({})
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(500).send();
    })    
})

router.post('/',jwtMW, async (req,res)=>{
    let record = await budgetModel.findOne({ title: req.body.title });
    if(record) {
        return res.status(400).send('That expense already exists!');
    } else {
    budgetinfo = new budgetModel({
        title: req.body.title,
        budget: req.body.budget,
        maxbudget: req.body.maxbudget,
        color: req.body.color        
    });
    
    await budgetinfo.save();
    res.send(budgetinfo);
}
});

module.exports = router;