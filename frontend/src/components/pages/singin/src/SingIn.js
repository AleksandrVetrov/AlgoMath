import './Singin.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from "react-helmet";
import isEmpty from "validator/es/lib/isEmpty";
import Error from "../../../universal/errors/src/Erros";
import Success from "../../../universal/success/src/Success"
import {Navigate} from "react-router-dom";
import Lib from "../../../universal/lib/Lib"

class SingIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: "",
            successMessage: "",
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.submitSingIn = this.submitSingIn.bind(this);
        this.onNameBlur = this.onNameBlur.bind(this);
        this.onPassBlur = this.onPassBlur.bind(this);
    }

    submitSingIn(event) {
        if (this.checkData() && this.checkErrors()) {
            try {
                const response = fetch("http://localhost:8080/api/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify({
                        "username": this.state.username,
                        "password": this.state.password,
                    })
                });
                console.log('Успех:', JSON.stringify(response));
                this.setState({successMessage: "Успех"});
                setTimeout(() => {
                    this.setState({successMessage: ""})
                }, 1000);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        event.preventDefault();
    }

    checkData() {
        return !(isEmpty(this.state.username.trim()) ||
            isEmpty(this.state.password.trim()));
    }

    checkErrors() {
        return isEmpty(this.state.usernameError.trim()) &&
            isEmpty(this.state.passwordError.trim());
    }

    onNameBlur() {
        if (isEmpty(this.state.username.trim())) {
            this.setState({usernameError: "Поле не может быть пустым"});
        } else {
            this.setState({usernameError: ""});
        }
    }

    onPassBlur() {
        if (isEmpty(this.state.password.trim())) {
            this.setState({passwordError: "Поле не может быть пустым"});
        } else {
            this.setState({passwordError: ""});
        }
    }

    onNameChange(event) {
        this.setState({username: event.target.value});
    }


    onPassChange(event) {
        this.setState({password: event.target.value});
    }


    render() {
        if(this.state.successMessage) return <Navigate to={'/profile/' + Lib.generateURL(10)}/>
        return (
            <div class="form">
                <Helmet title="Вход в систему"/>
                <h2>Вход в систему</h2>
                <form onSubmit={this.submitSingIn}>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Имя пользователя"
                        value={this.state.username}
                        onChange={this.onNameChange}
                        onBlur={this.onNameBlur}
                        autoComplete="off"
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
                    <Error errorMessage={this.state.passwordError}/>
                    <button type="submit">Войти</button>
                    <Success successMessage={this.state.successMessage}/>
                </form>
                <p>Забыли <a href='#'>Имя пользователя?</a><span>/</span><a href="#">Пароль?</a></p>
                <p>Нет аккаунта? <a href='/singup'>Зарегистрируйтесь</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SingIn/>);

export default SingIn;

