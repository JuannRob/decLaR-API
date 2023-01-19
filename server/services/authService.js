require('dotenv').config()

exports.isAuth = async (req, res, next) => {

    const auth = req.query.pwd;
    const pass = process.env.PASS;
    if (auth === pass) {
        next();
    } else {
        console.log('====================================');
        console.log('header: ', auth);
        console.log('pass: ', pass);
        console.log('====================================');
        res.status(401).send('Acceso prohibido');
    }
}