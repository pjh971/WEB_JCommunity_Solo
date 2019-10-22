const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
	title: { type: String, default: ''},
	context: { type: String, default: '내용이 없습니다'},
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true }
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter