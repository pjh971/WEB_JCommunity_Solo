const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const likeHistorySchema = new mongoose.Schema({
  _suggestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion', index: true },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
});

const LikeHistory = mongoose.model('LikeHistory', likeHistorySchema);

module.exports = LikeHistory