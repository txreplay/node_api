const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user.model');

const register = (body) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({email: body.email}, (error, user) => {
            if (error) {
                return reject(error);
            } else if (user) {
                return reject('User already registerd.');
            } else {
                bcrypt.hash(body.password, 10).then((hashedPwd) => {
                    body.password = hashedPwd;

                    return UserModel.create(body).then((mongoResponse) => {
                        return resolve(mongoResponse);
                    }).catch((mongoResponseErr) => {
                        return reject(mongoResponseErr);
                    });
                }).catch((hashedErr) => {
                    return reject(hashedErr);
                });
            }
        });
    });
};

const login = (body) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({email: body.email}, (error, user) => {
            if (error) {
                return reject('Error');
            } else if (!user) {
                return reject('Unknown user');
            } else {
                const validPassword = bcrypt.compareSync(body.password, user.password);

                if (!validPassword) {
                    return reject('Wrong password');
                } else {
                    return resolve({
                        user: user,
                        token: user.generateJwt()
                    });
                }
            }
        });
    });
};

module.exports = {register, login};