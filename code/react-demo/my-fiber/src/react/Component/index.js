import { scheduleUpdate } from '../reconciliation'
export class Component {
  static isReactComponent = {}
  constructor(props) {
    this.props = props
  }
  setState(partialState) {
    scheduleUpdate(this, partialState)
  }
}