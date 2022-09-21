import React from 'react';
import logo from '../../assets/img/logo.svg';
//import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button class="button" id="filter-button">
          Censor Page
        </button>
      </header>
    </div>
  );
};

export default Popup;
