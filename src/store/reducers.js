import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import account from 'routes/Account/modules/account'
import searchReducer from 'routes/Library/routes/Search/modules/search'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    account,
    search: searchReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
