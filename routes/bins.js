var express = require('express');
var router = express.Router();

const Bin = require('../models/bins');


// get all bins
router.get('/', (req, res) => {
  Bin.find({}).exec((err, bins) => {
    if (err) res.end('error retrieving bins')
    res.json({ mlab: 'Hello From mlab' })
  });
});

// get single bin
router.get('/:id', (req, res) => {
  Bin.findOne({bin: req.params.id}).exec((err, bin) => {
    if (err) res.end('error retrieving bin')
    res.json(bin)
  });
});

// add new bin
router.post('/add', (req, res) => {

  const newBin = new Poll(req.body);
  console.log(req.body,newBin)
  newBin.save((err, bin) => {
    if (err) console.log('error saving to database', err);
    console.log(bin)
    res.json(bin);
  })
});


module.exports = router;
