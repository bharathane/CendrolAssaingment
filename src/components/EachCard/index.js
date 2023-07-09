import {Component} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import './index.css'

const apiConstains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class EachCard extends Component {
  state = {joke: '', status: apiConstains.initial}

  clicking = async () => {
    const {displayTxt} = this.props
    const urlForJoke = `https://api.chucknorris.io/jokes/random?category=${displayTxt}`
    const reqObj = await fetch(urlForJoke)
    if (reqObj.ok === true) {
      const randomJoke = await reqObj.json()
      const {value} = randomJoke
      this.setState({joke: value, status: apiConstains.success})
    } else {
      this.setState({status: apiConstains.failure})
    }
  }

  onSuccessView = () => {
    const {displayTxt} = this.props
    const {joke} = this.state
    return (
      <div>
        <h1>{displayTxt}</h1>
        <p>{joke}</p>
        <button type="button" onClick={this.clicking}>
          Next Joke
        </button>
      </div>
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

  renderFinal = () => {
    const {status} = this.state

    switch (status) {
      case apiConstains.success:
        return this.onSuccessView()

      case apiConstains.failure:
        return this.OnFailureView()

      default:
        return this.onLoadingView()
    }
  }

  render() {
    const {displayTxt} = this.props

    return (
      <>
        <Popup
          modal
          trigger={
            <li>
              <button className="card" type="button" onClick={this.clicking}>
                <h1>{displayTxt}</h1>
                <p>Unlimited Jokes On {displayTxt}</p>
              </button>
            </li>
          }
        >
          {close => (
            <div className="joke-con">
              <button onClick={() => close()} type="button" className="btn">
                <AiOutlineClose />
              </button>
              <div>{this.renderFinal()}</div>
            </div>
          )}
        </Popup>
      </>
    )
  }
}

export default EachCard
