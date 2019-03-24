import { connect } from 'react-redux'

import ViewGridComponent from './ViewGrid'

export const mapStateToProps = ({ packmanState = {} }) => {
  const { xAxis = 0, yAxis = 0, face = 0 } = packmanState
  return { packmanIndex: `${yAxis}-${xAxis}`, face }
}

export default connect(mapStateToProps)(ViewGridComponent)
