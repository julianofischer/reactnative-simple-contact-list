import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');

const Stack = createNativeStackNavigator();

class ContactItemComponent extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight>
                    <View style={styles.rowContainer}>
                        <View style={styles.columnContainer}>
                            <Text style={styles.txtName}>{this.props.name}</Text>
                            <Text style={styles.txtPhone}>{this.props.phone}</Text>
                        </View>
                        <Icon name="subdirectory-arrow-right" size={20} color="gray" ></Icon>
                    </View>
                </TouchableHighlight>
                <View
                    style={{
                        borderBottomColor: 'lightgray',
                        borderBottomWidth: 1,
                        width: "95vw",
                        marginTop: 5,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                />
            </View>
        )
    }
}

class ListContactsScreen extends Component {
    state = {
        data: [],
    }
    componentDidMount() {
        db.transaction(tx => {
            let q = "SELECT * FROM contatos;";
            tx.executeSql(q, [], (t, results) => {
                this.setState({data: results.rows});
            }, (t, error) => {
                console.log("Erro ao buscar contatos");
            });
        });
    }

    renderContactItem = ({ item }) => {
        return (
            <View >
                <ContactItemComponent
                    name={item.nome}
                    phone={item.telefone}
                    key={item.id}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.column}>
                <Text style={styles.title}>Contatos</Text>
                <FlatList
                    style={styles.container}
                    data={this.state.data}
                    renderItem={this.renderContactItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: "1vh",
        marginBottom: "1vh",
        marginLeft: "1vw",
        marginRight: "1vw",
        alignContent: 'center',
        flexDirection: 'row',
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
});

export default ListContactsScreen;