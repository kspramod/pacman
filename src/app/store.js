import { createStore } from 'redux'

import reducers from './reducers'
import { environment } from '../environment'

let store = createStore(reducers)

if (!environment.production) {
  /* eslint-disable no-underscore-dangle */
  store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  /* eslint-enable */
}

const wrappedStore = store

export default wrappedStore
