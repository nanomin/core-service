require('dotenv').config();
const app = require('./server/app');
const port = process.env.USE_PORT || 9000;

app.listen(port, () => {
  console.log(`Web Server Listening port ${port}!`);
});