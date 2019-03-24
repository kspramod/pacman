import { connect } from 'react-redux'

import ViewGridComponent from './ViewGrid'

export const mapStateToProps = ({ packmanState = {} }) => {
  const { xAxis, yAxis, face } = packmanState
  return { packmanIndex: `${yAxis}-${xAxis}`, face }
}

export default connect(mapStateToProps)(ViewGridComponent)
