const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const { connection } = mongoose;


const app = express();

mongoose.connect('mongodb://localhost:27017/my-super-db', { useNewUrlParser: true });
connection.on('error', (e) => {
  console.error('Connection error: ', e);
});
connection.once('open', () => {
  console.log('Connection established');
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log('now listening for requests on 4000');
});




