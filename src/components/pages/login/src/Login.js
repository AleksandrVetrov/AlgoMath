import './Login.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Helmet from "react-helmet";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.submitCheckIn = this.submitCheckIn.bind(this);
    }

    submitCheckIn(event){
        alert("Успешно");
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
        event.preventDefault();
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
                    />
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Пароль"
                        value={this.state.password1}
                        onChange={this.onPassChange}
                    />

                    <button type="submit">Войти</button>
                </form>
                <p>Забыли <a href='#'>Имя пользователя?</a><span>/</span><a href="#">Пароль?</a></p>
                <p>Нет аккаунта? <a href='/singup'>Зарегистрируйтесь</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Login/>);

export default Login;

