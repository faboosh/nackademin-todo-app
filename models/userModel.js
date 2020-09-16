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
        default: 'user' 
    }
},
    {
        timestamps: true
    }
)

userSchema.statics = {
    ...baseMethods,
    login: async function ({username, password}) {
        const self = this;
        return new Promise(async function (resolve, reject) {
            try {
                const user = await self.findOne({username});
                if(!user) resolve(false);

                const valid = bcrypt.compareSync(password, user.passwordHash);
                if(!valid) resolve(false);

                const token = self.generateUserToken(user);
                resolve(token);

            } catch(err) {  
                reject(new Error('Login failed'));
            }
        })
    },

    register: async function ({username, password}) {
        const self = this;
        return new Promise(async function (resolve, reject) {
            try {
                if(!await self.findOne({username})) {
                    const salt = bcrypt.genSaltSync(10);
                    const passwordHash = bcrypt.hashSync(password, salt);
        
                    const newUser = {
                        passwordHash,
                        username
                    }

                    const user = await self.create(newUser);
                    resolve({username: user.username, role: user.role, _id: user._id });
                } else {
                    reject(new Error('Username taken'));
                }

            } catch (err) {
                reject(new Error('Registration failed'));
            }
        })
    },

    generateUserToken: function ({username, role, _id}) {
        const token = jwt.sign({username, role, _id}, process.env.SECRET);
        return {token};
    }
}

module.exports = mongoose.model('User', userSchema);