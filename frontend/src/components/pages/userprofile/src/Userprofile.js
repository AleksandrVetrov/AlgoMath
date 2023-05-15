import './Profile.css';
import Helmet from "react-helmet"
import React from 'react';
import validator from 'validator';
import Orders from './Orders'
import {useTranslation, withTranslation} from "react-i18next";

class Userprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            vkLink: "",
            tgLink: "",
            showOrders: false,

        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onVkLinkChange = this.onVkLinkChange.bind(this);
        this.onTgLinkChange = this.onTgLinkChange.bind(this);
        this.handleFormClick = this.handleFormClick.bind(this);
        this.handleOrdersClick = this.handleOrdersClick.bind(this);
    }

    onNameChange(event) {
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onVkLinkChange(event) {
        this.setState({vkLink: event.target.value});
    }

    onTgLinkChange(event) {
        this.setState({tgLink: event.target.value});
    }

    handleOrdersClick(event) {
        this.setState({showOrders: true})
    }

    handleFormClick(event) {
        this.setState({showOrders: false})
    }

    render() {
        const showOrders = this.state.showOrders;
        return (
            <div class="app">
                <Helmet title="Профиль"/>
                <div className="profile_buttons">
                    <button id="data" onClick={this.handleFormClick}>{this.props.t('profile.my_data_button')}</button>
                    <button id="orders" onClick={this.handleOrdersClick}>{this.props.t('profile.my_orders_button')}</button>
                </div>
                <Profile showOrders={showOrders}></Profile>
            </div>
        )
    }
}

function Profile(props) {
    const showOrders = props.showOrders;
    if (showOrders) {
        return <ShowOrders/>;
    } else {
        return <ShowForm/>
    }
}

function ShowForm(props) {
    const {t} = useTranslation();
    return (
        <div class="form">
            <h2>{t('profile.title')}</h2>
            <form>
                <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder={t('profile.username_placeholder')}
                    value={props.username}
                    onChange={props.onNameChange}
                    disabled="True"
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('profile.email_placeholder')}
                    value={props.email}
                    onChange={props.onEmailChange}
                />
                <input
                    type="text"
                    id="vklink"
                    name="vklink"
                    placeholder={t('profile.vk_link_placeholder')}
                    value={props.vkLink}
                    onChange={props.onVkLinkChange}
                />
                <input
                    type="text"
                    id="tglink"
                    name="tglink"
                    placeholder={t('profile.tg_link_placeholder')}
                    value={props.tgLink}
                    onChange={props.onTgLinkChange}
                />
                <button type="submit">{t('profile.button')}</button>
            </form>
            <a href='#'>{t('profile.changepass_link')}</a>
        </div>
    );
}

function ShowOrders(props) {
    return (<Orders/>);
}


export default withTranslation()(Userprofile);

