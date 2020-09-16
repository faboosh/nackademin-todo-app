const userModel = require('../models/userModel');
const {expect} = require('chai')
const db = require('../databases/db');

describe('User model', () => {
    before(async () => {
        return db.connect();
    })

    beforeEach(async () => {
        return userModel.deleteAll();
    })

    it('should create users', () => {

        let users = [
            {
                username: "Fabian",
                password: "Fabian",
            },
            {
                username: "Jonas",
                password: "Jonas",
            },
            {
                username: "Rickard",
                password: "Rickard",
            },
        ];

        users = users.map(user => {
            return userModel.register(user);
        })

        Promise.all(users)
            .then(users => {
                expect(users.length).to.equal(3);
            })
    })

    it('should delete created users', async () => {

        let users = [
            {
                username: "Fabian",
                password: "Fabian",
            },
            {
                username: "Jonas",
                password: "Jonas",
            },
            {
                username: "Rickard",
                password: "Rickard",
            },
        ];

        users = users.map(user => userModel.register(user));

        Promise.all(users)
            .then(users => {
                users = users.map(user => userModel.delete(user._id));

                Promise.all(users)
                    .then(async () => {
                        const count = await userModel.count();
                        expect(count).to.equal(0);
                    })
            })
    })

    after(async () => {
        return db.disconnect();
    })
})