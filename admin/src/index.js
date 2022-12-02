import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@ant-design/flowchart/dist/index.css"
import 'antd/dist/antd.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store,persistor} from './Redux/Store'
import {Provider}  from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
 
  document.getElementById('root')
);


reportWebVitals();
