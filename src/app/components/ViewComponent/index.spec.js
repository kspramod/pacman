/* global describe test expect */

import { mapStateToProps } from './index'

describe('View Grid Defualt export', () => {
  test('mapStateToProps no value', () => {
    expect(mapStateToProps({})).toEqual({
      packmanIndex: '0-0',
      face: 0
    })
  })

  test('mapStateToProps with state value', () => {
    const packmanState = {
      xAxis: 2,
      yAxis: 4,
      face: 3
    }
    expect(mapStateToProps({ packmanState })).toEqual({
      packmanIndex: '4-2',
      face: 3
    })
  })
})
