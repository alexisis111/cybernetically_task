import React from 'react';
import ReactDOM from 'react-dom/client'; // Исправлено здесь
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './Store';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>);
