import React from 'react';
//import './App.css';
import Header from './components/universal/header/src/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/home/src/Home';
import Singin from './components/pages/singin/src/Singin';
import Singup from './components/pages/singup/src/Singup';
import Userprofile from './components/pages/userprofile/src/Userprofile';
import NotFound from "./components/pages/notfound/src/NotFound";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/singin' element={<Singin/>} />
                <Route path='/singup' element={<Singup/>} />
                <Route path='/profile' element={<Userprofile/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    );
}

export default App;