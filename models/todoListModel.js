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

todoListSchema.statics = {
    ...baseMethods,
    isAccessibleByUser: async function({ userID, listID }) {
        const result = await this.find({ $or: [ { _id: listID, createdByID: userID }, { _id: listID, sharedWith: { $in: [ userID ] }}]})
        return result.length > 0;
    },

    wasCreatedByUser: async function({ userID, listID }) {
        const result = await this.find({ _id: listID, createdByID: userID })
        return result.length > 0;
    },

    getAllAccessibleTodoLists: function(userID) {
        return this.find({ $or: [ { createdByID: userID }, { sharedWith: { $in: [ userID ] }}]})
    },
};

module.exports = mongoose.model('TodoList', todoListSchema);
