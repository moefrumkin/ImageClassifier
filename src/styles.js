import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    homeTitle: {
      fontSize: 40,
      margin:20,
      textAlign: 'center',
      backgroundColor: '#aaa',
      width: '100%',
    },
    buttonContainer: {
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      color: '#aaa',
      backgroundColor: '#aaa',
      margin: '2%',
      borderRadius: 5
    },
    title: {
      fontSize: 40,
      textAlign: 'center',
      backgroundColor: '#aaa',
      width: '100%',
    },
    ndInputContainer: {
      justifyContent: "center",
      alignItems: 'center',
    },
    ndInput: {
      marginTop:20,
      fontSize:20,
    },
    ndCreateDataset: {
      color: '#aaa',
      backgroundColor: '#aaa',
      margin: '2%',
      borderRadius: 5,
      width: '50%',
      marginLeft: '25%',
    },
    rdItem:{
      flex: 1,
      backgroundColor: '#ddd',
      margin: '2.5%',
      marginLeft: '20%',
      width: '60%',
      borderRadius: 7,
    },
    rdTitle:{
      textAlign: 'center',
      fontSize: 25,
    },
    rdBody: {
      textAlign: 'center',
    },
    vdList:{
      alignItems: 'center',
      backgroundColor: '#ccc',
    },
    vdTag: {
      margin: 4,
      fontSize: 15,
    },
    vdTakePhoto: {
      marginTop: 5,
      backgroundColor: '#eee',
      marginLeft: '15%',
      width: '70%',
      borderRadius: 20,
    },
    csPicture: {
      backgroundColor: '#aaa',
      position: 'absolute',
      borderRadius: 5,
      top: '94%',
      left: '0%',
      width: '100%',
    },
  });