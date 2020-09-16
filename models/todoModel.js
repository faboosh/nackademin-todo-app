const mongoose = require('mongoose');
const baseMethods = require('./baseMethods');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    listID: {
        type: String,
        required: true
    },
    createdByID: {
        type: String,
        required: true        
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    dueDate: {
        type: Date
    },
},
    {
        timestamps: true
    }
)
todoSchema.statics = {...baseMethods};

todoSchema.statics.deleteAllInList = function(listID) {
    return this.deleteMany({listID});
}

module.exports = mongoose.model('Todo', todoSchema);
