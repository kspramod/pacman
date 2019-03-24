import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import Container from 'react-bootstrap/Container'

import ViewComponent from './ViewComponent'
import InputHandler from './InputHandler'

import store from '../store'

const Root = () => (
  <Provider store={store}>
    <Container style={{ marginTop: '1rem' }}>
      <ViewComponent />
      <InputHandler />
    </Container>
  </Provider>
)

export default hot(module)(Root)
