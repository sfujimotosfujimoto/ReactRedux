import redux, {createStore, subscribe, compose, combineReducers} from 'redux';

console.log('Starting redux example');

import * as actions from './actions/index';
import configureStore from './store/configureStore';

const store = configureStore();

//-- DEFAULT STATE ------
let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: [],
  isFetching: false,
  url: ''
}

//-- SUBSCRIBE ------
let unsubscribe = store.subscribe(() => {
  let state = store.getState();


  console.log('New state', store.getState());

  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url +  '" target="_blank">View Your Location</a>'
  }
})
// unsubscribe();


const currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Andrew'));

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.addHobby('Walking'));
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.addMovie('Mad Max', 'Action'));
store.dispatch(actions.addMovie('Star Wars', 'Action'));
store.dispatch(actions.removeMovie(1));
