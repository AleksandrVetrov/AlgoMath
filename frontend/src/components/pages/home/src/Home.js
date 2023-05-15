import './Home.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import firstimg from './1картинка.svg';
import secondimg from "./Character_1_.svg"
import Helmet from "react-helmet";
import {withTranslation,} from "react-i18next";


class Home extends React.Component {
    render() {
        return (
            <div class="home">
                <Helmet title="AlgoMath"/>
                <div className="main_content first_block">
                    <div className="main_content_img first_block_img">
                        <img src={firstimg}/>
                    </div>
                    <div className="main_content_text fist_block_text">
                        <h3>{this.props.t('home.home_title_one')}</h3>
                        <p>{this.props.t('home.home_text_one')}</p>
                        <a href="/singin">{this.props.t('home.home_order')} ></a>
                    </div>
                </div>
                <hr/>
                <div className="main_content second_block">
                    <div className="main_content_img second_block_img">
                        <img src={secondimg}/>
                    </div>
                    <div className="main_content_text second_block_text">
                        <h3>{this.props.t('home.home_title_two')}</h3>
                        <p>{this.props.t('home.home_text_two')}</p>
                        <a href="/singin">{this.props.t('home.home_order')} ></a>
                    </div>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home/>);

export default withTranslation()(Home);

