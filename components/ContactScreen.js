import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                <Text style={styles.txtTitle}>Contato</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.columnContainer}>
                        <Text style={styles.txtName}>{this.props.name}</Text>
                        <Text style={styles.txtPhone}>{this.props.phone}</Text>
                    </View>
                    <TouchableHighlight onPress={this.editPressed}><Text style={styles.editBtn}>edit</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.deletePressed}><Text style={styles.deleteBtn}>delete</Text></TouchableHighlight>
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
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
    },
    txtTitle: {
        color: 'black',
        fontSize: '10vw',
    },
    txtName: {
        fontWeight: "bold",
        fontSize: '8vw'
    },
    txtPhone: {
        color: 'gray',
        fontSize: '5.5vw',
    },
    editBtn: {
        borderRadius: '5px',
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        width: '13vw',
        fontSize: '4.0vw',
        margin: '10px',
        padding: '8px'
    },
    deleteBtn: {
        borderRadius: '5px',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        width: '16vw',
        fontSize: '4.0vw',
        padding: '8px'
    },
    btn: {
        height: '5vw'
    }
});
export default ContactScreen;