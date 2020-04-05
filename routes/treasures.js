const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/authorization');
const { uploadImg, getImgUrl } = require('../middlewares/uploadImg');

router.get('/', ensureAuthenticated, (req, res) => {
  console.log('res.locals.uerInfo', res.locals.userInfo); //userInfo가 undefined면 로그인 필요하다고 response
  res.json({ result: 'respond GET with a treasures resource' });
});

router.post('/', ensureAuthenticated, uploadImg.array('img', 3), (req, res, next) => {
  try {
    console.log('res.locals.uerInfo', res.locals.userInfo); //userInfo가 undefined면 로그인 필요하다고 response
    console.log('image url: ', getImgUrl(req.files)); //s3 저장된 이미지 url이 배열 형태로 들어옴. 다른 정보들과 함께 db에 저장
    res.json({ result: 'respond POST with a treasures resource' });
  } catch(err) {
    next(err);
  }
});

module.exports = router;
