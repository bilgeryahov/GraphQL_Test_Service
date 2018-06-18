import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
	authors {
		name,
		id
	}
}
`;

const getBooksQuery = gql`
{
	books {
		name,
		id
	}
}
`;

export default {
	getAuthorsQuery,
	getBooksQuery
}