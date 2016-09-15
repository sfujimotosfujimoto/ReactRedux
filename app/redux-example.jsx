import redux, {createStore, subscribe, compose, combineReducers} from 'redux';
import axios from 'axios';
console.log('Starting redux example');

//-- DEFAULT STATE ------
let stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: [],
  isFetching: false,
  url: ''
}
let nextHobbyId = 1;
let nextMovieId = 1;

//-- REDUCER ------

let nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name
    default:
      return state;
  }
};

//-- Action Generator ------
let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  }
}

let hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
          ...state,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  }
};

//-- Action Generator ------
let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
}

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

let moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id)
    default:
      return state;
  }
};

//-- Action Generator ------
let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
}

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

//-- Map Reducer and Action Generators ------
const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      }
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      }
    default:
      return state;
  }
}

//-- Action Generator ------
let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function (res) {
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
}

const reducer = combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer,
  map: mapReducer
})


//-- STORE ------
const store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


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

fetchLocation();

store.dispatch(changeName('Andrew'));

store.dispatch(addHobby('Running'));

store.dispatch(addHobby('Walking'));
store.dispatch(removeHobby(2));

store.dispatch(addMovie('Mad Max', 'Action'));
store.dispatch(addMovie('Star Wars', 'Action'));
store.dispatch(removeMovie(1));
