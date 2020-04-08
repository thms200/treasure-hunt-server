const Treasure = require('../models/Treasures');
const { errorMsg } = require('../constants');
const { getImgUrl } = require('../middlewares/uploadImg');
const { checkValidation } = require('../util');

exports.saveTreasures = async(req, res) => {
  try {
    const validation = checkValidation(req.body);
    if (validation.result === 'ng') {
      return res.status(400).json({ result: 'ng', errMessage: validation.msg });
    }
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
    return res.status(400).json({ result: 'ng', errMessage: errorMsg.invalidSave });
  }
};

// console.log('res.locals.uerInfo', res.locals.userInfo); //userInfo가 undefined면 로그인 필요하다고 response
// console.log('image url: ', getImgUrl(req.files)); //s3 저장된 이미지 url이 배열 형태로 들어옴. 다른 정보들과 함께 db에 저장
// console.log('req.body', req.body); //다른 정보 전달 (ex, 카테고리: 유심, country: france)