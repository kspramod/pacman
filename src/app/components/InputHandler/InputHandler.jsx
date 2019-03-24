import React from 'react'
import propTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

import { DIRECTION_MAP } from '../../utils/mapConstant'

class InputHandler extends React.Component {
  constructor (props) {
    super(props)

    // Based on action prepopulate values as necessary
    this.state = {
      xAxis: 0,
      yAxis: 0,
      face: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // Use common method to store field value in state
  handleInputChange (event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [target.name]: Number(value) })
  }

  handleSubmit (event) {
    // prevent default html form submit event
    event.preventDefault()
    event.stopPropagation()

    this.setState({ validated: true })
  }

  render () {
    const {
      validated,
      xAxis,
      yAxis,
      face
    } = this.state

    const {
      reportData,
      placePacman,
      movePacman,
      turnLeft,
      turnRight
    } = this.props
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
      >
        <Form.Row>
          <Form.Group as={Col} sm={6} md={4} controlId='formHorizontalxAxis'>
            <Form.Label>
              X Axis:
            </Form.Label>
            <Form.Control
              required
              type='number'
              name='xAxis'
              data-test-id='xAxis-input'
              placeholder='xAxis'
              value={xAxis}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} sm={6} md={4} controlId='formHorizontalyAxis'>
            <Form.Label>
              Y Axis:
            </Form.Label>
            <Form.Control
              required
              type='number'
              name='yAxis'
              data-test-id='yAxis-input'
              placeholder='yAxis'
              value={yAxis}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} sm={6} md={4} controlId='formHorizontalFace'>
            <Form.Label>
              Face:
            </Form.Label>
            <Form.Control
              required
              as='select'
              name='face'
              data-test-id='face-input'
              placeholder='face'
              value={face}
              onChange={this.handleInputChange}
            >
              {
                Object.keys(DIRECTION_MAP).map(faceValue => (
                  <option
                    value={DIRECTION_MAP[faceValue]}
                    key={DIRECTION_MAP[faceValue]}
                  >
                    {faceValue}
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group as={Row}>
          <Col xs={4}>
            <Button type='button' data-test-id='place-action' onClick={() => placePacman({ xAxis, yAxis, face })}>
              Place Pac-Man
            </Button>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col xs={6}>
            <Button type='button' data-test-id='left-button' onClick={() => turnLeft()} variant='secondary'>
              {'<--'}
            </Button>
            <Button type='button' data-test-id='right-button' onClick={() => turnRight()} variant='secondary'>
              {'-->'}
            </Button>
          </Col>
          <Col xs={6}>
            <Button type='button' data-test-id='move-button' onClick={() => movePacman()} variant='success'>
              Move
            </Button>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Col xs={12} data-test-id='report-output'>
            <Button variant='info'>
              {'Report : '}
              <Badge variant='light'>{reportData}</Badge>
              <span className='sr-only'>Report</span>
            </Button>
          </Col>
        </Form.Group>
      </Form>
    )
  }
}

InputHandler.defaultProps = {
  reportData: ''
}

InputHandler.propTypes = {
  reportData: propTypes.string,
  placePacman: propTypes.func.isRequired,
  movePacman: propTypes.func.isRequired,
  turnLeft: propTypes.func.isRequired,
  turnRight: propTypes.func.isRequired
}

export default InputHandler
