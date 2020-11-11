import Axios from 'axios';
import React, { useEffect } from 'react';
import {Route, Link} from 'react-router-dom'
import './App.css';
import Login from './components/Login'

function App() {
  useEffect(() => {
    Axios
    .get("http://localhost:5000/api/friends")
    .then(res => console.log(res))
    .catch(err => console.dir(err))
  }, []);
  return (
    <div className="App">
      <Link to ="/login">Log In</Link>
      <Route path="/login"><Login /></Route>
    </div>
  );
}

export default App;
