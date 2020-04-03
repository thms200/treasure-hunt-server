const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { errMessage } = require('../constants');

exports.getLogin = async (req, res) => {
  try {
    const { email, picture_url, name } = req.body;
    const user = await User.findOne({ email });
    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: '1d', issuer: 'minsun' };
    const payload = {};
    if (!user) {
      const newUser = await User.create({ email, picture_url, name });
      if (!newUser) return res.json({ result: 'ng', errMessage: errMessage.invalidSignup });
      payload.name = newUser.name;
      payload.picture = newUser.picture_url;
    } else  {
      payload.name = user.name;
      payload.picture = user.picture_url;
    }
    const token = jwt.sign(payload, secretKey, options);
    return res.json({ result: 'ok', token });
  } catch(err) {
    return res.json({ result: 'ng', errMessage: errMessage.invalidLogin });
  }
};
