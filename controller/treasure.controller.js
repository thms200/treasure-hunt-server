const Treasure = require('../models/Treasures');
const { errorMsg } = require('../constants');
const { getImgUrl } = require('../middlewares/uploadImg');
const { checkValidation, processTreasureList } = require('../util');

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
    let treasures =
      await Treasure
        .find({ expiration: { $gte: today }, is_hunting: { $ne: true } })
        .populate('registered_by')
        .sort('expiration');
    if (!treasures) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalidTreasures });

    if (country !== 'all') {
      treasures =
        await Treasure
          .find({ country, expiration: { $gte: today }, is_hunting: { $ne: true } })
          .populate('registered_by')
          .sort('expiration');
    } else if (category !== 'all') {
      treasures =
        await Treasure
          .find({ category, 'expiration': { $gte: today }, is_hunting: { $ne: true } })
          .populate('registered_by')
          .sort('expiration');
    }

    treasures = processTreasureList(treasures);
    return res.status(200).send(treasures);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};

exports.getSelectedTreasure = async(req, res) => {
  try {
    const treasureId = req.params.treasure_id;
    const treasure =
      await Treasure
        .findById({ _id: treasureId })
        .populate('registered_by', 'name')
        .populate('taken_by', 'name');
    if (!treasure) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalideSelectedTreasure });

    return res.status(200).send(treasure);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};

exports.updateTreasure = async(req, res) => {
  try {
    const treasureId = req.params.treasure_id;
    const treasure =
      await Treasure
        .findById({ _id: treasureId })
        .populate('registered_by', 'name');
    if (!treasure) return res.status(404).json({ result: 'ng', errMessage: errorMsg.invalideSelectedTreasure });

    const loginUser = res.locals.userInfo.id;
    const { expiration, registered_by: { _id } } = treasure;

    const isSameUser = loginUser === _id.toString();
    if (isSameUser) return res.status(400).json({ result: 'ng', errMessage: errorMsg.duplicate });

    const isExpired = new Date().getTime() > expiration;
    if (isExpired) return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidDate });

    treasure.is_hunting = true;
    treasure.taken_by = res.locals.userInfo.id;
    await treasure.save();
    return res.status(200).send(treasure);
  } catch(err) {
    return res.status(404).json({ result: 'ng', errMessage: errorMsg.generalError });
  }
};
