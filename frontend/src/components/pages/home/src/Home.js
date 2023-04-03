import './Home.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import firstimg from './1картинка.svg';
import secondimg from "./Character_1_.svg"
import Helmet from "react-helmet";

class Home extends React.Component {
    render() {
        return(
            <div class="home">
                <Helmet title="AlgoMath"/>
            <div className="main_content first_block">
                <div className="main_content_img first_block_img">
                    <img src={firstimg}/>
                </div>
                <div className="main_content_text fist_block_text">
                    <h3>Лабораторные работы</h3>
                    <p>Быстро. Качественно. Легко.</p>
                    <a href="/singin">Заказать ></a>
                </div>
            </div>
            <hr/>
            <div className="main_content second_block">
                <div className="main_content_img second_block_img">
                    <img src={secondimg}/>
                </div>
                <div className="main_content_text second_block_text">
                    <h3>Консультации</h3>
                    <p>Часовая консультация со специалистом.</p>
                    <a href="/singin">Заказать ></a>
                </div>
            </div>
                </div>
    );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home/>);

export default Home;

