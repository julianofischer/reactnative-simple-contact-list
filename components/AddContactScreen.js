import { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, TextInput, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class AddContactScreen extends Component {
    state = {
        nome: 'Digite o nome',
        telefone: 'Digite o telefone',
        success: [],
        key: undefined,
        btnLabel: 'Add',
        title: 'Add Contact',
        editMode: false,
    }

    componentDidMount() {
        console.log(this.props.route.params);
        if (this.props.route.params) {
            let contact = this.props.route.params.contact
            console.log(contact);
            this.setState({
                nome: contact.name,
                telefone: contact.phone,
                key: contact.key,
                btnLabel: 'Edit',
                title: 'Edit Contact',
                editMode: true,
            });
        }

        db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, telefone TEXT, user_id INTEGER);");
        }, error => {
            console.log("error call back : " + JSON.stringify(error));
            console.log(error);
        }, () => {
            console.log('table created')
        });
    }

    insere = () => {
        db.transaction(tx => {
            let query;
            let queryParams = [this.state.nome, this.state.telefone];
            let msgAction = ''
            if (this.state.editMode) {
                query = `UPDATE contatos SET nome=?, telefone=? WHERE id=?;`;
                queryParams.push(this.state.key);
                msgAction = 'updated'
            } else {
                query = `INSERT INTO contatos (nome, telefone, user_id) VALUES (?, ?, ?);`;
                queryParams.push(this.props.route.params.user_id);
                msgAction = 'inserted'
            }
            
            tx.executeSql(query, queryParams, (t, r) => {
                let msg = `Contact sussccesfully ${msgAction}!`
                this.setState({success: [{key: msg, message: msg }]});
                console.log(queryParams);
                this.props.navigation.navigate('List contacts', { update: true, user_id: this.props.route.params.user_id });
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
                <Text style={styles.title}>{this.state.title}</Text>
                <View style={styles.columnContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.nome}
                        onChangeText={(text) => this.nomeChanged(text)}
                        onFocus={() => !this.state.editMode ? this.setState({ nome: '' }) : ()=>{}}
                    />

                    <TextInput
                        style={styles.input}
                        value={this.state.telefone}
                        onChangeText={(text) => this.telefoneChanged(text)}
                        onFocus={() => !this.state.editMode ? this.setState({ telefone: '' }) : ()=>{}}
                    />

                    <TouchableHighlight
                        style={[styles.btn, styles.columnContainer]}
                        onPress={this.insere}
                    >
                        <Text style={styles.btnText}>{this.state.btnLabel}</Text>
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
        alignContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
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