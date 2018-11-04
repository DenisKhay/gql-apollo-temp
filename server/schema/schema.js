const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent) {
          return Book.find({ authorId: parent.id });
        },
      },
    };
  },
});
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return Author.findById(parent.authorId);
        },
      },
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
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, { name, age }) {
        return new Author({
          name,
          age,
        }).save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        authorId: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, { authorId, name, genre }) {
        return new Book({
          authorId,
          name,
          genre,
        }).save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

const createContent = async () => {
  let author = await new Author({
    name: 'Arthur Conan Doile',
    age: 50,
  }).save();

  new Book({
    name: 'Book first of Arh CD',
    genre: 'detective',
    authorId: author.id,
  }).save();

  new Book({
    name: 'Book second of ACD',
    genre: 'detective',
    authorId: author.id,
  }).save();

  new Book({
    name: 'Book third of Arthur Conan Doil',
    genre: 'detective',
    authorId: author.id,
  }).save();

  author = await new Author({
    name: 'Leo Tolstoy',
    age: 45,
  }).save();

  new Book({
    name: 'War and Peace',
    genre: 'Drama',
    authorId: author.id,
  }).save();

  new Book({
    name: 'Second one of Leo',
    genre: 'drama',
    authorId: author.id,
  }).save();

  new Book({
    name: 'Third one of Leo',
    genre: 'drama',
    authorId: author.id,
  }).save();

};
//createContent();