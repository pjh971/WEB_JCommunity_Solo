const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const suggestionSchema = new mongoose.Schema({
	title: { type: String, default: ''},
	context: { type: String, default: '내용이 없습니다'},
	cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  _comments: [],
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion