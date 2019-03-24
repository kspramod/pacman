/* global describe test expect */

import
todoDataReducer,
{
  addTask,
  updateTask,
  deleteTask
} from './index'

const initialState = { tasks: [] }

describe('Verify Todo Reducer', () => {
  test('test add task reducer for initial value', () => {
    const payload = { name: 'dummy' }
    expect(todoDataReducer(initialState, addTask(payload))).toEqual({
      tasks: [{
        ...payload,
        id: 0
      }]
    })
  })

  test('test add task reducer for nth value', () => {
    const payload = { name: 'dummy' }
    const state = { tasks: [1, 2, 3] }
    expect(todoDataReducer(state, addTask(payload))).toEqual({
      tasks: [
        1, 2, 3,
        {
          ...payload,
          id: 3
        }
      ]
    })
  })

  test('test update task reducer', () => {
    const payload = { name: 'dummy', id: 2 }
    const state = { tasks: [1, 2, 3, 4] }
    expect(todoDataReducer(state, updateTask(payload))).toEqual({
      tasks: [
        1, 2,
        { ...payload },
        4
      ]
    })
  })

  test('test delete task reducer', () => {
    const payload = 1
    const state = {
      tasks: [
        { id: 0, name: 0 },
        { id: 1, name: 1 },
        { id: 2, name: 2 }
      ]
    }
    expect(todoDataReducer(state, deleteTask(payload))).toEqual({
      tasks: [
        { id: 0, name: 0 },
        { id: 1, name: 2 }
      ]
    })
  })
})
