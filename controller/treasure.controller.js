const Treasure = require('../models/Treasures');
const { errorMsg } = require('../constants');
const { getImgUrl } = require('../middlewares/uploadImg');
const { checkValidation } = require('../util');

exports.saveTreasures = async(req, res) => {
  try {
    const validation = checkValidation(req.body);
    if (validation.result === 'ng') return res.status(400).json({ result: 'ng', errMessage: validation.msg });
    const { country, category, name, expiration, latitude, longitude, description, is_hunting } = req.body;
    const location = [latitude, longitude];
    const location_pictures_url = getImgUrl(req.files);
    if (!location_pictures_url.length) return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidImgs });
    await Treasure.create({
      registered_by: res.locals.userInfo.id,
      country,
      category,
      name,
      expiration,
      location,
      location_pictures_url,
      description,
      is_hunting,
    });
    return res.status(201).json({ result: 'ok' });
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalidSave });
  }
};

exports.getTreasures = async(req, res) => {
  try {
    const today = new Date().getTime();
    const { country, category } = req.query;
    let treasures = await Treasure.find({ 'expiration': { $gte: today } }).populate('registered_by');
    if (!treasures) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalidTreasures });

    if (country !== 'all') {
      treasures = await Treasure.find({ country, 'expiration': { $gte: today } }).populate('registered_by');
    } else if (category !== 'all') {
      treasures = await Treasure.find({ category, 'expiration': { $gte: today } }).populate('registered_by');
    }

    return res.status(200).send(treasures);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};
