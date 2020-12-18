const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const  User  = require('../model/users');
const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const exjwt = require('express-jwt');
const cors = require('cors');
router.use(cors());

const accessTokenKey = 'My super secret key';
const refreshKey = "Refresh token key"

const jwtMW = exjwt({
    secret: accessTokenKey,
    algorithms: ['HS256']
});
router.post('/', async (req, res) => {    

    console.log(req.body.username);
    console.log(req.body.userName);

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(206).send('Incorrect username or password.');
    }
 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(204).send('Incorrect email or password.');
    }
    const token = jwt.sign({ _id: user._id,username: user.username }, accessTokenKey,{expiresIn:'3600s'});
    const refreshToken = jwt.sign({ _id: user._id,username: user.username }, refreshKey,{expiresIn:'6000s'});
    loginStatus = true;
    var decoded_token = jwt_decode(token);
    res.status(200).json({
        success: true,
        err:null,
        exp:decoded_token.exp,
        token,
        refreshToken,
        loginStatus
    })
});

 
module.exports = router; 