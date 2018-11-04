const graphql = require('graphql');
const mongoose = require('mongoose');
const { connection, Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/my-super-db', { useNewUrlParser: true });

connection.on('error', (e) => {
  console.error('Connection error: ', e);
});
connection.once('open', () => {
  console.log('Connection established');
});

const bookSchema = new Schema({
  name: String,
  genre: String,
});

const Book = mongoose.model('book', bookSchema);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString }},
      resolve: (parent, args) => {
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        return Book.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});