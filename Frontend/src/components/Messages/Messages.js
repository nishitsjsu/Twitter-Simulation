import React, { Component } from 'react'
// import '../../App.css'
// import './Messages.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import Tweet from '../Tweet/Tweet'
import sampleImg from '../img/GrubhubDetails.jpg'
import SearchBar from '../SearchBar/SearchBar'
import ROOT_URL from '../../constants'
import RecieverMessage from './RecieverMessage'
import SenderMessage from './SenderMessage'
// Define a Login Component
class Messages extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      messagelist: [],
      authFlag: false,
      authFailed: false
    }
  }

  componentWillMount() {
    this.setState({
      authFlag: false,
      authFailed: false
    })
    sessionStorage.setItem('reciever', 'Nishit')
    let sender = sessionStorage.getItem('email')
    let reciever = sessionStorage.getItem('reciever')
    let data = {
      sender_name: sender,
      receiver_name: reciever
    }

    // axios
    //   .get(`${ROOT_URL}/messagedetails`, data)
    //   .then(res => {
    //     // update the state with the response data
    //     console.log('Axios get:', res.data)
    //     if (res.status === 200) {
    //       console.log('Inside response', res.data)
    //       window.location.reload()
    //     } else {
    //       console.log('Error occured while sending the message!')
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error occured while sending the message!' + err)
    //   })

    axios
      .post(`${ROOT_URL}/messagedetails`, data)
      .then(res => {
        // update the state with the response data
        let list = res.data

        console.log('Axios get:', (res.data))
        this.setState(
          {
            messagelist: list
          })
        if (res.status === 200) {
          console.log('Inside response', res.data)
          // window.location.reload()
        } else {
          console.log('Error occured while sending the message!')
        }
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })

  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, type, meta }) => {
    return (
      <div>
        <input class='messageTerm' type={type} {...input} />
        {this.renderError(meta)}
      </div>
    )
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = formValues => {
    let reciever = sessionStorage.getItem('reciever')
    let email = sessionStorage.getItem('email')
    let data = {
      sender_name: email,
      receiver_name: reciever,
      text: formValues.mesg
    }
    axios.defaults.withCredentials = true
    console.log(data)
    axios
      .post(`${ROOT_URL}/postmessage`, data)
      .then(res => {
        // update the state with the response data
        console.log('Axios get:', res.data)
        if (res.status === 200) {
          console.log('Inside response', res.data)
          window.location.reload()
        } else {
          console.log('Error occured while sending the message!')
        }
      })
      .catch(err => {
        console.log('Error occured while sending the message!' + err)
      })
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )
    }
  }

  renderInput = ({ input, meta, placeholder, className = { className } }) => {
    return (
      <div>
        <input
          id='messagebar'
          type='text'
          class='messageTerm'
          placeholder={placeholder}
          // style={{ marginRight: '10px' }}
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  render() {
    let redirectVar = null
    let invalidtag = null
    let messageDisplay = null
    if (this.state.messagelist) {
      let mesgs = this.state.messagelist
      messageDisplay = Object.keys(mesgs).map((msg) => {
        // alert(mesgs[msg].sender_name)       
        if (sessionStorage.getItem('email') === mesgs[msg].sender_name) {
          return (
            <SenderMessage message={mesgs[msg].text}></SenderMessage>
          )
        } else if (sessionStorage.getItem('email') === mesgs[msg].receiver_name) {
          return (
            < RecieverMessage message={mesgs[msg].text} ></RecieverMessage >
          )
        }
      })
    }
    if (this.state.authFailed) {
      invalidtag = (
        <label style={{ color: 'red' }}>*Invalid user name password!</label>
      )
    }

    let data = {
      name: 'Vishal',
      handler: 'Handler',
      time: 'time',
      description: 'Description',
      img: sampleImg,
      likes: 30,
      retweets: 20,
      comments: 10
    }

    let isSelected = 'searchTerm'

    return (
      <div>
        <div>
          <div class='col-sm-2'>
            <LeftNavbar />
          </div>

          <div class='split-center'>
            <h3
              style={{
                marginLeft: '20px',
                fontWeight: '800',
                fontSize: '19px'
              }}
            >
              Messages
            </h3>
            <div style={{ borderBottom: '1px solid #E0E0E0' }} />
            <SearchBar />
          </div>
          <div class='split-right'>
            <h3
              style={{
                marginLeft: '20px',
                fontWeight: '800',
                fontSize: '19px'
              }}
            >
              @ Samkit Sheth
            </h3>
            <div style={{ borderBottom: '1px solid #E0E0E0' }} />
            <div class="wrapper">
              <div class="content">
                {messageDisplay}

                {/* <RecieverMessage message='Reciever'></RecieverMessage>
                <RecieverMessage message='Reciever'></RecieverMessage>
                <RecieverMessage message='Reciever'></RecieverMessage>
                <SenderMessage message='Sender'></SenderMessage> */}
              </div>
            </div>


            <div
              style={{
                position: 'absolute',
                bottom: '50px',
                width: '100%',
                borderTop: '1px solid #E0E0E0'
              }}
            >
              <div>
                <form
                  className='ui form error'
                  onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                  <div class='row'>
                    <div class='col-sm-11'>
                      <div class='message'>
                        <Field
                          name='mesg'
                          placeholder='Start a new message'
                          component={this.renderInput}
                        />
                        {/* <input
                          id='messagebar'
                          type='text'
                          class='messageTerm'
                          placeholder='Start a new message'
                        /> */}
                      </div>
                    </div>

                    <div class='col-sm-1'>
                      <button
                        id='messagebarbutton'
                        type='submit'
                        class='messageButton'
                      >
                        <i class='far fa-paper-plane ' />
                      </button>
                    </div>
                  </div>
                </form>
                <div class='form-group'>
                  <div tabIndex='0' class='wrap' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { loginuser }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(Messages)
)