const checkFields = (required, reqBody) => {
    let miss = [];
    let extra = [];

    // List all missing prop required
    required.forEach(prop => {
        if (!(prop in reqBody)) {
            miss.push(prop);
        }
    });

    // List all extra prop
    for (let prop in reqBody) {
        if (reqBody.hasOwnProperty(prop) && required.indexOf(prop) === -1) {
            extra.push(prop);
        }
    }

    const validity = (extra.length === 0 && miss.length === 0);

    return { validity, extra, miss };
};

const gotBody = (reqBody) => {
    return (!typeof reqBody === 'undefined' || !reqBody === null || !Object.keys(reqBody).length === 0);
};

module.exports = { gotBody, checkFields };