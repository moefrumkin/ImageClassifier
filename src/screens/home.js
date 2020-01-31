import React, {useState} from 'react';
import { Text, View, Button, ImageBackground, TextInput } from 'react-native';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function HomeScreen() {
  return (
    <Subscribe to={[GlobalContainer]}>
      {gc => (
        <View style={styles.container}>
          <View style={styles.titleContainter}><Text style={styles.homeTitle}>Welcome to DataSet</Text></View>
          <ImageBackground source={require('../../assets/Citgo.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}><Button title='Sign In' onPress={()=>{gc.setScreen("Sign In")}}></Button></View>
              <View style={styles.button}><Button title='Review Datasets' onPress={()=>{gc.setScreen("Review Datasets")}}></Button></View>
              <View style={styles.button}><Button title='Create New Dataset' onPress={()=>{gc.setScreen("New Dataset")}}></Button></View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Subscribe>
  );
}