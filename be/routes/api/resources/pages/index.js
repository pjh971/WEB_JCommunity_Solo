var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../../models/pages')

router.post('/', function(req, res, next) {  
  const { name } = req.body //name = 페이지 이름 (= url 주소중 맨마지막 페이지이름)
  Page.findOne({ name })
    .then((r) => {
      if (!r) { // 만약 해당 페이지가 없다면
        if (req.user.lv) throw new Error(`페이지 ${name} 생성이 안되었습니다.`) // req.user.lv > 0
        return Page.create({ name }) // 페이지정보 모델을 하나 만듬, 디폴트 레벨 = 0
      }
      if (r.lv < req.user.lv) throw new Error(`페이지 ${name} 이용 자격이 없습니다.`)
      // 페이지가 있고, 유저 레벨이 페이지 레벨보다 낮다면 --> 이용자격없음 메세지 띄움
      return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } }) // 만약 페이지도 있고 유저레벨과 맞다면 해당 페이지 모델을 찾아서 inCnt를 1증가 시킴
    })
    .then(() => {
      res.send({ success: true, d: req.user, token: req.token  })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;