import './Header.css';

import React from 'react';
import logo from './AlgoMath_БЧ (1).svg'

class Header extends React.Component {
    render() {
        return (
            <div class="header">
                <ul className="nav">
                    <li className="nav-item"><a className="nav-link" href="/singin">О нас</a></li>
                </ul>
                <div className="logo_header">
                    <a href="/"><img src={logo}/></a>
                </div>
                <ul className="nav">
                    <li className="nav-item"><a className="nav-link" href="/profile">Мой аккаунт</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;

