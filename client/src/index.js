import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './styles/global.css';
import './styles/new.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Provider>
            <App />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root'));
