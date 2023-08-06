const bcrypt = require('bcrypt');
const uuid = require('uuid');

const storage = require('../db/storage');
const DtoUser = require('./dtoUser');
const Token = require('./token');
const StorageError = require('./errors/storage');
const ClientError = require('./errors/client');

class SignUpUser {
    constructor({ name, email, password }) {
        this.name = name.trim();
        this.email = email.trim();
        this.password = password.trim();
    }

    signUp() {
        let dtoUser, token;

        return this.checkUser()
            .then((foundUser) => {
                if (foundUser) {
                    throw new ClientError('Sorry, but the provided email or username is already registered. Please use a different email or choose another username.', 409);
                }
                return bcrypt.hash(this.password, 10);
            })
            .then((hash) => {
                const activationLink = uuid.v4();
                return this.insertUser(hash, activationLink);
            })
            .then((id) => {
                return this.findUser(id);
            })
            .then((foundUser) => {
                // TODO: email ...
                dtoUser = new DtoUser(foundUser);
                token = new Token({ ...dtoUser });
                return token.save(foundUser.id);
            })
            .then(({ userId, refreshToken }) => {
                return { ...token, user: dtoUser };
            })
            .catch((err) => {
                throw err;
            });
    }

    findUser(id) {
        const query = `
            SELECT *
            FROM users
            WHERE id = ?;
        `;
        const values = [id];

        return storage.query(query, values)
            .then(([[foundUser]]) => {
                return foundUser;
            })
            .catch((err) => {
                throw new StorageError('READ');
            });
    }

    checkUser() {
        const query = `
            SELECT *
            FROM users
            WHERE email = ?
            OR name = ?;
        `;
        const values = [this.email, this.name];

        return storage.query(query, values)
            .then(([[foundUser]]) => {
                return foundUser;
            })
            .catch((err) => {
                throw new StorageError('READ');
            });
    }

    insertUser(hash, link) {
        const query = `
            INSERT INTO users (name, email, password, activation_link)
            VALUES (?, ?, ?, ?);
        `;
        const values = [this.name, this.email, hash, link];
        return storage.query(query, values)
            .then(([res]) => {
                return res.insertId;
            })
            .catch((err) => {
                throw new StorageError('CREATE');
            });
    }
}

module.exports = SignUpUser;