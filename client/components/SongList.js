import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs"

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables: {
                id
            },
        })
        .then(() => this.props.data.refetch());
    }

    renderSongs() {
        const {data} = this.props;
        const {loading, songs} = data;

        if (loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <ul className="collection">
                    { 
                        songs.map( ({id, title}) => (
                            <li key={id} className="collection-item">
                                <Link to={`songs/${id}`}>
                                    {title}
                                </Link>
                                <i 
                                    className="material-icons"
                                    onClick={() => this.onSongDelete(id)}>delete</i>
                            </li>
                        )) 
                    }
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }

    render() {
        return this.renderSongs();
    }
}

export default graphql(mutation)(
    graphql(query)(SongList)
);