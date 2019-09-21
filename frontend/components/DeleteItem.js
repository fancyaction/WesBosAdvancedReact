import React, { Component } from 'react'

export default class DeleteItem extends Component {
    render() {
        const { label } = this.props;
        return (
            <button>
                {label}
            </button>
        )
    }
}
