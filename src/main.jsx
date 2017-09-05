import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import './common/assets/styles/bootstrap.css';
import './common/assets/styles/style.css';
import './common/assets/styles/main.scss';
import Routes from './shared/components/Routes';
import configureStore from './store/configureStore';

require.context('./static/images', true, /^.*/);

const store = configureStore();

injectTapEventPlugin();

ReactDOM.render(<Provider store={store}><Routes store={store} /></Provider>, document.getElementById('root'));
