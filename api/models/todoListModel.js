const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    title: {
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
    }
},
    {
        timestamps: true
    }
)

todoListSchema.statics.getByID = function(_id) {
    return this.findById(_id)
}

todoListSchema.statics.getAll = function() {
    return this.find({})
}

todoListSchema.statics.create = function(todoList) {
    return new this(todoList).save();
}

todoListSchema.statics.update = function(_id, todoList) {
    return this.updateOne({_id}, todoList);
}

todoListSchema.statics.delete = function(_id) {
    return this.findByIdAndDelete({_id});
}

todoListSchema.statics.deleteAll = function(_id) {
    return this.deleteAll();
}

module.exports = mongoose.model('TodoList', todoListSchema);
