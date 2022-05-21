import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
import { Directions } from 'react-native-gesture-handler';
const db = SQLite.openDatabase('fooapp.db');

class ContactItemComponent extends Component {
    onPressCallback = () => {
        let name, phone, myKey;
        name = this.props.name;
        phone = this.props.phone;
        myKey = this.props.myKey; //key is never a prop
        console.log(this.props);
        this.props.navigation.navigate('Contact details', {
            name: name,
            phone: phone,
            myKey: myKey,
        });
    }
    render() {
        return (
            <TouchableHighlight onPress={this.onPressCallback}>
                <>
                    <View style={styles.rowContainer}>
                        <View style={[styles.columnContainer, { width: '50vw' }]}>
                            <Text style={styles.txtName}>{this.props.name}</Text>
                            <Text style={styles.txtPhone}>{this.props.phone}</Text>
                        </View>
                        <Icon name="subdirectory-arrow-right" size={20} color="gray" ></Icon>
                    </View>
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
                </>
            </TouchableHighlight>
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
                this.setState({ data: results.rows });
            }, (t, error) => {
                console.log("Erro ao buscar contatos");
            });
        });
        console.log(this.props);
    }

    renderContactItem = ({ item }) => {
        return (
            <ContactItemComponent
                name={item.nome}
                phone={item.telefone}
                key={item.id}
                myKey={item.id}
                navigation={this.props.navigation}
            />
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
        flex: 1,
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
        flex: 1,
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
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