import './Singup.css';

import React from 'react';
import {Navigate} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import validator from 'validator';
import Helmet from "react-helmet";
import Error from "../../../universal/errors/src/Erros";
import isEmpty from "validator/es/lib/isEmpty";
import Success from "../../../universal/success/src/Success"
import Lib from "../../../universal/lib/Lib";

class SingUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConf: "",
            usernameError: "",
            emailError: "",
            passwordError: "",
            passwordConfError: "",
            successMessage: "",

        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onPassConfChange = this.onPassConfChange.bind(this);
        this.submitCheckIn = this.submitCheckIn.bind(this);
        this.onNameBlur = this.onNameBlur.bind(this);
        this.onEmailBlur = this.onEmailBlur.bind(this);
        this.onPassBlur = this.onPassBlur.bind(this);
        this.onPassConfBlur = this.onPassConfBlur.bind(this);
    }

    submitCheckIn(event) {
        if (this.checkData() && this.checkErrors()) {
            try {
                const response = fetch("http://localhost:8080/api/auth/singup", {
                    method: 'POST',
                    body: JSON.stringify({
                        "username": this.state.username,
                        "email": this.state.email,
                        "password": this.state.password,
                    })
                }
                );
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
            isEmpty(this.state.email.trim()) ||
            isEmpty(this.state.password.trim()) ||
            isEmpty(this.state.passwordConf.trim()));
    }

    checkErrors() {
        return isEmpty(this.state.usernameError.trim()) &&
            isEmpty(this.state.emailError.trim()) &&
            isEmpty(this.state.passwordError.trim()) &&
            isEmpty(this.state.passwordConfError.trim());
    }


    onNameBlur() {
        if (isEmpty(this.state.username.trim())) {
            this.setState({usernameError: "Поле не может быть пустым"});
        } else {
            this.setState({usernameError: ""});
        }
    }

    onEmailBlur() {
        if (isEmpty(this.state.email.trim())) {
            this.setState({emailError: "Поле не может быть пустым"});
        } else if (!validator.isEmail(this.state.email)) {
            this.setState({emailError: "Некорректный Email"});
        } else {
            this.setState({emailError: ""});
        }
    }

    onPassBlur() {
        if (isEmpty(this.state.password.trim())) {
            this.setState({passwordError: "Поле не может быть пустым"});
        } else {
            this.setState({passwordError: ""});
        }
    }

    onPassConfBlur() {
        if (this.state.password !== this.state.passwordConf) {
            this.setState({passwordConfError: "Пароли не совпадают"});
        } else {
            this.setState({passwordConfError: ""});
        }
    }


    onNameChange(event) {
        this.setState({username: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onPassChange(event) {
        this.setState({password: event.target.value});
    }

    onPassConfChange(event) {
        this.setState({passwordConf: event.target.value});
    }

    render() {
        let url = Lib.generateURL(10);
        if(this.state.successMessage) return <Navigate to={'/profile/' + url}/>
        return (
            <div class="form">
                <Helmet title="Регистрация"/>
                <h2>Регистрация</h2>
                <form onSubmit={this.submitCheckIn}>
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
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        onBlur={this.onEmailBlur}
                    />
                    <Error errorMessage={this.state.emailError}/>
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
                    <input
                        type="password"
                        id="passwordConf"
                        name="passwordConf"
                        placeholder="Подтвердите пароль"
                        value={this.state.passwordConf}
                        onChange={this.onPassConfChange}
                        onBlur={this.onPassConfBlur}
                    />
                    <Error errorMessage={this.state.passwordConfError}/>
                    <button type="submit">Отправить</button>
                    <Success successMessage={this.state.successMessage}/>
                </form>
                <p>Уже есть аккаунт ? <a href='/singin'>Войти</a></p>

            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SingUp/>);


export default SingUp;

