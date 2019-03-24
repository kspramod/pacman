/* global describe test expect */

import
actionHandleReducer,
{
  placeAction,
  moveAction,
  changeDirectionClockwise,
  changeDirectionAntiClockwise
} from './index'
import { DIRECTION_MAP } from '../../utils/mapConstant'

const initialState = {
  xAxis: 0,
  yAxis: 0,
  face: 0
}

describe('Verify PacMan core logic', () => {
  test('test place packman action (0, 0, NORTH)', () => {
    const payload = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.NORTH }
    expect(actionHandleReducer(initialState, placeAction(payload))).toEqual({
      ...payload
    })
  })

  test('test place packman action (1, 2, EAST)', () => {
    const payload = { xAxis: 1, yAxis: 2, face: DIRECTION_MAP.EAST }
    expect(actionHandleReducer(initialState, placeAction(payload))).toEqual({
      ...payload
    })
  })

  test('Handle Overflow (5, 5, SOUTH)', () => {
    const payload = { xAxis: 5, yAxis: 5, face: DIRECTION_MAP.SOUTH }
    expect(actionHandleReducer(initialState, placeAction(payload))).toEqual({
      ...initialState,
      face: 2
    })
  })

  test('Move Action from (4,0,EAST)', () => {
    const state = { xAxis: 4, yAxis: 0, face: DIRECTION_MAP.EAST }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state
    })
  })

  test('Move Action from (4,0,WEST)', () => {
    const state = { xAxis: 4, yAxis: 0, face: DIRECTION_MAP.WEST }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state,
      xAxis: 3
    })
  })

  test('Move Action from (0,0,EAST)', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.EAST }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state,
      xAxis: 1
    })
  })

  test('Move Action from (0,4,NORTH)', () => {
    const state = { xAxis: 0, yAxis: 4, face: DIRECTION_MAP.NORTH }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state
    })
  })

  test('Move Action from (0,4,SOUTH)', () => {
    const state = { xAxis: 0, yAxis: 4, face: DIRECTION_MAP.SOUTH }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state,
      yAxis: 3
    })
  })

  test('Move Action from (0,0,NORTH)', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.NORTH }
    expect(actionHandleReducer(state, moveAction())).toEqual({
      ...state,
      yAxis: 1
    })
  })

  test('Change Direction ClockWise EAST + 1', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.EAST }
    expect(actionHandleReducer(state, changeDirectionClockwise())).toEqual({
      ...state,
      face: DIRECTION_MAP.SOUTH
    })
  })

  test('Change Direction ClockWise WEST + 1', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.WEST }
    expect(actionHandleReducer(state, changeDirectionClockwise())).toEqual({
      ...state,
      face: DIRECTION_MAP.NORTH
    })
  })

  test('Change Direction Anti-ClockWise SOUTH + 1', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.SOUTH }
    expect(actionHandleReducer(state, changeDirectionAntiClockwise())).toEqual({
      ...state,
      face: DIRECTION_MAP.EAST
    })
  })

  test('Change Direction Anti-ClockWise NORTH + 1', () => {
    const state = { xAxis: 0, yAxis: 0, face: DIRECTION_MAP.NORTH }
    expect(actionHandleReducer(state, changeDirectionAntiClockwise())).toEqual({
      ...state,
      face: DIRECTION_MAP.WEST
    })
  })
})
