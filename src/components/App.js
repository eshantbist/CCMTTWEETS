import React, {Component} from 'react';
import {Text, View, StyleSheet,Animated,Easing} from 'react-native';
import ajax from '../ajax';
import TweetList from './TweetList';
import TweetDetail from './TweetDetail';
import SearchBar from './SearchBar';
import Header from './Header';
import { AuthenticationDetails,CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';


export default class App extends Component {

  titleXPos=new Animated.Value(0);
  constructor(props){
    super(props);
    this.state={
      tweets:[],
      currentTweetId:null,
      tweetsFormSearch:[],
      filterTweets:'All',
      filterDisplay:false,
    }
  }
  animatedTitle=(direction=1)=>{
    Animated.timing(
      this.titleXPos,
      {toValue: direction*80,
        duration:850,
        easing:Easing.spring
      }).start(({finished})=> {
        if(finished){
          this.animatedTitle(-1*direction);
        }
    });
  }

  setCurrentTweet = (tweetId) => {
    this.setState({ currentTweetId: tweetId });
  };

  currentTweet = () => {
    return this.state.tweets.find(
      (tweet) => tweet.id === this.state.currentTweetId
    )
  };

  unsetCurrentTweet = () => {
    this.setState({ currentTweetId: null });
  };

  async componentDidMount() {
    console.log("Hello JWT::"+this.props.token);
    this.animatedTitle();
    const tweets = await ajax.fetchInitialTweets(this.props.token);
    this.tweets=tweets;
    this.setState({tweets});


  }

  searchTweets = async (searchTerm)=> {
  let tweetsFormSearch=[];
  if(searchTerm){
    tweetsFormSearch=await ajax.fetchTweetsSearchResults(searchTerm);
  }
  this.setState({tweetsFormSearch});
  };

  clearSearch=()=>{
    this.setState({tweetsFormSearch:[]})
  }

  setFilter=(newValue)=>{
    this.setState({filterTweets:newValue});
    this.toggleFilter();
    this.setState({tweets:this.tweets});
  }

  toggleFilter=()=>{
    this.setState({filterDisplay:!this.state.filterDisplay});
    this.setState({tweets:[]});
  }

  cancelFilter=()=>{
    this.toggleFilter();
    this.setState({tweets:this.tweets});
  }

  render() {
    if(this.state.currentTweetId)
    {
      return (
        <TweetDetail
          initialTweetData={this.currentTweet()}
          onBack={this.unsetCurrentTweet}
        />
      );
    }

    const tweetsToDisplay =
      this.state.tweetsFormSearch.length>0
        ?this.state.tweetsFormSearch
        :this.state.tweets;

    if(this.state.filterTweets!==null)
    {
      return(
        <View>
          {/*<Header onClick={this.unsetCurrentTweet}/>*/}
          <SearchBar
              searchTweets={this.searchTweets}
              filterTweets={this.state.filterTweets}
              filterDisplay={this.state.filterDisplay}
              setFilter={this.setFilter}
              toggleFilter={this.toggleFilter}
              cancelFilter={this.cancelFilter}
          />
          <View style={styles.listBackground}>
            <TweetList filterTweets={this.state.filterTweets} tweets={tweetsToDisplay} onItemPress={this.setCurrentTweet}/>
          </View>
        </View>
      );
    }
    return (
      <Animated.View style={[{left:this.titleXPos}, styles.container]}>
          <Text style={styles.header}>CCMT TWEETS</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
  },
  listBackground:{
    backgroundColor:'#e6e6e6',
  }

});
