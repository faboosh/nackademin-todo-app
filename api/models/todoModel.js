const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
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

todoSchema.statics.getByID = function(_id) {
    return this.findById(_id)
}

todoSchema.statics.getAll = function() {
    return this.find({})
}

todoSchema.statics.create = function(todo) {
    return new this(todo).save();
}

todoSchema.statics.update = function(_id, todo) {
    return this.updateOne({_id}, todo);
}

module.exports = mongoose.model('Todo', todoSchema);
