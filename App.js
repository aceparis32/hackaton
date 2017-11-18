/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';

import FBSDK, {
  LoginManager,
  AccessToken,
  LoginButton
} from 'react-native-fbsdk';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  
  // _fbAuth(){
  //   LoginManager.logInWithReadPermissions(["email"],["user_birthday"]).then(function(result){
  //     if (result.isCancelled){
  //       alert('Login Cancelled')
  //     }else{
  //       alert('login successfull ' + result.grantedPermissions.toString());
  //     }
  //   }, function(error){
  //     alert('error was occured' + error);
  //   })
  // }

  render() {
    
    return (
      // <View style={styles.container}>
      //   <TouchableOpacity onPress={() => this._fbAuth()}>
      //     <Text>Facebook</Text>
      //   </TouchableOpacity> 
      // </View>
      <View>
      <LoginButton
        publishPermissions={['publish_actions']}
        onLoginFinished={
          (error, result) => {
            if (error){
              alert('Login error ' + result.error);
            }else if (result.isCancelled){
              alert('Login is cancelled');
            }else {
              AccessToken.getCurrentAccessToken().then((data) => {
                    {/*const { accessToken } = data
                    initUser(accessToken)*/}
                    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + data.accessToken)
                    .then((response) => response.json())
                    .then((json) => {
                      console.log(json.name);
                      console.log(json.email);
                      console.log(json.id);
                      fetch('http://alfatihstudi.000webhostapp.com/minihack/Services.php?application=create', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          name: json.name,
                          skill: 'gatau',
                          email: json.email,
                          phone: '085720008645',
                        })
                      })
                    })
                    .catch(() => {
                      reject('ERROR GETTING DATA FROM FACEBOOK')
                    })
              })
            }
          }
        }
        onLogoutFinished={() => alert("logout.") } />
    </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});