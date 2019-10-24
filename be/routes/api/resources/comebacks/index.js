var express = require('express');
var createError = require('http-errors');
var moment = require('moment');
var geolib = require('geolib');
var router = express.Router();
const Comeback = require('../../../../models/comebacks');

/* Routing Methods */
router.get('/one', function(req, res, next) {
  const _user = req.user._id;
  const _company = req.user._company._id
  const today = moment().format('YYYYMMDD')

  Comeback.findOne({createdDay: today, _user, _company})
    .then((r) => {
      if (!r) res.send({ success: false, msg: '복귀 시작 안함'})
      res.send({ success: true, d: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/list', function(req, res, next) {
  const _company = req.user._company._id
  const today = moment().format('YYYYMMDD')

  Comeback.find({createdDay: today, _company}).populate('_user', 'name')
    .then(rs => {
      if (!rs) res.send({ success: false, msg: '복귀 인원 없음'})
      res.send({ success: true, ds: rs, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});


router.post('/', function(req, res, next) {
  const loc = req.body;
  const _user = req.user._id;
  const _company = req.user._company._id
  const today = moment().format('YYYYMMDD')
  Comeback.findOne({createdDay: today, _user, _company}).populate('_company', 'loc')
    .then((r) => {
      if (!r) {
        const firstLoc = loc
        const currentType = 1
        const createdDay = today
        return Comeback.create({ createdDay, currentType, firstLoc, _user, _company })
      }
      const _id = r._id
      if (r.currentType === 1) {
        if (r._company.loc.region !== loc.region)
          throw new Error('부대 위치와 같은 지역에서만 2보고가 가능합니다.')
        return Comeback.updateOne({ _id }, { $set: { currentType: 2, secondLoc: loc } }, { new: true })
      }
      if (r.currentType === 2) {
        const comlatlng = r._company.loc.latlng
        const currentlatlng = loc.latlng
        const distance = geolib.getDistance(comlatlng, currentlatlng)
        if (distance > 1000)
          throw new Error('부대 반경 1km이내에서만 3보고가 가능합니다')
        return Comeback.updateOne({ _id }, { $set: { currentType: 3, thirdLoc: loc } }, { new: true })
      }
      throw new Error('이미 복귀완료')
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;