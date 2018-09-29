import React,{Component} from 'react';
import {View,Text,FlatList,StyleSheet,Platform} from 'react-native'
import TweetItem from './TweetItem';

export default class TweetList extends Component{
    render(){
        return(
            <View style={styles.list}>
               <FlatList
                data={this.props.tweets}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <TweetItem filter={this.props.filterTweets} onPress={this.props.onItemPress} tweet={item}/>}
                />
            </View>
        );
    }
}
const styles=StyleSheet.create({
    list:{
        width:'100%',
        marginBottom:Platform.OS==='ios'?265:205,
    },
});
