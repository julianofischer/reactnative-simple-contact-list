import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    columnContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    rowContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    btn: {
      borderRadius: '10px',
      backgroundColor: '#0373F3',
      width: '250px',
      height: '30px',
      margin: '5px'
    },
    btnGoogle: {
      borderRadius: '10px',
      backgroundColor: 'white',
      width: '250px',
      height: '30px',
      margin: '5px',
      borderColor: 'black',
      borderWidth: 1,
    },
    btnFB: {
      borderRadius: '10px',
      backgroundColor: '#3B5998',
      width: '250px',
      height: '30px',
      margin: '5px',
      borderColor: 'black',
      borderWidth: 1,
    },
    btnText: {
      color: "white",
      fontWeight: 'bold',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '36px',
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
      width: '50%'
    }
  });

  export default styles;