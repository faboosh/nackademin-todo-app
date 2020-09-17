const app = require('../../app');
const db = require('../../databases/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect, request } = chai;


describe('Auth and user routes', () => {
    before(async function() {
        await db.connect();

        const user = {
            username: "Fabian",
            password: "Fabian"
        }

        

        this.currentTest.user = await request(app)
                                            .post('/api/users/register')
                                            .send(user)
                                            .then(res => res.body)

        this.currentTest.token = await request(app)                                    
                                            .post('/auth')
                                            .send(user)
                                            .then(res => res.body.token)
    })

    // beforeEach(async () => {
    //     return Promise.all[todoModel.deleteAll(), todoListModel.deleteAll()];
    // })

    it('should return valid user after registration', async function() {
        const newUser = {
            username: "Fabian2",
            password: "Fabian2"
        }

        request(app)                                    
                .post('/api/users/register')
                .send(newUser)
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.own.property('role');
                    expect(res.body).to.have.own.property('username');
                    expect(res.body).to.have.own.property('_id');
                })
    })

    it('should give user token on valid login', async function() {
        request(app)                                    
                .post('/auth')
                .send(
                    {
                        username: "Fabian",
                        password: "Fabian"
                    }
                )
                .then(res => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.own.property('token');
                })
    })

    it('should return 401 on incorrect login', async function() {
        request(app)                                    
                .post('/auth')
                .send(
                    {
                        username: "Fabian",
                        password: "Fabidan"
                    }
                )
                .then(res => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.own.property('message');
                })
    })

    after(async () => {
        return db.disconnect();
    })
})