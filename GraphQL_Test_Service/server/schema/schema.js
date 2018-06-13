const graphql = require('graphql');
const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema
} = graphql;

// Dummy data, until MongoDB is initialized.
const books = [
	{ name: 'Name of the Wind', genre: 'Fantasy', id: 1, authorID: 1 },
	{ name: 'The Final Empire', genre: 'Fantasy', id: 2, authorID: 2 },
	{ name: 'The Long Earth', genre: 'Sci-Fi', id: 3, authorID: 3 },
	{ name: 'The Hero of Ages', genre: 'Fantasy', id: 4, authorID: 2 },
	{ name: 'The Colour of Magic', genre: 'Fantasy', id: 5, authorID: 3 },
	{ name: 'The Light Fantastic', genre: 'Fantasy', id: 6, authorID: 3 }
];

const authors = [
	{ name: 'Patrick Rothfuss', age: 44, id: 1 },
	{ name: 'Brandon Sanderson', age: 42, id: 2 },
	{ name: 'Terry Pratchett', age: 66, id: 3 }
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (parent, args) => {
				return _.find(authors, { id: parent.authorID});
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {
				return _.filter(books, { authorID: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLInt } },
			resolve: (parent, args) => {
				// Code to get data from db/other source.
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLInt } },
			resolve: (parent, args) => {
				// Code to get data from db/other source.
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});