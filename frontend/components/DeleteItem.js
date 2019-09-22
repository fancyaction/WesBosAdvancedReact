import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`
export default class DeleteItem extends Component {
    handleClick = deleteItem => ev => {
        if (confirm('Are you sure you want to delete this item?')) {
            deleteItem();
        }
    }

    getRemainingItems = (deletedID, data) => {
        const { items } = data;
        const remainingItems = items.filter(item => item.id !== deletedID);

        return { ...data, items: remainingItems }
    }

    // Updates client-side cache to match server
    handleUpdate = (cache, payload) => {
        const allItemsData = cache.readQuery({ query: ALL_ITEMS_QUERY });
        const deletedID = payload.data.deleteItem.id;
        const data = this.getRemainingItems(deletedID, allItemsData);

        cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    }

    render() {
        const { label, id } = this.props;
        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id }} update={this.handleUpdate}>
                {(deleteItem, { error, loading }) => (
                    <button onClick={this.handleClick(deleteItem)}>
                        {label}
                    </button>
                )}
            </Mutation>
        )
    }
}
