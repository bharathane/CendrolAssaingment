import {Component} from 'react'

import EachCard from '../EachCard'
import './index.css'

const apiConstains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ChuckNorries extends Component {
  state = {data: [], status: apiConstains.initial}

  componentDidMount() {
    this.makingApiCall()
  }

  makingApiCall = async () => {
    const url = 'https://api.chucknorris.io/jokes/categories'
    const apiReq = await fetch(url)
    if (apiReq.ok === true) {
      const displayData = await apiReq.json()
      this.setState({data: displayData, status: apiConstains.success})
    } else {
      this.setState({status: apiConstains.failure})
    }
  }

  onSuccessView = () => {
    const {data} = this.state
    return (
      <ul className="ulEl">
        {data.map(each => (
          <EachCard displayTxt={each} key={each} />
        ))}
      </ul>
    )
  }

  onLoadingView = () => (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  )

  OnFailureView = () => (
    <button type="button" onClick={this.makingApiCall}>
      Retry
    </button>
  )

  renderFinalView = () => {
    const {status} = this.state

    switch (status) {
      case apiConstains.success:
        return this.onSuccessView()

      case apiConstains.failure:
        return this.onFailurView()

      default:
        return this.onLoadingView()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Chuck Norries</h1>
        {this.renderFinalView()}
      </div>
    )
  }
}

export default ChuckNorries
