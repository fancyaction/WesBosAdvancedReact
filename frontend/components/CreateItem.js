import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';


const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
            id
        }
    }
`;


export default class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    };


    handleChange = ev => {
        const { name, type, value } = ev.target;
        const inputValue = 'number' === type ? parseFloat(value) : value;

        this.setState({ [name]: inputValue });
    };


    handleSubmit = createItem => async ev => {
        ev.preventDefault();
        const res = await createItem();

        Router.push({ pathname: '/item', query: { id: res.data.createItem.id } });
    };


    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error, called, data }) => (
                    <Form onSubmit={this.handleSubmit(createItem)}>
                        <ErrorMessage error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={this.state.title}
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
                                    value={this.state.price}
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
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}
