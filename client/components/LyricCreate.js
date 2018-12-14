import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const mutation = gql`
    mutation AddLyric($content: String, $songId:ID) {
    addLyricToSong(content: $content, songId: $songId) {
        id
        lyrics {
            content
        }
    }
}`;

class LyricCreate extends Component {

    constructor(props) {
        super(props);

        this.state = { content: "" };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const target = e.target;
        this.setState({content: target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        });

        this.setState({content: ""});

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Add a lyric</label>
                <input 
                    value={this.state.content}
                    onChange={this.onChange} />
            </form>
        )
    }
}

export default graphql(mutation)(LyricCreate);