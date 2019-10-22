var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Suggestion = require('../../../../models/suggestions');
const Comment = require('../../../../models/comments');

/* Routing Methods */
router.post('/:_suggestion', function(req, res, next) {
  const _suggestion = req.params._suggestion;
  if (!_suggestion) throw createError(400, '건의사항이 없습니다.')
  const { context } = req.body;
  
  if (!context) throw createError(400, '내용이 없습니다.')

  Suggestion.findById(_suggestion)
    .then(r => {
      if (!r) throw createError(400, '잘못된 게시물입니다.')
      const cmt = {
        context,
        _suggestion,
        ip: '1.1.1.1', //req.ip
        _user: null
      }
      if (req.user._id) cmt._user = req.user._id
      return Comment.create(cmt)
    })
    .then(r=> {
      if (!r) throw new Error('댓글이 생성되지 않았습니다.')
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  if (!req.user._id) return res.send({ success: false, msg: '댓글 삭제 권한이 없습니다' })
  const _id = req.params.id;
  Comment.findOne({ _id }).populate('_user', 'lv')
    .then((r) => {
      if(!r) return next(createError(400, '게시물이 없습니다'))
      if (r._user._id.toString() !== req.user._id) {
        if (r._user.lv <= req.user.lv) return next(createError(403, '본인이 작성한 댓글이 아닙니다.'))
      }
      return Comment.deleteOne({ _id })
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