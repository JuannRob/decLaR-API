const axios = require('axios');

exports.verDecretos = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/decretos');
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

// exports.verDecretoPorId = async () => {
//     try {
//         const res = await axios.get('http://localhost:5000/api/decretos?_id=6372ad0538d6c9c2db9209b1')
//         return res.data;
//     } catch (err) {
//         console.error(err);
//     }
// }