import { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from "../styles/styles.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './SigninScreen.js';
import SignupScreen from './SignupScreen.js';
import ListContactsScreen from './ListContactsScreen.js';

const Stack = createNativeStackNavigator();

class MainScreenComponent extends Component{
    render () {
      return(
          <View style={styles.container}>
          <Text style={styles.title}>Foo App</Text>
          <TouchableHighlight
            style={[styles.btn, styles.columnContainer]}
            onPress={() => this.props.navigation.navigate('Sign in')}
          >
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btn, styles.columnContainer]}
            onPress={() => this.props.navigation.navigate('Sign up')}
          >
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableHighlight>
        </View>
      )
    }
}

class MainScreen extends Component {

  render() {
    console.log(styles);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreenComponent} />
          <Stack.Screen name="Sign in" component={SigninScreen} />
          <Stack.Screen name="Sign up" component={SignupScreen} />
          <Stack.Screen name="List contacts" component={ListContactsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainScreen;