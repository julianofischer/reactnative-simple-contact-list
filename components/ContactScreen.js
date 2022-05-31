import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('fooapp.db');

class ContactDetailComponent extends Component {
    editPressed = () => {
        console.log('edit pressed');
        Alert.alert(
            "Edit?",
            "Do you really want to edit?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        console.log('PROPS ON EDIT')
                        console.log(this.props);
                        let contact = {
                            name: this.props.name,
                            phone: this.props.phone,
                            key: this.props.my_key
                        }
                        this.props.navigation.navigate('Add Contact', {
                                contact: contact,
                            }
                        );
                    }
                }
            ]
        );
    }

    deletePressed = () => {
        Alert.alert(
            "Delete",
            "Do you really want to delete?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        db.transaction(tx => {
                            let q = `DELETE FROM contatos WHERE id=${this.props.my_key};`
                            console.log(q);
                            tx.executeSql(q);
                        }, error => {
                            console.log("error call back : " + JSON.stringify(error));
                            console.log(error);
                        }, (what) => {
                            this.props.navigation.navigate('List contacts');
                        });
                    }
                }
            ]
        );
    }

    render() {
        return (
            <View style={styles.columnContainer}>
                <Text style={styles.txtName}>{this.props.name}</Text>
                <Text style={styles.txtPhone}>{this.props.phone}</Text>

                <View style={styles.rowContainer}>
                    <TouchableHighlight
                        onPress={this.editPressed}
                        underlayColor="none">
                        <Text style={styles.editBtn}>edit</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="none"
                        onPress={this.deletePressed}>
                        <Text style={styles.deleteBtn}>delete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

class ContactScreen extends Component {
    state = {
        name: '',
        phone: '',
        key: '',
    }

    componentDidMount() {
        let name, phone, key;
        name = this.props.route.params.name;
        phone = this.props.route.params.phone;
        key = this.props.route.params.my_key;
        this.setState({ name: name, phone: phone, key: key });
    }

    render() {
        return (
            <ContactDetailComponent
                name={this.state.name}
                phone={this.state.phone}
                key={this.state.key}
                my_key={this.state.key}
                navigation={this.props.navigation}
            />
        );
    }
}

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: 'white',
        flex: 1,
    },
    rowContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
        flexDirection: "row",
    },
    txtName: {
        fontWeight: "bold",
        fontSize: windowWidth * 0.08,
    },
    txtPhone: {
        color: 'gray',
        fontSize: windowWidth * 0.05,
    },
    editBtn: {
        borderRadius: 5,
        backgroundColor: '#0373F3',
        color: 'white',
        textAlign: 'center',
        width: windowWidth * 0.18,
        fontSize: windowWidth * 0.04,
        margin: 2,
        padding: 8
    },
    deleteBtn: {
        borderRadius: 5,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        width: windowWidth * 0.18,
        fontSize: windowWidth * 0.04,
        padding: 8,
        margin: 2,
    },
    btn: {
        height: windowWidth * 0.05,
    }
});
export default ContactScreen;
