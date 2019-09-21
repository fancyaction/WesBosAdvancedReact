import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int

    ) {
        updateItem(id: $id, title: $title, description: $description, price: $price) {
            id
            title
            description
            price
        }
    }
`;

export default class UpdateItem extends Component {
    state = {};

    handleChange = ev => {
        const { name, type, value } = ev.target;
        const inputValue = 'number' === type ? parseFloat(value) : value;

        this.setState({ [name]: inputValue });
    };

    getFileData = files => {
        const data = new FormData();

        data.append('file', files[0]);
        data.append('upload_preset', 'sickfits');

        return data;
    }

    handleSubmit = updateItemMutation => async ev => {
        const { id } = this.props;

        ev.preventDefault();
        await updateItemMutation({
            variables: {
                id,
                ...this.state,
            }
        }).then(() => Router.push({ pathname: '/' }))


    };


    render() {
        const { id } = this.props;

        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
                {({ data, loading }) => {
                    if (loading) { return <p>Loading...</p> }
                    if (!data.item) { return <p>No item found for id: {id}</p> }
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (
                                <Form onSubmit={this.handleSubmit(updateItem)}>
                                    <ErrorMessage error={error} />
                                    <fieldset disabled={loading} aria-busy={loading}>
                                        <label htmlFor="title">
                                            Title
                                                <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Title"
                                                defaultValue={data.item.title}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="price">
                                            Price
                                        <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder={0}
                                                defaultValue={data.item.price}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <label htmlFor="description">
                                            Description
                                        <textarea
                                                id="description"
                                                name="description"
                                                placeholder="Enter a description"
                                                defaultValue={data.item.description}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </label>
                                        <button type="submit">{loading ? 'Saving' : 'Save'} Changes</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}
