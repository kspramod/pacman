/* global describe test expect jest */

import { mapStateToProps, mapDispatchToProps } from './index'
import * as TodoReducer from '../../reducers/todoReducer'

TodoReducer.deleteTask = jest.fn()
TodoReducer.updateTask = jest.fn()

describe('View Tasks Defualt export', () => {
  test('mapStateToProps no value', () => {
    expect(mapStateToProps({})).toEqual({
      showList: false,
      completedCount: 0,
      tasks: []
    })
  })

  test('mapStateToProps with tasks value', () => {
    const tasks = [{
      name: 'Test',
      highPriority: false,
      completed: true,
      id: 0
    }]
    expect(mapStateToProps({
      todoData: { tasks }
    })).toEqual({
      showList: true,
      completedCount: 1,
      tasks
    })
  })

  test('should call reducer action for update task', () => {
    const dispatch = jest.fn()
    const requestParam = { name: 'test', id: 0 }
    const dispatchToProps = mapDispatchToProps(dispatch)
    dispatchToProps.updateTaskById(requestParam)
    expect(dispatch).toHaveBeenCalled()
    expect(TodoReducer.updateTask).toHaveBeenCalledWith(requestParam)
  })

  test('should call reducer action for delete task', () => {
    const dispatch = jest.fn()
    const requestParam = 1
    const dispatchToProps = mapDispatchToProps(dispatch)
    dispatchToProps.deleteTaskById(requestParam)
    expect(dispatch).toHaveBeenCalled()
    expect(TodoReducer.deleteTask).toHaveBeenCalledWith(requestParam)
  })
})
