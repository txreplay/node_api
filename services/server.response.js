const sendBodyError = (res, errorMessage) => {
    return res.json({
        message: errorMessage,
        err: null,
        data: null,
    });
};

const sendFieldsError = (res, extra, miss, errorMessage) => {
    return res.json({
        message: errorMessage,
        err: { miss, extra },
        data: null,
    });
};

const sendApiSuccess = (res, data, successMessage) => {
    return res.send({
        message: successMessage,
        err: null,
        data: data,
    })
};

const sendApiError = (res, error, errorMessage) => {
    return res.json({
        message: errorMessage,
        err: true,
        data: error,
    });
};

module.exports = {
    sendBodyError,
    sendFieldsError,
    sendApiSuccess,
    sendApiError
};