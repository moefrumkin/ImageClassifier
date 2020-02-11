import React, { } from 'react';
import { Text, View, Button, ImageBackground } from 'react-native';
import { Subscribe } from '../unstate';
import { GlobalContainer } from '../container';
// eslint-disable-next-line import/extensions
import { styles } from '../styles.js';

export function HomeScreen() {
  return (
    <Subscribe to={[GlobalContainer]}>
      {gc => (
        <View style={styles.container}>
          <View style={styles.titleContainter}><Text style={styles.homeTitle}>Welcome to DataSet</Text></View>
          <ImageBackground source={require('../../assets/Citgo.jpg')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.buttonContainer}>
              <View style={styles.button}><Button title="Sign In" onPress={() => { gc.setScreen('Sign In'); }} /></View>
              <View style={styles.button}><Button title="Review Datasets" onPress={() => { gc.setScreen('Review Datasets'); }} /></View>
              <View style={styles.button}><Button title="Create New Dataset" onPress={() => { gc.setScreen('New Dataset'); }} /></View>
            </View>
          </ImageBackground>
        </View>
      )}
    </Subscribe>
  );
}
