const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
const comebackSchema = new mongoose.Schema({
  createdDay: {type: String, default: null},
  currentType: { type: Number, default: 0}, //1, 2, 3 보고의 기준
  firstLoc: {
    latlng: {
      latitude: { type: Number, default: 0},
      longitude: { type: Number, default: 0},
    },
    region: { type: String, default: ''},
    address: { type: String, default: ''},
    time: {type: String, default: ''}
  },
  secondLoc: {
    latlng: {
      latitude: { type: Number, default: 0},
      longitude: { type: Number, default: 0},
    },
    region: { type: String, default: ''},
    address: { type: String, default: ''},
    time: {type: String, default: ''}
  },
  thirdLoc: {
    latlng: {
      latitude: { type: Number, default: 0},
      longitude: { type: Number, default: 0},
    },
    region: { type: String, default: ''},
    address: { type: String, default: ''},
    time: {type: String, default: ''}
  },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true }
});

const Comeback = mongoose.model('Comeback', comebackSchema);

module.exports = Comeback