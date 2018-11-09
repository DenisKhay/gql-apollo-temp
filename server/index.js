const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = '27017';
const HOST='mongoeva';

const DB_URL = `mongodb://${HOST}:${PORT}?authSource=admin`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  user: process.env.USERNAME,
  pass: process.env.PASSWORD,
  connectTimeoutMS: 10000,
  dbName: 'my-super-db',
}).then(() => {
  console.log('Connection established');
}).catch((e)=>{
  console.log('Connection error: ', e);
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




