import { Component } from 'react'

class ClassComponentWrapper extends Component {
  render() {
    return this.props.children
  }
}

export default ClassComponentWrapper
