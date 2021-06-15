import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './lang/i18n';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root__wrapper')
);



