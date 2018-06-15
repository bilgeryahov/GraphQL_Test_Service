const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();

// Allow Cross-Origin-Resource-Sharing...
app.use(cors());

// Connect to MLab DataBase.
mongoose.connect('mongodb://test_user:test_user123@ds163119.mlab.com:63119/graphql_test_service')
	.then((data) => console.log(data))
	.catch((err) => console.error(err));

mongoose.connection.once('open', () => {
	console.log('Connected to DataBase...');
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Server listening for requests on PORT 4000...');
});