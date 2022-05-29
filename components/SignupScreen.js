import styles from "../styles/styles.js";
import { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Switch, Alert } from 'react-native';
import ErrorListComponent from "./ErrorListComponent.js";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');
import md5 from 'md5';

class SignupScreen extends Component {
  state = {
    email: 'Enter the e-mail',
    senha: 'Enter the password',
    confirmSenha: 'Enter the password confirmation',
    enabled: false,
    errors: [],
    readyToInsert: false,
    success: [],
  }

  componentDidMount() {
    db.transaction(tx => {
      //tx.executeSql("DROP TABLE usuarios;");
      tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, senha TEXT);");
    }, error => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, (what) => {
      console.log('table created: ' + what)
    });
  }

  toggleSwitch = () => {
    this.setState({ enabled: !this.state.enabled })
  }

  isEnabled = () => {
    return this.state.enabled;
  }

  emailChanged = (text) => {
    this.setState({ email: text });
  }

  passwordChanged = (text) => {
    this.setState({ senha: text });
  }

  confirmPasswordChanged = (text) => {
    this.setState({ confirmSenha: text });
  }

  insertedCallback = (t, r) => {
    console.log(t);
    console.log(r);
  }

  notInsertedCallback = (t, error) => {
    console.log(t);
    console.log(error);
  }

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validate = () => {
    this.setState({ errors: [] });
    console.log("validate called");

    let a = [];
    if (!this.state.enabled) {
      let msg = "You must agree to the terms of service.";
      a.push({ key: msg, message: msg })
    }

    if (this.state.email.length == 0 || !this.validateEmail(this.state.email)) {
      let msg = "Enter a valid e-mail!";
      a.push({ key: msg, message: msg });
    }

    if (this.state.senha.length == 0 || this.state.confirmSenha == 0) {
      let msg = "Enter the password and password confirmation!";
      a.push({ key: msg, message: msg });
    }

    if (this.state.senha !== this.state.confirmSenha) {
      let msg = "Password and password confirmation must match!";
      a.push({ key: msg, message: msg });
    }

    if (a.length > 0) {
      this.setState({ errors: a });
    } else {
      console.log('before transaction');
      db.transaction(tx => {
        const query = `INSERT INTO usuarios (email, senha) VALUES ('${this.state.email}', '${md5(this.state.confirmSenha)}');`
        tx.executeSql(query, [], (t, result) => {
          console.log('inserido com sucesso: ' + result);
          let msg = "Inserido com sucesso!"
          this.setState({ success: [{ key: msg, message: msg }] });
          Alert.alert(
            "Success",
            "User sussccessfully registered!",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => this.props.navigation.navigate('Sign in') }
            ]
          );
        }, (sqlError) => {
          this.setState((prevState) => {
            let msg = "Unable to register user."
            return { errors: [...prevState.errors, { key: msg, message: msg }] }
          });
        }
        );
      }, (txError) => {
        console.log('tx error ')
        console.log(txError)
      }, () => {
        console.log('sucesso na transação')
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          textContentType='emailAddress'
          onChangeText={(text) => this.emailChanged(text)}
          onFocus={() => this.setState({ email: '' })}
        />
        <TextInput
          style={styles.input}
          value={this.state.senha}
          placeholder='Enter the password'
          onChangeText={text => this.passwordChanged(text)}
          autoCorrect={false}
          secureTextEntry={true}
          onFocus={() => this.setState({ senha: '' })}
        />
        <TextInput
          style={styles.input}
          value={this.state.confirmSenha}
          placeholder='Enter the password'
          onChangeText={text => this.confirmPasswordChanged(text)}
          autoCorrect={false}
          secureTextEntry={true}
          onFocus={() => this.setState({ confirmSenha: '' })}
        />

        <View style={styles.rowContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.isEnabled() ? "#0373F3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.toggleSwitch()}
            value={this.isEnabled()}
          />
          <Text style={{ marginLeft: 5 }}>
           I have read and accept the terms of service.
          </Text>
        </View>

        <TouchableHighlight
          style={[styles.btn, styles.columnContainer]}
          onPress={this.validate}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableHighlight>
        {!!this.state.errors.length &&
          <ErrorListComponent
            icone="alert-circle"
            color="red"
            data={this.state.errors}
          />
        }
      
        {!!this.state.success.length &&
          <ErrorListComponent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
            icone="check-circle"
            color="blue"
            data={this.state.success}
          />
        }
      </View>
    );
  }
}

export default SignupScreen;