var express = require('express');
var router = express.Router();
var passport = require('passport')

const Bin = require('../models/bins');

// get all bins
router.get('/', (req, res) => {
  Bin.find({}).exec((err, bins) => {
    if (err) res.end('error retrieving bins')
    res.json(bins)
  });
});

// update bin with new audit
router.put('/update',  (req, res) => {
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

//delete audit
router.put('/deleteAudit',  (req, res) => {

  Bin.findOneAndUpdate({bin: req.body.updatedBin.bin},
     req.body.updatedBin).exec((err, bin) => {
       console.log(req.body.updatedBin.bin, bin.bin)
    if (err) res.end('error updating bin')
      console.log('deleteAudit',req.body.updatedBin)
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
