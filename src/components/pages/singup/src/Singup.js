import './Singup.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import validator from 'validator';
import Helmet from "react-helmet";
import Error from "../../../universal/errors/src/Erros";
import isEmpty from "validator/es/lib/isEmpty";

class Singup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConf:"",
            usernameError: "",
            emailError: "",
            passwordError: "",
            passwordConfError:"",

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

    onNameBlur() {
        if (isEmpty(this.state.username)) {
            this.setState({usernameError: "Поле не может быть пустым"});
        } else {
            this.setState({usernameError: ""});
        }
        console.log(isEmpty(this.state.username))
    }

    onEmailBlur() {
        if (isEmpty(this.state.email)) {
            this.setState({emailError: "Поле не может быть пустым"});
        } else if (!validator.isEmail(this.state.email)) {
            this.setState({emailError: "Некорректный Email"});
        } else {
            this.setState({emailError: ""});
        }
    }

    onPassBlur() {
        if (isEmpty(this.state.password)) {
            this.setState({passwordError: "Поле не может быть пустым"});
        } else if (!validator.isStrongPassword(this.state.password, {minlength: 8})) {
            this.setState({passwordError: "Пароль должен состоять из 8 символов, содержать специальные знаки, цифры, заглавные и прописные буквы"});
        } else {
            this.setState({passwordError: ""});
        }
    }

    onPassConfBlur(){
        if(this.state.password !== this.state.passwordConf){
            this.setState({passwordConfError:"Пароли не совпадают"});
        }else{
            this.setState({passwordConfError:""});
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
                </form>
                <p>Уже есть аккаунт ? <a href='/login'>Войти</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Singup/>);

export default Singup;

