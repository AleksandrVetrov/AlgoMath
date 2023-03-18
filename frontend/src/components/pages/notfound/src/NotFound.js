import './NotFound.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from "react-helmet";

class NotFound extends React.Component {
    render() {
        return(
            <div class="notfound">
                <Helmet title="Not Found"/>
                <p class="text">Страница не найдена</p>
                <p class="code">404</p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NotFound/>);

export default NotFound;

