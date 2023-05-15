import './Header.css';
import React from 'react';
import logo from './AlgoMath_БЧ (1).svg'
import {withTranslation,} from "react-i18next";
import i18n, {changeLanguage, t} from 'i18next';
import Lib from "../../lib/Lib";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.changeLanguageRu = this.changeLanguageRu.bind(this);
        this.changeLanguageEn = this.changeLanguageEn.bind(this);}
    changeLanguageRu(){

        i18n.changeLanguage('ru');
    }
    changeLanguageEn(){
        i18n.changeLanguage('en');
    }

    render() {
        return (
            <div class="header">
            <div class="header_nav">
                <ul className="nav">
                        <li className="nav-item"><a className="nav-link" href="/singin">{this.props.t('header.nav_about')}</a></li>
                </ul>
                <div className="logo_header">
                    <a href="/"><img src={logo}/></a>
                </div>
                <ul className="nav">
                        <li className="nav-item"><a className="nav-link" href={'/profile/' + Lib.generateURL(10)} >{this.props.t('header.nav_profile')}</a></li>
                </ul>
            </div>
                <div class="headers_button">
                <button onClick={this.changeLanguageRu}>Ru</button>
                <button onClick={this.changeLanguageEn}>En</button>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Header);

