import React,{Component} from 'react';
import {Dimensions,View,Text,Image,StyleSheet,TouchableOpacity,Button,Platform} from 'react-native';
import ajax from '../ajax';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TweetItem extends Component{


    constructor(props){
      super(props);
      this.state={
        slicedDate:[],
        filter:'All',
      }
    }
    componentDidMount(){
        const slicedDateTime=this.props.tweet.post_date.split(" ");
        const sliceDate=slicedDateTime[0].split('-').reverse();
        const newData=sliceDate.splice(1,0,"-");
        const otherNewData=sliceDate.splice(3,0,"-");
        this.setState({slicedDate:sliceDate});
        this.setState({filter:this.props.filter})
    }
    handlePress=()=>{
        this.props.onPress(this.props.tweet.id);
    };

    render(){
        const { tweet }=this.props;

        if(this.state.filter==='All')
        {
          if(tweet.videoUrl==='')
          {
            return(
                <TouchableOpacity onPress={this.handlePress} style={styles.tweet}>
                    <View style={styles.info}>
                      <Text style={styles.title}>{tweet.post_title}</Text>
                      <Text style={styles.date}>{this.state.slicedDate}</Text>
                      <Image
                        source={{uri:tweet.guid}}
                        style={{height:270, width:'100%'}}/>
                      <Text style={styles.content}>{tweet.post_content.slice(0,100)}</Text>
                    </View>
                    <View style={styles.readMore}>
                      <Text style={{color:'#999999'}} >Read More...</Text>
                    </View>
                </TouchableOpacity>
            );
          }
          if(tweet.videoUrl!=='')
          {
            return(
                <TouchableOpacity onPress={this.handlePress} style={styles.tweet}>
                    <View style={styles.info}>
                      <View style={styles.headerBar}>
                        <Text style={styles.title}>{tweet.post_title}</Text>
                        <FontAwesome name={'video-camera'} style={styles.videoIcon}/>
                      </View>
                      <Text style={styles.date}>{this.state.slicedDate}</Text>
                      <Image
                        source={{uri:tweet.guid}}
                        style={{height:270, width:'100%'}}/>
                      <Text style={styles.content}>{tweet.post_content.slice(0,100)}</Text>
                    </View>
                    <View style={styles.readMore}>
                      <Text style={{color:'#999999'}} >Read More...</Text>
                    </View>
                </TouchableOpacity>
            );
          }
        }
        if(this.props.filter==='Video')
        {
          if(tweet.videoUrl==='')
          {
            return(null);
          }
          if(tweet.videoUrl!=='')
          {
            return(
                <TouchableOpacity onPress={this.handlePress} style={styles.tweet}>
                    <View style={styles.info}>
                      <View style={styles.headerBar}>
                        <Text style={styles.title}>{tweet.post_title}</Text>
                        <FontAwesome name={'video-camera'} style={styles.videoIcon}/>
                      </View>
                      <Text style={styles.date}>{this.state.slicedDate}</Text>
                      <Image
                        source={{uri:tweet.guid}}
                        style={{height:270, width:'100%'}}/>
                      <Text style={styles.content}>{tweet.post_content.slice(0,100)}</Text>
                    </View>
                    <View style={styles.readMore}>
                      <Text style={{color:'#999999'}} >Read More...</Text>
                    </View>
                </TouchableOpacity>
            );
          }
        }
        if(this.props.filter==='Post')
        {
          if(tweet.videoUrl==='')
          {
            return(
                <TouchableOpacity onPress={this.handlePress} style={styles.tweet}>
                    <View style={styles.info}>
                      <Text style={styles.title}>{tweet.post_title}</Text>
                      <Text style={styles.date}>{this.state.slicedDate}</Text>
                      <Image
                        source={{uri:tweet.guid}}
                        style={{height:270, width:'100%'}}/>
                      <Text style={styles.content}>{tweet.post_content.slice(0,100)}</Text>
                    </View>
                    <View style={styles.readMore}>
                      <Text style={{color:'#999999'}} >Read More...</Text>
                    </View>
                </TouchableOpacity>
            );
          }
          if(tweet.videoUrl!=='')
          {
            return(null);
          }
        }
    }
}

const styles=StyleSheet.create({
    tweet:{
        marginHorizontal:10,
        marginTop:10,
    },
    info:{
        padding:10,
        backgroundColor:"#fff",
        borderColor:"#bbb",
        borderWidth:1,
        borderTopWidth:0,
        borderBottomWidth:0,
        borderBottomStartRadius:0,
        borderBottomEndRadius:0,
        borderRadius:7,
    },
    title:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:5,
    },
    image:{
        height:250,
        width:'100%',
    },
    button:{
      flexDirection:'row',
      justifyContent: 'center',
    },
    date:{
      fontSize:12,
      fontWeight:'bold',
      color:'grey',
      marginBottom:7,
    },
    readMore:{
      padding:10,
      backgroundColor:'#f2f2f2',
      borderWidth:1,
      borderColor:"#bbb",
      borderTopWidth:0,
      borderBottomStartRadius:7,
      borderBottomEndRadius:7,
    },
    content:{
      fontSize:18,
      fontFamily:Platform.OS === 'ios' ? 'cochin' : 'sans-serif-condensed',
      marginTop:10,
    },
    headerBar:{
      justifyContent:'space-between',
      flexDirection:'row',
    },
    videoIcon:{
      fontSize:20,
    }
});
