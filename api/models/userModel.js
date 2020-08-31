const Datastore = require('nedb-promises');
const userDatastore = Datastore.create(__dirname + '/../databases/users.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = {
    login: async ({username, password}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await userDatastore.findOne({username});
                if(!user) resolve(false);

                const valid = bcrypt.compareSync(password, user.passwordHash);
                console.log('is valid ', valid);
                if(!valid) resolve(false);

                const token = generateUserToken(user);
                console.log(token);
                resolve(token);

            } catch(err) {  
                reject(false);
            }
        })
    },

    register: async ({username, password}) => {
        return new Promise(async (resolve, reject) => {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);

            const newUser = {
                passwordHash,
                username,
                groups: [
                    username,
                    'user'
                ]
            }

            try {
                if(!await userDatastore.findOne({username})) {
                    const user = await userDatastore.insert(newUser);
                    const token = generateUserToken(user);
                    resolve({token});
                } else {
                    reject(false);
                }

            } catch (err) {
                reject(err);
            }
        })
    },

    /**
     * 
     * @param {*} user 
     */


}

function generateUserToken({username, groups, _id}) {
    const token = jwt.sign({username, groups, _id}, process.env.SECRET);
    return token;
}

module.exports = userModel;