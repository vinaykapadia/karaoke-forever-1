/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Slider, { Handle } from 'rc-slider'
import './VolumeSlider.scss'

export default class VolumeSlider extends React.Component {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    onVolumeChange: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  }

  state = {
    vol: this.props.volume,
    isDragging: false,
  }

  handleChange = (vol) => {
    this.setState({
      vol,
      isDragging: true,
    })
    this.props.onVolumeChange(vol)
    this.ignoreStatus = 0
  }

  handleAfterChange = (vol) => {
    this.setState({
      vol,
      isDragging: false,
    })
    this.props.onVolumeChange(vol)
    this.ignoreStatus = 2
  }

  componentDidUpdate (prevProps) {
    if (this.ignoreStatus && prevProps.volume !== this.props.volume) {
      this.ignoreStatus--
    }
  }

  render () {
    return (
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={this.state.isDragging || this.ignoreStatus ? this.state.vol : this.props.volume}
        onChange={this.handleChange}
        onAfterChange={this.handleAfterChange}
        handle={handle}
        className={this.props.className}
      />
    )
  }
}

// volume slider handle/grabber
const handle = (props) => {
  const { value, dragging, ...restProps } = props

  const style = Object.assign({ left: `${props.offset}%` }, {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    marginTop: '6px',
    fontSize: dragging ? '50px' : '40px',
    opacity: 0.7,
    color: '#333',
    touchAction: 'pan-x',
  })

  let icon = 'volume_up'
  if (value === 0) icon = 'volume_off'
  else if (value < 0.4) icon = 'volume_mute'
  else if (value < 0.7) icon = 'volume_down'

  return (
    <div style={style}>
      <i className='material-icons'>{icon}</i>
      <Handle {...restProps} />
    </div>
  )
}
