import { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import styles from "../styles/styles.js";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');
import md5 from 'md5';
import ErrorListComponent from './ErrorListComponent.js';

class SigninScreen extends Component {
  state = {
    email: 'Digite o e-mail',
    senha: 'Digite a senha',
    errors: [],
  }

  emailChanged = (text) => {
    this.setState({ email: text });
  }

  passwordChanged = (text) => {
    this.setState({ senha: text });
  }

  buttonPressed = () => {
    db.transaction(tx => {
      const query = `SELECT * FROM usuarios WHERE email='${this.state.email}' AND senha='${md5(this.state.senha)}' ;`
      //const query = "SELECT * FROM usuarios WHERE email='?' AND senha='?';"
      console.log(query);
      tx.executeSql(query, [], (_, result) => {
        if (result.rows.length > 0) {
          let user_id = result.rows._array[0].id
          console.log(result.rows._array)
          this.props.navigation.navigate('List contacts', {user_id: user_id});
        } else {
          let msg = "Invalid user or password."
          this.setState({ errors: [{ key: msg, message: msg }] })
        }
      }, (_, error) => {
        let msg = "Error while contacting the database"
        this.setState({ errors: [{ key: msg, message: msg }] })
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          textContentType='emailAddress'
          onChangeText={(text) => this.emailChanged(text)}
          onFocus={(e) => this.setState({ email: '' })}
        />

        <TextInput
          style={styles.input}
          value={this.state.senha}
          placeholder='Enter the password'
          onChangeText={text => this.passwordChanged(text)}
          secureTextEntry={true}
          onFocus={(e) => this.setState({ senha: '' })}
        />

        <TouchableHighlight
          style={[styles.btn, styles.columnContainer]}
          onPress={this.buttonPressed}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableHighlight>

        {!!this.state.errors.length &&
          <ErrorListComponent
            color='red'
            icone='alert-circle'
            data={this.state.errors}
          />
        }

        <Text style={{ marginTop: 10, marginBottom: 10 }}>or continue with</Text>

        <View>
          <TouchableHighlight style={styles.btnGoogle}>
            <View style={styles.rowContainer}>
              <Icon name="google-chrome" size={20} color="#000" />
              <Text style={[styles.btnText, { color: 'black' }]}> Continue with Google</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btnFB}>
            <View style={styles.rowContainer}>
              <Icon name="facebook" size={20} color="#FFF" />
              <Text style={[styles.btnText]}> Continue with Facebook</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default SigninScreen;