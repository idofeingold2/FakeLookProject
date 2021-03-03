const axios = require('axios');

exports.axiosCreate = (url) => {
    return axios.default.create({baseUrl: url});
}
