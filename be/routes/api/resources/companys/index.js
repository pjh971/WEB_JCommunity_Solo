var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Company = require('../../../../models/companys');

/* Routing Methods */
router.get('/one', function(req, res, next) {
  // 토큰에 담겨진 유저정보의 "부대"를 리턴!
  const _id = req.user._company
  Company.findOne({ _id })
    .then(r => {
      res.send({ success: true, d: r, token: req.token});
    })
    .catch(e => {
      res.send({ success: false });
    });
});
router.get('/list', function(req, res, next) {
  // 회원가입시에 존재하는 부대정보 받아오기 위한 get
  Company.find()
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;