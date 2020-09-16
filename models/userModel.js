const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const baseMethods = require('./baseMethods');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true        
    },
    role: {
        type: String,
        required: true 
    }
},
    {
        timestamps: true
    }
)

const methods = {
    login: async function ({username, password}) {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await this.findOne({username});
                if(!user) resolve(false);

                const valid = bcrypt.compareSync(password, user.passwordHash);
                if(!valid) resolve(false);

                const token = generateUserToken(user);
                resolve(token);

            } catch(err) {  
                reject(false);
            }
        })
    },

    register: async function ({username, password}) {
        return new Promise(async function (resolve, reject) {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);

            const newUser = {
                passwordHash,
                username,
                role: 'user'
            }

            try {
                if(!await this.get({username})) {
                    const user = await this.insert(newUser);
                    const token = this.generateUserToken(user);
                    resolve(token);
                } else {
                    reject(false);
                }

            } catch (err) {
                reject(err);
            }
        })
    },

    generateUserToken: function ({username, role, _id}) {
        const token = jwt.sign({username, role, _id}, process.env.SECRET);
        return {token};
    }
}

userSchema.statics = {
    ...baseMethods,
    login: async function ({username, password}) {
        return new Promise(async function (resolve, reject) {
            try {
                const user = await this.findOne({username});
                if(!user) resolve(false);

                const valid = bcrypt.compareSync(password, user.passwordHash);
                if(!valid) resolve(false);

                const token = this.generateUserToken(user);
                resolve(token);

            } catch(err) {  
                reject(false);
            }
        })
    },

    register: async function ({username, password}) {
        const self = this;
        return new Promise(async function (resolve, reject) {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);

            const newUser = {
                passwordHash,
                username,
                role: 'user'
            }

            try {
                if(!await self.findOne({username})) {
                    const user = await self.create(newUser);
                    resolve(user);
                } else {
                    reject(false);
                }

            } catch (err) {
                reject(err);
            }
        })
    },

    generateUserToken: function ({username, role, _id}) {
        const token = jwt.sign({username, role, _id}, process.env.SECRET);
        return {token};
    }
}

function generateUserToken({username, groups, _id}) {
    const token = jwt.sign({username, groups, _id}, process.env.SECRET);
    return {token};
}

module.exports = mongoose.model('User', userSchema);