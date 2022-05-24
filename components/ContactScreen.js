import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ContactDetailComponent extends Component {
    editPressed = () => {
        console.log('edit pressed');
        Alert.alert(
            "Editar",
            "Deseja mesmo editar?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    deletePressed = () => {
        console.log('delete pressed');
        Alert.alert(
            "Excluir",
            "Deseja mesmo excluir?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => console.log("OK Pressed") }
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
        key = this.props.route.params.key;
        this.setState({ name: name, phone: phone, key: key });
    }

    render() {
        return (
            <ContactDetailComponent
                name={this.state.name}
                phone={this.state.phone}
                key={this.state.key}
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
        backgroundColor: 'blue',
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