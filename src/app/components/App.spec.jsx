/* global describe test expect */

import React from 'react'
import { shallow } from 'enzyme'

import AppComponent from './App'

describe('App Component', () => {
  test('Snapshot test', () => {
    const component = shallow(<AppComponent />)
    expect(component).toMatchSnapshot()
  })
})
