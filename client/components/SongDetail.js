import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {

    render() {
        console.log(this.props.data);
        const {data: { song } } = this.props;

        if (!song) {
            return <div>Loading...</div>
        }
        
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Song Detail</h3>
                <h5>{song.title}</h5>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
}

export default graphql(fetchSong, {
    options: (props) => { 
        return { 
            variables: { id: props.params.id } 
        } 
    } 
})(SongDetail);