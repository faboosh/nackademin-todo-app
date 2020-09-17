const todoModel = require('../../models/todoModel');
const todoListModel = require('../../models/todoListModel');
const {expect} = require('chai')
const db = require('../../databases/db');

const listID = "fhhdflasf";
const createdByID = "djsjswgs1231gaffd"; 

describe('Todo model', () => {
    before(async () => {
        return db.connect();
    })

    beforeEach(async () => {
        return todoModel.deleteAll();
    })

    it('should insert todos into list', () => {

        let todos = [
            {
                listID,
                createdByID,
                title: "todo 1",
                done: false
            },
            {
                listID,
                createdByID,
                title: "todo 2",
                done: false
            },
            {
                listID,
                createdByID,
                title: "todo 3",
                done: false
            },
        ];

        todos = todos.map(todo => {
            return todoModel.create(todo);
        })

        Promise.all(todos)
            .then(todos => {
                expect(todos.length).to.equal(3);
            })
    })

    it('should update todo', async () => {
        let todo = {
            listID,
            createdByID,
            title: "todo 1",
            done: false
        }

        const { _id } = await todoModel.create(todo);

        let update = {
            title: "updated title",
            done: true
        }

        await todoModel.update(_id, update);

        const updatedTodo = await todoModel.getByID(_id);

        expect(updatedTodo.title).to.equal(update.title)
        expect(updatedTodo.done).to.equal(update.done)
    })

    it('should delete todo', async () => {
        let todo = {
            listID,
            createdByID,
            title: "todo 1",
            done: false
        }

        const { _id } = await todoModel.create(todo);

        await todoModel.delete(_id);

        const count = await todoModel.count();

        expect(count).to.equal(0)
    })


    after(async() => {
        return db.disconnect();
    })
})