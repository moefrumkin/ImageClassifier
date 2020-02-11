import React, { useState } from 'react';
import { Text, View, Button, ImageBackground, TextInput } from 'react-native';
import { Provider, Subscribe } from '../unstate';
import { GlobalContainer } from '../container';
import { styles } from '../styles.js';

export function ScreenNotFound() {
  return (
    <Subscribe to={[GlobalContainer]}>
      {gc => (
        <View>
          <Text>
Sorry, but the screen '
            {gc.state.screen}
' does not exist
          </Text>
          <Button title="Go Home" onPress={() => { gc.setScreen('home'); }} />
          <View style={styles.ndInputs} />
        </View>
      )}
    </Subscribe>
  );
}
