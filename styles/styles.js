import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    columnContainer: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      alignContent: "center",
    },
    rowContainer: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flexDirection: 'row',
    },
    btn: {
      borderRadius: 10,
      backgroundColor: '#0373F3',
      width: 250,
      height: 30,
      margin: 5
    },
    btnGoogle: {
      borderRadius: 10,
      backgroundColor: 'white',
      width: 250,
      height: 30,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    btnFB: {
      borderRadius: 10,
      backgroundColor: '#3B5998',
      width: 250,
      height: 30,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    btnText: {
      color: "white",
      fontWeight: 'bold',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 36,
    },
    input: {
      height: 40,
      width: 250,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    line: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: 0.5,
    }
  });

  export default styles;