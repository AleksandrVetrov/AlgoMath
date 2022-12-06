import './App.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import validator from 'validator';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            vkLink: "",
            tgLink: "",
            orders: [],
            showOrders: true,

        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onVkLinkChange = this.onVkLinkChange.bind(this);
        this.onTgLinkChange = this.onTgLinkChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
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

    handleSaveClick(event) {
        if (!validator.isEmail(this.state.email)) {
            alert("Вы не ввели почту")
        } else {
            alert("Успешно")
        }
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
                <div className="profile_buttons">
                    <button id="data" onClick={this.handleFormClick}>Мои данные</button>
                    <button id="orders" onClick={this.handleOrdersClick}>Мои заказы</button>
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
    return (
        <div class="form">
            <h2>Добро пожаловать!</h2>
            <form onSubmit={props.handleSaveClick}>
                <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Имя пользователя"
                    value={props.username}
                    onChange={props.onNameChange}
                    disabled="True"
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={props.email}
                    onChange={props.onEmailChange}
                />
                <input
                    type="text"
                    id="vklink"
                    name="vklink"
                    placeholder="Ссылка на страницу VK"
                    value={props.vkLink}
                    onChange={props.onVkLinkChange}
                />
                <input
                    type="text"
                    id="tglink"
                    name="tglink"
                    placeholder="Ссылка на Telegram"
                    value={props.tgLink}
                    onChange={props.onTgLinkChange}
                />
                <button type="submit">Сохранить</button>
            </form>
            <a href='#'>Изменить пароль</a>
        </div>
    );
}

function ShowOrders(props) {
    return (
        <div>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
export default App;

