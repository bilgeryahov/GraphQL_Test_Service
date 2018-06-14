const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve: (parent, args) => {

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

			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLInt } },
			resolve: (parent, args) => {

			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve: (parent, args) => {

			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve: (parent, args) => {

			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt }
			},
			resolve: (parent, args) => {
				let author = new Author({
					name: args.name,
					age: args.age
				});
				// The power of Mongoose... :P.
				return author.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});