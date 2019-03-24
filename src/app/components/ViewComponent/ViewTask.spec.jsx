/* global describe test expect beforeAll jest */

import React from 'react'
import { shallow } from 'enzyme'

import ViewTasksComponent from './ViewTask'

describe('Test for View Tasks Component', () => {
  let component
  const propValues = {
    showList: true,
    tasks: [{
      name: 'test',
      completed: false,
      highPriority: false,
      id: 0,
      key: 0
    }],
    completedCount: 0,
    deleteTaskById: jest.fn(),
    updateTaskById: jest.fn(),
    history: { push: jest.fn() }
  }

  beforeAll(() => {
    component = shallow(<ViewTasksComponent {...propValues} />)
  })

  test('Check snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  test('Add Action', () => {
    component.find('[data-test-id="add-action"]').simulate('click')
    expect(propValues.history.push).toHaveBeenCalledWith('/task/add')
  })

  test('Update Action', () => {
    component.find('[data-test-id="update-action-0"]').simulate('click')
    expect(propValues.history.push).toHaveBeenCalledWith('/task/0')
  })

  test('Toggle Priority', () => {
    component.find('[data-test-id="update-priority-0"]').simulate('change')
    expect(propValues.updateTaskById).toHaveBeenCalledWith({
      ...propValues.tasks[0],
      highPriority: true
    })
  })

  test('Toggle Complete Status', () => {
    component.find('[data-test-id="update-completed-0"]').simulate('change')
    expect(propValues.updateTaskById).toHaveBeenCalledWith({
      ...propValues.tasks[0],
      completed: true
    })
  })

  test('Test Delete Action', () => {
    component.find('[data-test-id="delete-action-0"]').simulate('click')
    expect(propValues.deleteTaskById).toHaveBeenCalledWith(0)
  })
})
