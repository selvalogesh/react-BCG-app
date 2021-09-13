import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header'
import Footer from './components/Footer'
import Body from './components/Body'

import { AppContext } from "./libs";

function App() {
  let [isAuthenticated, userHasAuthenticated] = useState(false);
  let [userData, setUserData] = useState(null);
  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, userData, setUserData }}>
        <Header />
        <Body />
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
