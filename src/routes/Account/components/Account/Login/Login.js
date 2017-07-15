import PropTypes from 'prop-types'
import React, { Component } from 'react'
import RoomSelect from '../RoomSelect'

export default class Login extends Component {
  static propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
  }

  render () {
    return (
      <form>
        <input type='email' ref='email' placeholder='email' autoFocus />
        <input type='password' ref='password' placeholder='password' />
        <RoomSelect onRoomSelect={this.handleRoomSelect} />

        <button onClick={this.handleSubmit}>
          Sign In
        </button>
      </form>
    )
  }

  handleRoomSelect = (roomId) => {
    this.roomId = roomId
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const creds = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      roomId: this.roomId,
    }

    this.props.onSubmitClick(creds)
  }
}