var express = require('express');
var router = express.Router();

const Bin = require('../models/bins');

const testData = [
  {
    bin: '17/17/17',
    lastAudit: '2018-6-17T03:11:00',
    auditHistory: []
  },
  {
    bin: '17/17/18',
    lastAudit: '2018-6-21T03:24:00',
    auditHistory: []
  }
];
// get all bins
router.get('/', (req, res) => {
  Bin.find({}).exec((err, bins) => {
    if (err) res.end('error retrieving bins')
    res.json(bins)
  });
});

// update bin
router.put('/update', (req, res) => {
  const newDate = new Date()
  Bin.findOneAndUpdate({bin: req.body.bin},
     {lastAudit:newDate.toString(),
       "$push": { "auditHistory": newDate.toString()}
     }, {new: true}).exec((err, bin) => {
    if (err) res.end('error retrieving bin')
    console.log('newBin', bin)
    res.json(bin);
  });
});

// add new bin
router.post('/add', (req, res) => {
  console.log(req.body)
  const newDate = new Date();
  const newBin = new Bin({
    bin: req.body.bin,
    lastAudit: newDate.toString(),
    auditHistory: [newDate.toString()]
  });
  console.log(newBin)
  newBin.save((err, bin) => {
    if (err) console.log('error saving to database', err);
    console.log(bin)
    res.json(bin);
  })
});


module.exports = router;
