import { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, TextInput, Dimensions } from 'react-native';
import ErrorListComponent from './ErrorListComponent';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

    insere = () => {
        db.transaction(tx => {
            //tx.executeSql("DROP TABLE usuarios;");
            let query = `INSERT INTO contatos (nome, telefone) VALUES (?, ?);`;
            console.log(query);
            tx.executeSql(query, [this.state.nome, this.state.telefone], (t, r) => {
                let msg = "Contato inserido com sucesso!"
                this.setState({ success: [{ key: msg, message: msg }] });
                console.log(msg);
                this.props.navigation.navigate('List contacts', {update: true});
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
                        onFocus={()=>this.setState({nome: ''})}
                    />

                    <TextInput
                        style={styles.input}
                        value={this.state.telefone}
                        onChangeText={(text) => this.telefoneChanged(text)}
                        onFocus={()=>this.setState({telefone: ''})}
                    />

                    <TouchableHighlight
                        style={[styles.btn, styles.columnContainer]}
                        onPress={this.insere}
                    >
                        <Text style={styles.btnText}>Adicionar</Text>
                    </TouchableHighlight>
                </View>

                {/*<ErrorListComponent
                    icone="check-circle"
                    color="blue"
                    data={this.state.success}
                />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        marginTop: windowHeight * 0.1,
        marginBottom: windowHeight * 0.01,
        marginLeft: windowWidth * 0.01,
        marginRight: windowWidth * 0.01,
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
        fontSize: windowHeight * 0.03,
        marginLeft: windowWidth * 0.05,
        marginBottom: windowHeight * 0.03
    },
    btn: {
        borderRadius: 10,
        backgroundColor: '#0373F3',
        width: 250,
        height: 30,
        margin: 5
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