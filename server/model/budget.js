const mongoose = require('mongoose');


const budgetSchema = mongoose.Schema({
    id:{
        type: String,
        required : false,
        trim : true,        
    },
    title :{
        type: String,
        required : true,
        trim: true,
        unique: true
    },
    budget :{
        type : Number,
        required : true,        
    },
    color:{
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid Color']
    },
    maxbudget: {
        type : Number,
        required : true, 
    }
},{collection : 'budget'})

const budgetModel = mongoose.model('budget',budgetSchema);

module.exports = budgetModel;