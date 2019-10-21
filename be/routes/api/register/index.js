const express = require('express');
const createError = require('http-errors');
const crypto = require('crypto');
const router = express.Router();

//added modules
const User = require('../../../models/users');

router.post('/', function(req, res) {
  const u = req.body;
  if (!u.id) return res.send({ success: false, msg: '아이디가 없습니다.' });
  if (!u.pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.' });
  if (!u.name) return res.send({ success: false, msg: '이름이 없습니다.' });

  User.findOne({ id: u.id })
    .then(r => {
      if (r) throw new Error('이미 존재하는 아이디입니다.');
      return User.create(u)
    })
    .then((r) => {
      const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex');
      return User.updateOne({ _id: r._id }, { $set: { pwd } });
    })
    .then(r => {
      res.send({ success: true});
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;