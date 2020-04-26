const express = require('express');
const app = express();
const port = process.env.API_PORT || 4444;
const cors = require('cors');
const apiRoutes = require('./routes');

//handle json body request
app.use(express.json());
app.use(cors());

//handle all the routes starting with /api/
app.use('/api', apiRoutes);

const validateKey = (req, res, next) => {
  //we could add this middleware to any route we want
  let keyHeader = req.header('x-api-key');
  if (keyHeader && keyHeader == 'MyUniqueApiKey') {
    //we could do whatever we want to validate the key
    next();
  } else {
    res.status(401).send({ error: { code: 999, message: 'Invalid API key' } });
  }
};

app.get('/', validateKey, (req, res) => {
  //health check route
  //check for API key
  res.status(200).send({ STATUS: 'Good to go!' });
});

app.listen(port, function (err) {
  if (err) {
    console.error('Failure to launch api');
    return;
  }
  console.log(`Listening on port ${port}`);
});
