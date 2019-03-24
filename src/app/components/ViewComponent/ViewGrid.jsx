import React from 'react'
import propTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import { FIVE_FIVE_GRID, getDirectionName } from '../../utils/mapConstant'

const ViewGrid = ({
  packmanIndex,
  face
}) => (
  <div>
    <Row style={{ marginTop: '1rem' }}>
      <Table striped bordered hover responsive>
        <tbody>
          {
            FIVE_FIVE_GRID.map((yAxis, idx) => {
              const yAxisIdx = FIVE_FIVE_GRID.length - yAxis[idx] - 1
              return (
                <tr key={yAxisIdx} id={yAxisIdx}>
                  {
                    yAxis.map((xAxis) => {
                      const cellIndex = `${yAxisIdx}-${xAxis}`
                      return (
                        <td id={cellIndex} key={cellIndex} colSpan='1'>
                          <span>
                            {`Cell Value ${cellIndex}`}
                          </span>
                          <br />
                          <span style={{ color: 'blue' }}>
                            {
                              (cellIndex === packmanIndex) ? `here-${getDirectionName(face)}` : ''
                            }
                          </span>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Row>
  </div>
)

ViewGrid.defaultProps = {
  packmanIndex: '0-0',
  face: 0
}

ViewGrid.propTypes = {
  packmanIndex: propTypes.string,
  face: propTypes.number
}

export default ViewGrid
