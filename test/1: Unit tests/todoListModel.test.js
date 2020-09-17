const todoModel = require('../../models/todoModel');
const todoListModel = require('../../models/todoListModel');
const {expect} = require('chai')
const db = require('../../databases/db');

describe('Todo list model', () => {
    before(async () => {
        return db.connect();
    })

    beforeEach(async () => {
        return Promise.all[todoModel.deleteAll(), todoListModel.deleteAll()];
    })

    it('should create todo list', async () => {
        const todoList = {
            title: "My todo list",
            createdByID: "woawoh102347fhdfs48fds7"
        }

        const result = await todoListModel.create(todoList);
        expect(result.title).to.equal(todoList.title)
        expect(result.createdByID).to.equal(todoList.createdByID)
    })


    after(async() => {
        return db.disconnect();
    })
})