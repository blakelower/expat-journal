import {combineReducers} from 'redux';
import {postsReducer} from './postReducer';
import {authReducer} from './authReducer';

export default combineReducers({
    postsReducer,
    authReducer
})