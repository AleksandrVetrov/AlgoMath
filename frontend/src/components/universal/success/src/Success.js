import './Success.css';

import React from 'react';

class Success extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            successMessage: props.successMessage
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState === this.state) {
            this.setState({successMessage: this.props.successMessage})
        }
    }

    render() {
        return (
            <div class="success">
                <p id="success">{this.state.successMessage}</p>
            </div>
        );
    }
}
export default Success;