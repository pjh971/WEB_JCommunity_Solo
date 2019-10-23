var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Notice = require('../../../../models/notices');

/* Routing Methods */
router.get('/one/:_id', function(req, res, next) {
  const _id = req.params._id
  Notice.findOneAndUpdate({ _id }, { $inc: { "cnt.view": 1 } }, { new: true }).lean()
    .then(r => {
      res.send({ success: true, d: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/list', function(req, res, next) {
  Notice.find({ _company: req.user._company._id }).select('title cnt')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

// 홈페이지로 보내줄 좋아요 순 리스트
router.get('/listByDay', function(req, res, next) {
  Notice.find({ _company: req.user._company._id }).sort( { '_id': -1 } ).populate('_user', 'name').limit(3)
  .then(rs => {
    res.send({ success: true, ds: rs, token: req.token });
  })
  .catch(e => {
    res.send({ success: false });
  });
})

// 간부만 사용가능
router.all('*', (req, res, next) => {
  if (req.user.lv > 1) return next(createError(403, '간부 이상만 이용가능합니다'))
  next()
})

router.post('/', function(req, res, next) {
  const { title, context } = req.body;
  const _user = req.user._id;
  const _company = req.user._company._id

  Notice.create({ title, context, _user, _company })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.put('/:id', (req, res, next) => {
  const _id = req.params.id;
  Notice.findOne({ _id })
    .then((r) => {
      if (!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Notice.updateOne({ _id }, { $set: req.body })
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
  Notice.findOne({ _id }).populate('_user', 'lv')
    .then((r) => {
      if(!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        if (r._user.lv <= req.user.lv) return next(createError(403, '본인이 작성한 게시물이 아닙니다.'))
      }
      return Notice.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});


router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;