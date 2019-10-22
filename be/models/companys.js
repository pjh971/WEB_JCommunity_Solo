// 부대 정보 관련 모델
const mongoose = require('mongoose');
const cfg = require('../../config');

const comSchema = new mongoose.Schema({
	name: { type: String, default: '', unique: true},
	phoneNumber: { type: String, default: ''},
});

const Company = mongoose.model('Company', comSchema);

Company.findOne({ name: cfg.company.name }) // admin계정이 없을 경우 생성하는 구문, 있으면 생성 X
  .then(r => {
    if (!r)
      return Company.create({
        name: cfg.company.name,
        phoneNumber: cfg.company.phoneNumber,
      });
    return Promise.resolve(null);
  })
  .then(r => { // pwd 암호화하는 부분
    if (r) console.log(`company:${r.name} created!`);
  })
  .catch(e => {
    console.error(e.message);
  });

module.exports = Company