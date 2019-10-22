var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Company = require('../../../../models/companys');

/* Routing Methods */
router.get('/', function(req, res, next) {
  Company.find()
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token  });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.post('/', function(req, res, next) {
  const u = req.body;
  Company.create(u)
    .then(r => {
      res.send({ success: true, msg: r, token: req.token  });
    })
    .catch(e => {
      res.send({ success: false });
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, phoneNumber } = req.body;
  Company.updateOne({ _id: id }, { $set: { name, phoneNumber } })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token  });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  Company.deleteOne({ _id: id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token  });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;