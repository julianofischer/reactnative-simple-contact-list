import { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, TextInput } from 'react-native';
import ErrorListComponent from './ErrorListComponent';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');

class AddContactScreen extends Component {
    componentDidMount() {
        db.transaction(tx => {
          //tx.executeSql("DROP TABLE usuarios;");
          tx.executeSql("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT);");
        }, error => {
          console.log("error call back : " + JSON.stringify(error));
          console.log(error);
        }, () => {
          console.log('table created')
        });
      }

    state = {
        nome: 'Digite o nome',
        telefone: 'Digite o telefone',
        success: [],
    }

    insere = () =>{
        db.transaction(tx => {
           //tx.executeSql("DROP TABLE usuarios;");
           let query = `INSERT INTO contatos (nome, telefone) VALUES (?, ?);`;
           tx.executeSql(query, [this.state.nome, this.state.telefone], (t, r) => {
               let msg = "Contato inserido com sucesso!"
               this.setState({success: [{key: msg, message: msg}]});
           }, (t, error) => { 
               console.log(error);
           }
           );
        })
    }

    nomeChanged = (text) => {
        this.setState({ nome: text });
    }

    telefoneChanged = (text) => {
        this.setState({ telefone: text });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cadastrar Contatos</Text>
                <View style={styles.columnContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.nome}
                        onChangeText={(text) => this.nomeChanged(text)}
                    />

                    <TextInput
                        style={styles.input}
                        value={this.state.telefone}
                        onChangeText={(text) => this.telefoneChanged(text)}
                    />

                    <TouchableHighlight
                        style={[styles.btn, styles.columnContainer]}
                        onPress={this.insere}
                    >
                        <Text style={styles.btnText}>Continuar</Text>
                    </TouchableHighlight>
                </View>

                <ErrorListComponent
                    icone="check-circle"
                    color="blue"
                    data={this.state.success}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        marginTop: "1vh",
        marginBottom: "1vh",
        marginLeft: "1vw",
        marginRight: "1vw",
        alignContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    column: {
        display: "flex",
        justifyContent: "center",
    },
    rowContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
    },
    txtName: {
        fontWeight: "bold",
    },
    txtPhone: {
        color: 'gray',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '3vh',
        marginLeft: '5vw',
        marginBottom: '2vh'
    },
    btn: {
        borderRadius: '10px',
        backgroundColor: '#0373F3',
        width: '250px',
        height: '30px',
        margin: '5px'
    },
    btnText: {
        color: "white",
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddContactScreen;