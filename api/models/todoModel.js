const Datastore = require('nedb-promises');
const todoDatastore = Datastore.create(__dirname + '/../databases/todo.db');

const todoModel = {
    get: (_id) => {
        let queryobj = _id ? { _id } : {};
        return todoDatastore.find(queryobj);
    },

    post: (todo) => {
        //Create todo in DB and return promise
        return todoDatastore.insert(todo);
    },
    put: (_id, newTodo) => {
        return todoDatastore.update({ _id }, { $set: newTodo }, { returnUpdatedDocs: true });
    },
    delete: (_id) => {
        return todoDatastore.remove({ _id });
    }
}

module.exports = todoModel;
