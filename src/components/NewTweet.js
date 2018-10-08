import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Button
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const width=Dimensions.get('window').width;
export default class App extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null,
    text:''
  };


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder='Type in your content....'
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postTweet}>
          <Text style={{fontSize:20}}>Tweet</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1.5/ PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 10,
    width:width,
    height: 120
  },
  input:{
    borderWidth:1,
    padding:10,
    width:width,
    height:200,
    marginBottom:20
  },
  postTweet:{
    backgroundColor:'#919191',
    padding:10,
    width:width,
    alignItems:'center'
  }
});
