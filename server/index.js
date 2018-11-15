const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const {DB_URL, DB_NAME, DB_USERNAME, DB_PASSWORD} = require('./environment');

console.log('env>>>>>', process.env, require('./environment'));
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  user: DB_USERNAME,
  pass: DB_PASSWORD,
  dbName: DB_NAME,
}).then(() => {
  console.log('Connection established');
}).catch((e)=>{
  console.error('Connection error: ', e);
});

const app = express();

app.use(require('cors')());

app.use('/api', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  // eslint-disable-next-line
  console.log('now listening for requests on 4000');
});




