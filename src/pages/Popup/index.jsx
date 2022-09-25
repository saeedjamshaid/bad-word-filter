import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { ApiClient } from "../../utils/api-client";

const apiClient = ApiClient.getInstance();

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();

const notify = document.getElementById( 'filter-button' );

notify.addEventListener( 'click', () => {
    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, callback);
} );

function callback(tabs) {
    var currentTab = tabs[0]; 
    apiClient.filterPage(currentTab.id, currentTab.url, true);
  }