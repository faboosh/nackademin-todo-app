const mongoose = require('mongoose');
const baseMethods = require('./baseMethods');

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdByID: {
        type: String,
        required: true        
    },
    sharedWith: {
        type: Array,
        default: []
    }
},
    {
        timestamps: true
    }
)

todoListSchema.statics = {...baseMethods};

module.exports = mongoose.model('TodoList', todoListSchema);
