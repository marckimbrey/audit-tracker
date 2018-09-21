const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const dburl = process.env.MONGODB_URI || "mongodb://marc:lwg4614@ds163162.mlab.com:63162/bins";

const bins = require('./routes/bins');
// API calls
// app.get('/api/bins', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

app.use('/api/bins', bins);

// connect to mongodb database
mongoose.connect(dburl, (err) => {
  if (err) throw err;
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
