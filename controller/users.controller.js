const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { errorMsg } = require('../constants');

exports.getLogin = async(req, res) => {
  try {
    const { email, picture_url, name } = req.body;
    const user = await User.findOne({ email });
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: '1d', issuer: 'minsun' };
    const payload = {};
    if (!user) {
      const newUser = await User.create({ email, picture_url, name });
      if (!newUser) return res.status(401).json({ result: 'ng', errMessage: errorMsg.invalidSignup });
      payload.name = newUser.name;
      payload.picture = newUser.picture_url;
      payload.id = newUser._id;
    } else  {
      payload.name = user.name;
      payload.picture = user.picture_url;
      payload.id = user._id;
    }
    const token = jwt.sign(payload, secretKey, options);
    return res.status(201).json({ result: 'ok', token });
  } catch(err) {
    return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidLogin });
  }
};

exports.getAuth = async(req, res) => {
  try {
    const token = req.headers['x-access-token'].split('Bearer')[1].trim();
    if (!token) return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidLogin });
    const secretKey = process.env.SECRET_KEY;
    const payload = await jwt.verify(token, secretKey);
    return res.status(200).json({ result: 'ok', token, payload });
  } catch(err) {
    const { name } = err;
    if (name === 'TokenExpiredError') return res.status(400).json({ result: 'ng', errMessage: errorMsg.tokenExpired });
    if (name === 'JsonWebTokenError' || name === 'NotBeforeError') return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidToken });
  }
};
