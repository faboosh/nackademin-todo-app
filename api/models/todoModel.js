const mongoose = require('mongoose');

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

todoSchema.statics.getByID = function(_id) {
    return this.findById(_id)
}

todoSchema.statics.getAll = function() {
    return this.find({})
}
/**
 * 
 * @param {mongoDB filter} filter 
 */
todoSchema.statics.get = function(filter) {
    return this.find(filter)
}

todoSchema.statics.create = function(todo) {
    return new this(todo).save();
}

todoSchema.statics.update = function(_id, todo) {
    return this.updateOne({_id}, todo);
}

todoSchema.statics.delete = function(_id) {
    return this.findByIdAndDelete({_id});
}

todoSchema.statics.deleteAllInList = function(listID) {
    return this.deleteMany({listID});
}

todoSchema.statics.deleteAll = function(_id) {
    return this.deleteAll();
}

module.exports = mongoose.model('Todo', todoSchema);
