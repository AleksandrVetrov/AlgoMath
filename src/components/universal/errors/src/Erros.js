import './Error.css';

import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage:props.errorMessage
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState === this.state) {
            this.setState({errorMessage: this.props.errorMessage})
        }
    }
    render() {
        return (
            <div class="error">
                <p>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default Header;

