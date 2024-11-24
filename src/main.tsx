import React from 'react';
import ReactDOM from 'react-dom/client';

import {config} from '@constants/config';
import {Http} from '@services/http.service';

import App from './App.tsx';
import './assets/styles/main.scss';

new Http(config.BASE_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
