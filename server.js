const express = require('express');
const app = express();
const port = process.env.API_PORT || 4444;
const apiRoutes = require('./routes');

//handle json body request
app.use(express.json());
//handle all the routes starting with /api/
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  //health check route
  res.status(200).send({ STATUS: 'Good to go!' });
});

app.listen(port, function (err) {
  if (err) {
    console.error('Failure to launch api');
    return;
  }
  console.log(`Listening on port ${port}`);
});
