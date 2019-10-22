const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const commentSchema = new mongoose.Schema({
	context: { type: String, default: '내용이 없습니다'},
	cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _suggestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion', index: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment