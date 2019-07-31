import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
//podemos alterar o nome que importamos ex. reducer vira userReducer
import userReducer from './reducers/user'
import postsReducer from './reducers/posts';

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig