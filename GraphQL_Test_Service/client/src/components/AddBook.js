import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
	constructor (props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorID: ''
		};
	}
	displayAuthors () {
		let data = this.props.data;
		if (data.loading) {
			return ( <option>Loading authors...</option> );
		} else {
			return data.authors.map(author => {
				return ( <option key={ author.id } value={ author.id }>{ author.name }</option> );
			});
		}
	}
	submitForm (event) {
		event.preventDefault();
		console.log(this.state);
	}
	render() {
		return (
			<form id="add-book" onSubmit={ this.submitForm.bind(this) }>
				<div className="field">
					<label>Book name:</label>
					<input type="text" onChange={ (event) => { this.setState({ name: event.target.value }) } }/>
				</div>
				<div className="field">
					<label>Genre:</label>
					<input type="text" onChange={ (event) => { this.setState({ genre: event.target.value }) } }/>
				</div>
				<div className="field">
					<label>Author:</label>
					<select onChange={ (event) => { this.setState({ authorID: event.target.value }) } }>
						<option>Select author</option>
						{ this.displayAuthors() }
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
}

export default graphql(getAuthorsQuery)(AddBook);
