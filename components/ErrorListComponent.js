import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Dimensions, View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ErrorItemComponent extends Component {
    render() {
        return (
            <View style={styles.row}>
                <Icon name={this.props.icone} size={windowWidth*0.04} color={this.props.color}></Icon>
                <Text 
                    style={[styles.message, {color: this.props.color}]}
                >
                    {this.props.message}</Text>
            </View>
        )
    }
}

class ErrorListComponent extends Component {
    renderItem = ({ item }) => {
        return (
            <View style={styles.row}>
                <ErrorItemComponent
                    icone={this.props.icone}
                    color={this.props.color}
                    message={item.message}
                    key={item.message}
                />
            </View>
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    columnContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    message: {
        fontSize: windowWidth*0.03,
    },
});

export default ErrorListComponent;