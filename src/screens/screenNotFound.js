import React, {useState} from 'react';
import { Text, View, Button, ImageBackground, TextInput } from 'react-native';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function ScreenNotFound() {
    return (
      <Subscribe to={[GlobalContainer]}>
        {gc =>(
          <View>
            <Text>Sorry, but the screen '{gc.state.screen}' does not exist</Text>
            <Button title='Go Home' onPress={()=>{gc.setScreen("home")}}></Button>
            <View style={styles.ndInputs}>
            </View>
          </View>
        )}
      </Subscribe>
    )
  }