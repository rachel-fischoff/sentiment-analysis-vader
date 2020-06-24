import {combineReducers} from 'redux'
import searchBarReducer from './reducer_search_twitter'
import textReducer from './reducer_text'


const rootReducer = combineReducers({
  search: searchBarReducer,
  text: textReducer
});

export default rootReducer;