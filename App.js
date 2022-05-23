import React, { Component } from 'react';
import {Text, Platform} from 'react-native'
import MainScreen from './components/MainScreen.js';
import ListContactsScreen from './components/ListContactsScreen.js';
import ContactScreen from './components/ContactScreen.js';
import SignupScreen from './components/SignupScreen.js';
import SigninScreen from './components/SigninScreen.js';
import AddContactScreen from './components/AddContactScreen.js';

class App extends Component {
  state = {
    x: true,
  }

  render() {
    console.log(Platform.OS);
    return (
      /*<ListContactsScreen
      data={[
        {
          name: "Juliano",
          phone: "xx - xxxx xxxx",
          key: 1
        },
        {
          name: "Juliano 2",
          phone: "22 - 22222 2222",
          key: 2
        },
        {
          name: "Witilan",
          phone: "xx - 22222 2222",
          key: 3
        },
      ]}
    />*/
      <MainScreen/>
    )
  };
}


export default App;
