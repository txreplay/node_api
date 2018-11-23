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

const deleteMessage = (params, jwt) => {
    return new Promise((resolve, reject) => {
        ChatModel.findOne({_id: params.id}, (error, message) => {
            if (error) {
                return reject('Error.');
            } else if (!message) {
                return reject('Unknown message.');
            } else if (message.sender.toString() !== jwt._id) {
                return reject("You're not the author of this message.");
            } else {
                ChatModel.deleteOne({_id: params.id}, (error) => {
                    if (error) {
                        return reject('Error.');
                    } else {
                        return resolve({
                            success: true
                        });
                    }
                });
            }
        });
    });
};

module.exports = {createMessage, fetchMessages, deleteMessage};