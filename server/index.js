const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { connection } = mongoose;

const DB_URL = 'mongodb://mongoeva:27017/my-super-db';


mongoose.connect(DB_URL, { useNewUrlParser: true });
connection.on('error', (e) => {
  console.error('Error: ', e);
  throw new Error('Db connection failed');
});
connection.once('open', () => {
  // eslint-disable-next-line
  console.log('Connection established');
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




