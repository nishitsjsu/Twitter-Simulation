import React, { Component, Fragment } from 'react'
import axios from 'axios';
import WriteTweet from '../WriteTweet/WriteTweet'
import ROOT_URL from '../../constants'
import TweetData from '../Tweet/TweetData'
import './UserTweets.css'
import UserProfile from '../Profile/UserProfile';

class Tweets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      replyToggle: false
    }

    
    this.replyPressed = this.replyPressed.bind(this);
    this.retweetPressed = this.retweetPressed.bind(this);
  }


  replyPressed(e) {
    console.log("replyPressed")
    this.setState({
      replyToggle: true
    })
  }

  retweetPressed(e) {
    console.log("retweetPressed")
  }

  componentWillMount() {
    var email = sessionStorage.getItem("email")
    console.log(email);
    axios.get(ROOT_URL + '/fetchusertweets', {
      params: {
        email: email
      }
    })
      .then((response) => {
        console.log("Received response")
        console.log(response.data)
        //update the state with the response data
        this.setState({

          tweets: this.state.tweets.concat(response.data)
        });
      });
  }



  render() {  
    let details = this.state.tweets.map(tweet => {
      return (
        <div>
          <TweetData key={Math.random} data={tweet}></TweetData>
        </div>
      )
    })

    

    let details1 = this.state.tweets.map(tweet => {
        return (
          <div>
            <h1>inside Tweet</h1>
            
          <TweetData key={Math.random} data={tweet}></TweetData>
          </div>
          
          // let hasImageTag = null
          // if (tweet.image) {
          //   hasImageTag = (
          //     <div>
          //       <img
          //         class='rounded-circle'
          //         style={{ borderRadius: '10px' }}
          //         src={tweet.image}
          //         width='500px'
          //         height='250%'
          //         alt='profile pic'Tweet
          //       />
          //       <br />
          //       <br />
          //     </div>
          //   )
          // }
        )
      })


    return (
        
      <Fragment>
          <div class='split-center_newdata'>
          <div style={{
            marginLeft: '20px',
            marginBottom : '500px',
            fontWeight: '800',
            fontSize: '19px'
        }}></div>
        {details}
        
        </div>
      </Fragment>
    

    )
  }
}

export default Tweets