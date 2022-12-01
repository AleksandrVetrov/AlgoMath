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
            password1: "",
            password2: ""
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onPassConfChange = this.onPassConfChange.bind(this);
        this.submitCheckIn = this.submitCheckIn.bind(this);
    }

    submitCheckIn = event => {
        event.preventDefault();
        if (!validator.isEmail(this.state.email)) {
            alert("Вы не ввели почту")
        } else if (!validator.isStrongPassword(this.state.password1, {minlength: 8})) {
            alert("Длина пароля не менее 8 символов.Пароль должен содержать строчные,прописные буквы и цифры")
        } else if (this.state.password1 !== this.state.password2) {
            alert("Пароли не совпадают")
        } else {
            alert("Успешно")
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
                <h2>Регистрация</h2>
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
                <p>Уже есть аккаунт ? <a href='#'>Войти</a></p>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

export default App;

