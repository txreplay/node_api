const express = require('express');
const chatRouter = express.Router();
const {createMessage, fetchMessages} = require('./chat.controller');
const {gotBody, checkFields} = require('../../services/request.checker');
const {verifyToken} = require('../../services/middleware');
const {sendBodyError, sendFieldsError, sendApiSuccess, sendApiError} = require('../../services/server.response');

class ChatRouterClass {
    routes() {
        chatRouter.post('/', (req, res) => {
            const jwt = verifyToken(req, res);

            if (gotBody(req.body)) {
                sendBodyError(res, 'No body data provided.');
            }

            const {validity, extra, miss} = checkFields(['message'], req.body);

            if (!validity) {
                sendFieldsError(res, extra, miss, 'Bad fields provided');
            } else {
                createMessage(req.body, jwt).then((apiResponse) => {
                    sendApiSuccess(res, apiResponse, 'Message successfully sent.');
                }).catch((apiResponseErr) => {
                    sendApiError(res, apiResponseErr, apiResponseErr._message);
                });
            }
        });

        chatRouter.get('/', (req, res) => {
            verifyToken(req, res);

            fetchMessages(req.body).then((apiResponse) => {
                sendApiSuccess(res, apiResponse, 'Messages successfully fetched.');
            }).catch((apiResponseErr) => {
                sendApiError(res, null, apiResponseErr);
            });
        });
    }

    init() {
        this.routes();

        return chatRouter;
    }
}

module.exports = {ChatRouterClass};