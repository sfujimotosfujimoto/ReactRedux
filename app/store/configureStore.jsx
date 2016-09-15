import redux, {createStore, subscribe, compose, combineReducers, applyMiddleware} from 'redux';
import {nameReducer, hobbiesReducer, moviesReducer, mapReducer} from './../reducers/index';
var thunk = require('redux-thunk').default;

const reducer = combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
});

export default function configureStore() {
  return createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
