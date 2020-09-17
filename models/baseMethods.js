module.exports = {
    getByID: function(_id) {
        return this.findById(_id)
    },
    
    getAll: function() {
        return this.find({})
    },

    get: function(filter = {}) {
        return this.find(filter)
    },
    
    create: function(obj) {
        return new this(obj).save();
    },

    update: function(_id, todoList) {
        return this.findOneAndUpdate({ _id }, todoList, { new: true });
    },
    
    deleteAll: function(filter = {}) {
        return this.deleteMany(filter);
    },
    
    delete: function(_id) {
        return this.findByIdAndDelete({_id});
    },

    count: async function(filter = {}) {
        const count = await this.find(filter);
        return count.length;
    },
}