import React, { Component } from "react";

class LyricList extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { lyrics } = this.props;
        console.log(this.props);

        if (!lyrics) {
            return <div>Fetching lyrics...</div>
        }

        return (
            <ul className="collection">
                {lyrics.map( ({id, content}) => (
                    <li 
                        className="collection-item"
                        key={id}
                    >
                        {content}
                    </li>
                ))}                
            </ul>
        )
    }
}

export default LyricList;