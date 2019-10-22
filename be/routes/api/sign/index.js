const express = require('express');
const createError = require('http-errors');
const router = express.Router();

//added modules
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cfg = require('../../../../config');
const User = require('../../../models/users');

const signToken = (_id, id, name, lv, _company, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    };
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember; // 6일
    jwt.sign({ _id, id, name, lv, _company, rmb }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

router.post('/in', function(req, res, next) {
  const { id, pwd, remember } = req.body;
  if (!id) throw createError(400, '아이디가 없습니다') 
  if (!pwd) throw createError(400, '비밀번호가 없습니다')
  if (remember === undefined) throw createError(400, '기억하기가 없습니다.')
  
  let u = {}
  User.findOneAndUpdate({ id }, { $inc: { inCnt: 1 } }).populate('_company').lean()
    // sign.vue에서 로그인시 id와 pwd의 유효성을 검사하고 토큰을 발행하는 부분 {id}= 폼에서 입력받은 id
    // 그리고 로그인 횟수를 1 증가시킴
    .then(r => {
      if (!r) throw new Error('존재하지 않는 아이디입니다.');
      const p = crypto.scryptSync(pwd, r._id.toString(), 64, { N: 1024 }).toString('hex');
      if (r.pwd !== p) throw new Error('비밀번호가 틀립니다.'); // 폼에서 받은 비밀번호를 다시 암호화해서 DB의 암호화된 비밀번호와 비교
      delete r.pwd
      u = r
      return signToken(r._id, r.id, r.name, r.lv, r._company, remember);
    })
    .then(r => {
      res.send({ success: true, token: r, user: u });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.post('/out', function(req, res) {
  res.send({ success: true, msg: '아직 준비안됨' });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;