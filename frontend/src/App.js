import React from 'react';
import Header from './components/universal/header/src/Header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/home/src/Home';
import SingIn from './components/pages/singin/src/SingIn';
import SingUp from './components/pages/singup/src/SingUp';
import Userprofile from './components/pages/userprofile/src/Userprofile';
import NotFound from "./components/pages/notfound/src/NotFound";
import UpLoad from "./components/pages/upload/UpLoad";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/singin' element={<SingIn/>} />
                <Route path='/singup' element={<SingUp/>} />
                <Route path='/upload' element={<UpLoad/>}/>
                <Route path='/profile'>
                    <Route path=":id" element={<Userprofile/>}/>
                </Route>
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    );
}

export default App;