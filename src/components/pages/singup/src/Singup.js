import './Singup.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import validator from 'validator';
import Helmet from "react-helmet";
import Error from "../../../universal/errors/src/Erros";

class Singup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
            usernameError:""
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onPassConfChange = this.onPassConfChange.bind(this);
        this.submitCheckIn = this.submitCheckIn.bind(this);
        this.onNameBlur = this.onNameBlur.bind(this);
    }

    submitCheckIn(event) {
        // if (!validator.isEmail(this.state.email)) {
        //     alert("Вы не ввели почту")
        // } /*else if (!validator.isStrongPassword(this.state.password1, {minlength: 8})) {
        //     alert("Длина пароля не менее 8 символов.Пароль должен содержать строчные,прописные буквы и цифры")
        // }*/ else if (this.state.password1 !== this.state.password2) {
        //     alert("Пароли не совпадают")
        // } else {
        //     alert("Успешно");
        //     console.log(JSON.stringify({
        //             "username": this.state.username,
        //             "email": this.state.email,
        //             "password": this.state.password1
        //         }));
        //     fetch('https://run.mocky.io/v3/dd811ae1-cd0a-4b27-b815-1012aea4502d')
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (data) {
        //             alert("Ответ сервера:"+data.message);
        //             console.log("data", data.message)
        //         })
        // }
        event.preventDefault();
    }

    onNameBlur(){
        if(this.state.username === ""){
            this.setState({usernameError:"Имя пользователя не может быть пустым"})
        }else{
            this.setState({usernameError:""})
        }
    }

    onNameChange(event) {
        this.setState({username: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onPassChange(event) {
        this.setState({password1: event.target.value});
    }

    onPassConfChange(event) {
        this.setState({password2: event.target.value});
    }

    render() {
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
                    />
                    <Error errorMessage={this.state.usernameError}/>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        value={this.state.password1}
                        onChange={this.onPassChange}
                    />
                     <input
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Подтвердите пароль"
                        value={this.state.password2}
                        onChange={this.onPassConfChange}
                    />
                    <button type="submit">Отправить</button>
                </form>
                <p>Уже есть аккаунт ? <a href='/login'>Войти</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Singup/>);

export default Singup;

