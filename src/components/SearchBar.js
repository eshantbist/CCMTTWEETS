import React,{Component} from 'react';
import {Button,Modal,Text,View,TouchableHighlight,TextInput,StyleSheet,TouchableOpacity,Platform,Dimensions,Picker} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state={
            searchTerm:'',
            multiLine:true,
        }
    }

    width=Dimensions.get('window').width;
    halfWidth=this.width/1.8;
    quarterWidth=this.width/2.7;

    search=this.props.searchTweets;
    handleChange=(searchTerm)=>{
        this.setState({searchTerm},()=>{
          this.search(this.state.searchTerm);
        });
    }

    set=this.props.setFilter;
    settingFilter=(newValue)=>{
      this.set(newValue);
    }
    render(){
      const filter=[
        {
            title:'All',
        },
        {
            title:'Video',
        },
        {
            title:'Post',
        },
      ]
        return(
          <View style={styles.mainContainer}>

            <Modal visible={this.props.filterDisplay} animationType={"slide"} transparent={true}>
              <View style={styles.modal}>
                <Text style={{alignItems:'center',fontWeight:'bold'}}>Pick Filter</Text>
                {filter.map((value,index)=>{
                  return <TouchableHighlight style={{padding:20}} key={index} onPress={()=>this.settingFilter(value.title)}>
                    <Text>{value.title}</Text>
                  </TouchableHighlight>
                })}
                <TouchableHighlight onPress={this.props.toggleFilter} style={{padding:20}}>
                  <Text style={{color:'#999'}}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>

            <TouchableHighlight onPress={this.props.toggleFilter} style={[styles.leftContainer, {width:this.quarterWidth}]}>
              <View style={{flexDirection:'row'}}>
                <FontAwesome name={'angle-down'} style={{fontSize:20,marginRight:5}}/>
                <Text style={styles.filter}>Filter: {this.props.filterTweets}</Text>
              </View>
            </TouchableHighlight>

            <View style={[styles.rightContainer, {width:this.halfWidth}]}>
                <FontAwesome name={'search'} style={styles.searchIcon}/>
                <TextInput
                    placeholder='Search...'
                    value = {this.state.searchTerm}
                    multiline={this.state.multiLine}
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    onChangeText={this.handleChange}
                />
            </View>

          </View>
        );
    }
}

const styles=StyleSheet.create({
    input:{
        fontFamily:"Times New Roman",
        fontSize:20,
        padding:7,
        textAlign:'left',
        marginTop:8,
    },
    mainContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'#e6e6e6',
      paddingBottom:10
    },
    rightContainer:{
      flexDirection:'row',
      backgroundColor:'#d1e0e0',
      borderRadius:8,
      marginRight:10
    },
    searchIcon:{
      padding: Platform.OS === 'ios' ?8:5,
      margin: Platform.OS === 'ios' ? 5:8,
      width: 30,
      fontSize:20,
      color:'#3366cc'
    },
    leftContainer:{
      backgroundColor:'#d1e0e0',
      borderRadius:8,
      marginLeft:10,
      padding:15,
    },
    filter:{
      fontFamily:"Times New Roman",
      fontSize:18,
      color:"#8c8c8c"
    },
    modal:{
      height:'100%',
      width:'100%',
      backgroundColor:"#e6e6e6",
      padding:20,
      alignItems:'center',
      marginTop:Platform.OS === 'ios' ?70:110,
    }

});
