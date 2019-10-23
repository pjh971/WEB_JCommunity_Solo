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
    .then(r => {
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
        console.log(r)
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

router.put('/:id', (req, res, next) => {
  const _id = req.params.id;
  Suggestion.findOne({ _id })
    .then((r) => {
      if (!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Suggestion.updateOne({ _id }, { $set: req.body })
    })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  if (!req.user._id) return res.send({ success: false, msg: '게시물 삭제 권한이 없습니다' })
  const _id = req.params.id;
  Suggestion.findOne({ _id }).populate('_user', 'lv')
    .then((r) => {
      if(!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        if (r._user.lv <= req.user.lv) return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Suggestion.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

// 좋아요 처리
router.get('/like/:_id', function(req, res, next) {
  const _suggestion = req.params._id;
  const _user = req.user._id;
  LikeHistorys.create({ _suggestion, _user })
    .then(r => {
      if (r) return Suggestion.findOneAndUpdate({ _id: _suggestion }, { $inc: { "cnt.like": 1 } }, { new: true }).select('cnt')
    })
    .then(r => {
      console.log(r)
      res.send({ success: true, d: r.cnt.like, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});
// 좋아요 취소
router.get('/dislike/:_id', function(req, res, next) {
  const _suggestion = req.params._id;
  const _user = req.user._id;
  LikeHistorys.findOne({ _suggestion, _user })
    .then(r => {
      if (r) {
        console.log(r)
        return LikeHistorys.deleteOne(r)
      }
    })
    .then(r => {
      if (r) return Suggestion.findOneAndUpdate({ _id: _suggestion }, { $inc: { "cnt.like": -1 } }, { new: true }).select('cnt')
    })
    .then(r => {
      res.send({ success: true, d: r.cnt.like, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

// 홈페이지로 보내줄 좋아요 순 리스트
router.get('/listByLike', function(req, res, next) {
  console.log(req.user._company._id)
  Suggestion.find({ _company: req.user._company._id }).sort( { 'cnt.like': -1 } ).populate('_user', 'name').limit(3)
  .then(rs => {
    res.send({ success: true, ds: rs, token: req.token });
  })
  .catch(e => {
    res.send({ success: false });
  });
})



router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;