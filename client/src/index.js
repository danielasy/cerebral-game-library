import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import GameList from './components/GameList';

const store = configureStore();

render(
  <Provider store={store}>
    <GameList />
  </Provider>,
  document.getElementById('root')
);
