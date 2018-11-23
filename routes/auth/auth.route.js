const express = require('express');
const authRouter = express.Router();
const {register, login} = require('./auth.controller');
const {gotBody, checkFields} = require('../../services/request.checker');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/server.response');

class AuthRouterClass {
    routes() {
        authRouter.post('/register', (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res, 'No body data provided.');
            }

            const {validity, extra, miss} = checkFields(['email', 'password'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss, 'Bad fields provided');
            } else {
                register(req.body).then((apiResponse) => {
                    sendApiSuccess(res, apiResponse, 'User successfully created.');
                }).catch((apiResponseErr) => {
                    sendApiError(res, null, apiResponseErr);
                });
            }
        });

        authRouter.post('/login', (req, res) => {
            if (gotBody(req.body)) {
                sendBodyError(res, 'No body data provided.');
            }

            const {validity, extra, miss} = checkFields(['email', 'password'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss, 'Bad fields provided');
            } else {
                login(req.body).then((apiResponse) => {
                    sendApiSuccess(res, apiResponse, 'User successfully created.');
                }).catch((apiResponseErr) => {
                    sendApiError(res, null, apiResponseErr);
                });
            }
        });
    }

    init() {
        this.routes();

        return authRouter;
    }
}

module.exports = {AuthRouterClass};