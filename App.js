import React, { Component } from 'react';
import MainScreen from './components/MainScreen.js';

class App extends Component {
  state = {
    x: true,
  }

  render() {
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
