import { connect } from 'react-redux'

import InputHandler from './InputHandler'

import {
  placeAction,
  moveAction,
  changeDirectionClockwise,
  changeDirectionAntiClockwise
} from '../../reducers/actionHandleReducer'
import { getDirectionName } from '../../utils/mapConstant'

export const mapStateToProps = ({ packmanState = {} }) => ({
  reportData: `(${packmanState.yAxis}, ${packmanState.xAxis}) ${getDirectionName(packmanState.face)}`
})

export const mapDispatchToProps = dispatch => (
  {
    placePacman: (request) => {
      dispatch(placeAction(request))
    },
    movePacman: () => {
      dispatch(moveAction())
    },
    turnLeft: () => {
      dispatch(changeDirectionAntiClockwise())
    },
    turnRight: () => {
      dispatch(changeDirectionClockwise())
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(InputHandler)
