import redux, {createStore, subscribe, compose} from 'redux';

console.log('Starting redux example');

const stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}

//-- REDUCER ------
const reducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};
  switch (action.type) {
    case 'CHANGE_SEARCHTEXT':
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state;
  }

};
//-- STORE ------
const store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

//-- SUBSCRIBE ------
let unsubscribe = store.subscribe(() => {
  let state = store.getState();

  console.log('searchText is ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
})
// unsubscribe();


const currentState = store.getState();
console.log('currentState', currentState);


//-- DISPATCH ACTIONS ------
store.dispatch({
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'Demo'
});

store.dispatch({
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'Work'
});

store.dispatch({
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'Play'
});
