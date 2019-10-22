const mongoose = require('mongoose');
const crypto = require('crypto');
const cfg = require('../../config');
const Company = require('./companys');

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  name: { type: String, default: '' },
  number: { type: String, default: '' },
  lv: { type: Number, default: 2 },
  inCnt: { type: Number, default: 0 },
  _company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true }
});

const User = mongoose.model('User', userSchema);

// User.collection.dropIndexes('id_1')
const com = null

Company.findOne({ name: cfg.company.name}) //company 찾아오는 구문
  .then((r) => {
    this.com = r._id
    console.log(this.com)
  })
  .catch((e) => {
    console.error(e.message);
  })

User.findOne({ id: cfg.admin.id }) // admin계정이 없을 경우 생성하는 구문, 있으면 생성 X
  .then(r => {
    if (!r)
      return User.create({
        id: cfg.admin.id,
        pwd: cfg.admin.pwd,
        name: cfg.admin.name,
        number: cfg.admin.number,
        _company: this.com,
        lv: 0
      });
    return Promise.resolve(null);
  })
  .then(r => { // pwd 암호화하는 부분
    if (!r) return Promise.resolve(null);
    if (r) console.log(`admin:${r.id} created!`);
    const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex');
    return User.findOneAndUpdate({ _id: r._id }, { $set: { pwd } }, {new: true});
  })
  .then(r => {
    if (r) console.log('pwd changed');
  })
  .catch(e => {
    console.error(e.message);
  });

module.exports = User;