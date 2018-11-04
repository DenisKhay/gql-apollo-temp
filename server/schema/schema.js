const graphql = require('graphql');
const mongoose = require('mongoose');
const { connection, Schema } = mongoose;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;

mongoose.connect('mongodb://localhost:27017/my-super-db',
  { useNewUrlParser: true });
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
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
    };
  },
});

const authorSchema = new Schema({
  name: String,
  age: String,
});
const Author = mongoose.model('author', authorSchema);
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLInt },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve: (parent, args) => {
        return Book.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});