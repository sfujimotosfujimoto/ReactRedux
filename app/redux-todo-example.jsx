import redux, {createStore} from 'redux';

console.log('Starting redux example');

const stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
}

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

const store = createStore(reducer);

const currentState = store.getState();
console.log('currentState', currentState);

const action = {
  type: 'CHANGE_SEARCHTEXT',
  searchText: 'Demo'
}

store.dispatch(action);

console.log('searchText should be Demo', store.getState());
