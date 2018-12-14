import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
        id
        title
        }
    }
`;

class SongCreate extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;

        this.setState({title: target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        })
        .then(() => hashHistory.push("/"));
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default graphql(mutation)(SongCreate);