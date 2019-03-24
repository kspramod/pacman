import { handleActions, createAction } from 'redux-actions'

// Actions
export const PLACE_ACTION = 'PLACE_ACTION'
export const MOVE_ACTION = 'MOVE_ACTION'
export const CHANGE_DIRECTION_CLOCKWISE = 'CHANGE_DIRECTION_CLOCKWISE'
export const CHANGE_DIRECTION_ANTICLOCKWISE = 'CHANGE_DIRECTION_ANTICLOCKWISE'

const initialState = {
  xAxis: 0,
  yAxis: 0,
  face: 0
}

export const placeAction = createAction(PLACE_ACTION)
export const moveAction = createAction(MOVE_ACTION)
export const changeDirectionClockwise = createAction(CHANGE_DIRECTION_CLOCKWISE)
export const changeDirectionAntiClockwise = createAction(CHANGE_DIRECTION_ANTICLOCKWISE)

const actionHandleReducer = handleActions({
  [placeAction]: (state, action) => {
    const { xAxis, yAxis, face } = action.payload
    const updateState = { ...state }

    if (xAxis >= 0 && xAxis <= 4) {
      updateState.xAxis = xAxis
    }

    if (yAxis >= 0 && yAxis <= 4) {
      updateState.yAxis = yAxis
    }

    updateState.face = face

    return updateState
  },
  [moveAction]: (state) => {
    let { xAxis, yAxis } = state
    const updateState = { ...state }

    switch (state.face) {
      case 0:
        yAxis += 1
        break
      case 2:
        yAxis -= 1
        break
      case 1:
        xAxis += 1
        break
      case 3:
        xAxis -= 1
        break
      default:
        break
    }

    if (xAxis >= 0 && xAxis <= 4) {
      updateState.xAxis = xAxis
    }

    if (yAxis >= 0 && yAxis <= 4) {
      updateState.yAxis = yAxis
    }

    return updateState
  },
  [changeDirectionClockwise]: (state) => {
    let { face } = state

    face += 1
    face = face > 3 ? 0 : face

    return {
      ...state,
      face
    }
  },
  [changeDirectionAntiClockwise]: (state) => {
    let { face } = state

    face -= 1
    face = face < 0 ? 3 : face

    return {
      ...state,
      face
    }
  }
}, initialState)

export default actionHandleReducer
