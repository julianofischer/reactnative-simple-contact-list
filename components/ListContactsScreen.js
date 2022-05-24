import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
import { Directions } from 'react-native-gesture-handler';
const db = SQLite.openDatabase('fooapp.db');
import { Dimensions } from 'react-native';
import { Platform } from 'react-native-web';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
            <TouchableHighlight 
            underlayColor="#DDD"
            onPress={this.onPressCallback}>
                <>
                    <View style={styles.rowContainer}>
                        <View style={styles.itemColumn}>
                            <Text style={styles.txtName}>{this.props.name}</Text>
                            <Text style={styles.txtPhone}>{this.props.phone}</Text>
                        </View>
                        <Icon name="subdirectory-arrow-right" size={20} color="gray" ></Icon>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 1,
                            //width: "95vw",
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
        console.log('constructor')
        db.transaction(tx => {
            let q = "SELECT * FROM contatos;";
            tx.executeSql(q, [], (t, results) => {
                console.log(Platform.OS)
                if (Platform.OS === 'android') {
                    this.setState({ data: results.rows._array });
                    console.log('DATA: ' + results.rows._array)
                } else {
                    this.setState({ data: results.rows._array });
                }
            }, (t, error) => {
                console.log("Erro ao buscar contatos");
                console.log(error)
            });
        });
        console.log(this.props);
    }

    renderContactItem = ({ item }) => {
        if (item) {
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
    }

    renderSeparator = () => (
        <View
          style={{
            backgroundColor: 'black',
            height: 0.5,
          }}
        />
      );

    buttonPressed = () => {
        this.props.navigation.navigate('Add Contact');
    }
    render() {
        return (
            <View style={[styles.column, {scrollEnabled: true}]}>
                <Text style={styles.title}>Contato</Text>
                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    style={[styles.list]}
                    data={this.state.data}
                    renderItem={this.renderContactItem}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <TouchableHighlight
                    style={[styles.btn, styles.columnContainer]}
                    onPress={this.buttonPressed}
                >
                    <Text style={styles.btnText}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: windowHeight / 100,
        marginBottom: windowHeight / 100,
        marginLeft: windowWidth / 100,
        marginRight: windowHeight / 100,
        alignContent: 'center',
        flexDirection: 'row',
    },
    list:{
        width: windowWidth*.8,
    },
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    itemColumn: {
        display: "flex",
        justifyContent: "flex-start"
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
        justifyContent: "space-between",
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
        fontSize: 0.03 * windowHeight,
        marginLeft: 0.05 * windowWidth,
        marginBottom: 0.02 * windowHeight
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
});

export default ListContactsScreen;