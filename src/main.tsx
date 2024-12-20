import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import {config} from '@constants/config';
import {Http} from '@services/http.service';
import appStore from '@store/index';
import '@assets/styles/main.css';

import App from './App.tsx';

new Http(config.BASE_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
