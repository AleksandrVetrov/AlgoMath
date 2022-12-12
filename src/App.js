import React from 'react';
//import './App.css';
import Header from './components/universal/header/src/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/home/src/Home';
import Login from './components/pages/login/src/Login';
import Singup from './components/pages/singup/src/Singup';
import Userprofile from './components/pages/userprofile/src/Userprofile';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/singup' element={<Singup/>} />
                <Route path='/profile' element={<Userprofile/>} />
            </Routes>
        </Router>
    );
}

export default App;