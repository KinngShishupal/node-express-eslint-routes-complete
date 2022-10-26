const dotenv = require('dotenv');

dotenv.config({
  path: './config.env', // path of our configuation file
});

// above two line should always be on top
const app = require('./app');

// console.log(app.get('env')); // To check the enviornment we are currently in
// console.log(process.env); // list of enviornments which node uses internally
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has started on Port ${port}`);
});
