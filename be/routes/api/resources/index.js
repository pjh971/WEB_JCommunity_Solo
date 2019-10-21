var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* 권한 없이 접근 가능 */
router.use('/pages', require('./pages'))

// /* 권한에 따른 접근 허용(2이상은 접근불가) */
// router.all('*', (req, res, next) => {
//   if (req.user.lv > 2) return next(createError(403, '로그인 후 이용하세요'))
//   next()
// })

/* 페이지 없을 시 */
router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;

// < url = /api/resource >
// resource의 첫입구로서 req.user정보를 이용하여 하위 라우팅으로의 사전차단 기능 추가가능
