import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity,ScrollView,Button,WebView,  PixelRatio,Platform} from 'react-native';
import ajax from '../ajax';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

export default class PostDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            tweet:this.props.initialTweetData,
            paused:false,
        }
    }

    render(){
        const { tweet }=this.state;
        if(tweet.videoUrl!=='')
        {
          return(
            <View>
              <Header onClick={this.props.onBack}/>
              <TouchableOpacity onPress={this.props.onBack} style={styles.goBack}>
                  <Text style={styles.backLink}>
                    <FontAwesome name={'chevron-left'} style={styles.chevron}/>
                    Back
                  </Text>
              </TouchableOpacity>
              <ScrollView style={styles.tweet}>

                <View style={styles.video} >
                  <Video source={{uri: "https://www.w3schools.com/html/mov_bbb.mp4"}}
                  ref={(ref) => {this.player = ref}}
                   muted={false}
                   repeat={true}
                   controls={true}
                   resizeMode="cover"
                   paused={this.state.paused}
                   style={styles.backgroundVideo} />
                </View>

                <View style={styles.titleView}>
                  <Text style={styles.title}>{tweet.post_title}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.contentMatter}>{tweet.post_content}</Text>
                </View>
              </ScrollView>
            </View>
          );
        }
        if(tweet.videoUrl==='')
        {
          return(
            <View>
              {/*<Header onClick={this.props.onBack}*/}
              <TouchableOpacity onPress={this.props.onBack} style={styles.goBack}>
                  <Text style={styles.backLink}>
                    <FontAwesome name={'chevron-left'} style={styles.chevron}/>
                    Back
                  </Text>
              </TouchableOpacity>
              <ScrollView style={styles.tweet}>
                <View style={styles.imageView}>
                  <Image
                    source={{uri:tweet.guid}}
                    style={styles.image}/>
                </View>
                  <View style={styles.titleView}>
                    <Text style={styles.title}>{tweet.post_title}</Text>
                  </View>
                <View style={styles.content}>
                  <Text style={styles.contentMatter}>{tweet.post_content}</Text>
                </View>
              </ScrollView>
            </View>
          );
        }

    }
}

const styles = StyleSheet.create({
    tweet: {
      marginBottom: 120,
    },
    backLink:{
      marginBottom:5,
      color:'white',
      fontSize:20,
    },
    goBack:{
      padding:7,
      alignItems:'center',
      backgroundColor:'#999999',
      marginBottom:10,
    },
    content:{
      marginHorizontal:10,
      marginVertical:10,
      padding:10,
      borderColor:"#bbb",
      borderWidth:1,
      borderRadius:7,
      backgroundColor:'#476b6b',
    },
    contentMatter:{
      fontSize:18,
      fontFamily: 'Cochin',
      color:'white',
    },
    titleView:{
      alignItems:'center',
      backgroundColor:'#476b6b',
      padding:10,

    },
    title:{
      fontSize:20,
      fontWeight:'bold',
      color:'white',
    },
    image:{
      height:400,
      width:'100%',
    },
    chevron:{
      fontSize:20,
    },
    backgroundVideo: {
      height:200,
      width:'100%',
      borderRadius:5,
    },
    video:{
      padding:10,
      backgroundColor:'black'
    }
  });
