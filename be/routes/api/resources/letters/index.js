const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Letters = require('../../../../models/letters');

/* POST 즉 마음의 편지 작성은 병사들(lv2)도 가능 */
router.post('/', (req, res, next) => {
  const { title, context } = req.body;
  const _user = req.user._id;
  const _company = req.user._company;
  Letters.create({ title, context, _user, _company })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

/* 마음의 편지 열람 및 삭제는 간부들(lv1) 이상만 가능 */
router.all('*', (req, res, next) => {
  if (req.user.lv > 1) return next(createError(403, '권한이 없습니다.'));
  next();
});

router.get('/one/:_id', function(req, res, next) {
  const _id = req.params._id
  Letters.findOne({ _id }).select('-_user')
    .then(r => {
      res.send({ success: true, d: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.get('/list', (req, res, next) => {
  const _company = req.user._company;
  Letters.find({ _company }).select('-_user')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id;
  Letters.findOne({ _id })
    .then(r => {
      if (!r) return next(createError(400, '게시물이 없습니다'));
      return Letters.deleteOne({ _id });
    })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`));
});

module.exports = router;