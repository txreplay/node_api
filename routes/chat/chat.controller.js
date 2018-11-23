const ChatModel = require('../../models/chat.model');

const createMessage = (body, jwt) => {
    return new Promise((resolve, reject) => {
        const newMessage = {
            sender: jwt._id,
            message: body.message,
            sentDate: Date.now()
        };
        return ChatModel.create(newMessage).then((mongoResponse) => {
            return resolve(mongoResponse);
        }).catch((mongoResponseErr) => {
            return reject(mongoResponseErr);
        });
    });
};

const fetchMessages = () => {
    return new Promise((resolve, reject) => {
        ChatModel.find({}, (error, messages) => {
            if (error) {
                return reject(error);
            } else {
                console.log(messages);
                resolve(messages);
            }
        });
    });
};

module.exports = {createMessage, fetchMessages};