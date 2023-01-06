import './Singin.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from "react-helmet";
import isEmpty from "validator/es/lib/isEmpty";
import Error from "../../../universal/errors/src/Erros";

class Singin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.submitSingIn = this.submitSingIn.bind(this);
        this.onNameBlur = this.onNameBlur.bind(this);
        this.onPassBlur = this.onPassBlur.bind(this);
    }

    submitSingIn(event) {
        if (this.checkData()) {
            console.log(JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            }));
            fetch('https://run.mocky.io/v3/61468e1f-587b-44d5-91cf-a1d3c0762b79')
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log("data", data)
                })
        }

        event.preventDefault();
    }

    checkData() {
        return !(isEmpty(this.state.username.trim()) ||
            isEmpty(this.state.password.trim()));
    }

    onNameBlur() {
        if (isEmpty(this.state.username.trim())) {
            this.setState({usernameError: "Поле не может быть пустым"});
        }
    }

    onPassBlur() {
        if (isEmpty(this.state.password.trim())) {
            this.setState({passwordError: "Поле не может быть пустым"});
        }
    }

    onNameChange(event) {
        this.setState({username: event.target.value});
    }


    onPassChange(event) {
        this.setState({password: event.target.value});
    }


    render() {
        return (
            <div class="form">
                <Helmet title="Вход в систему"/>
                <h2>Вход в систему</h2>
                <form onSubmit={this.submitCheckIn}>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Имя пользователя"
                        value={this.state.username}
                        onChange={this.onNameChange}
                        onBlur={this.onNameBlur}
                    />
                    <Error errorMessage={this.state.usernameError}/>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        value={this.state.password}
                        onChange={this.onPassChange}
                        onBlur={this.onPassBlur}
                    />
                    <Error errorMessage={this.state.usernameError}/>
                    <button type="submit">Войти</button>
                </form>
                <p>Забыли <a href='#'>Имя пользователя?</a><span>/</span><a href="#">Пароль?</a></p>
                <p>Нет аккаунта? <a href='/singup'>Зарегистрируйтесь</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Singin/>);

export default Singin;

