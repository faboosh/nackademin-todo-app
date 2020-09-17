const userModel = require('../../models/userModel');
const {expect} = require('chai')
const db = require('../../databases/db');

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

        users = users.map(user => userModel.register(user));

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

    it('should return token when user logs in', async () => {
        const user = {
            username: "Fabian",
            password: "Fabian",
        }

        await userModel.register(user);

        const { token } = await userModel.login(user);

        expect(token).to.be.a('string');
    })

    it('should reject when user logs in with incorrect credentials', async () => {
        const user = {
            username: "Fabian",
            password: "Fabian",
        }

        await userModel.register(user);

        userModel.login(user)
            .then(res => {
                expect(false).to.equal(true);
            })
            .catch(err => {
                expect(true).to.equal(true);
            })
    })

    after(async () => {
        return db.disconnect();
    })
})