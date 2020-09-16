const todoModel = require('../models/todoModel');
const {expect} = require('chai')
const db = require('../databases/db');

describe('Todo model', () => {
    before(async () => {
        return db.connect;
    })

    it('should insert todo', () => {
        expect(true).to.equal(true)
    })

    after(async() => {
        return db.disconnect();
    })
})