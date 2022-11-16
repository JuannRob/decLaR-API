const axios = require('axios');

exports.verDecretos = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/decretos');
        return res.data;
    } catch (err) {
        console.error(err);
    }
}