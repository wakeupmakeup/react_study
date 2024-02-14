import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//밑에 <App />을 지우면 아무것도 나오지 않는다.
//밑에 있는 앱 테그는 위에 있는 곳에서 나온다.
// .은 현재 디렉토리를 가르키며 /App은 현재 디렉토리에 있는 App.js를 가르킨다.
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
