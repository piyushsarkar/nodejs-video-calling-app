const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASS
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful! ✅'))
  .catch(() => console.log('DB CONNECTION FALIED ❌'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} ✅`);
});
