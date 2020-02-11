import React, { } from 'react';
import { Text, View, Button, FlatList, Image, Alert } from 'react-native';
// eslint-disable-next-line import/extensions
import { dbReadDatasets, dbIndex, dbImageURI, dbDeleteImage } from '../database.js';
import { Subscribe } from '../unstate';
import { GlobalContainer } from '../container';
// eslint-disable-next-line import/extensions
import { styles } from '../styles.js';

export function ViewDataset() {
  return (
    <Subscribe to={[GlobalContainer]}>
      {gc => (
        <View>
          <Button title="Go Home" onPress={() => { gc.setScreen('home'); }} />
          <Button title="Datasets" onPress={() => { gc.setScreen('Review Datasets'); }} />
          <View><Text style={styles.title}>{gc.state.currentDataset.name}</Text></View>
          <View>
            <Text style={styles.vdImageCount}>
              {gc.state.currentDataset.images.length}
              {' '}
              {gc.state.currentDataset.images.length === 1 ? 'image' : 'images'}
              {' '}
              so far.
            </Text>
          </View>
          <View style={styles.vdList}>
            <FlatList
              horizontal
              data={gc.state.currentDataset.tags}
              renderItem={({ item }) => (
                <View key={item}><Text style={styles.vdTag}>{item}</Text></View>
              )}
            />
          </View>
          <View style={styles.vdTakePhoto}><Button title="Take Photo" onPress={() => gc.setScreen('Camera Screen')} /></View>
          <FlatList
            alignItems="center"
            contentContainerStyle={{ paddingBottom: 200, paddingTop: 20 }}
            data={gc.state.currentDataset.images}
            renderItem={({ item }) => (
              <View
                style={styles.vdImageContainer}
                key={item.uri}
              >
                <Image style={{ width: 200, height: 200 }} source={{ uri: dbImageURI(item.uri) }} key={item.uri} />
                <Button
                  title="Edit Tags"
                  onPress={() => {
                    Alert.alert()
                  }}
                />
                <Button
                  title="Delete"
                  color="#f00"
                  onPress={() => {
                    Alert.alert('Delete?', 'Are you sure you want to delete this Image?', [
                      { text: 'No' },
                      { text: 'Yes',
                        onPress: async () => {
                          await dbDeleteImage(gc.state.currentDataset.name, item.uri);
                          const currentDatasetIndex = await dbIndex(gc.state.currentDataset.name);
                          const updatedDataset = (await dbReadDatasets()).datasets[currentDatasetIndex];
                          await gc.setDataset(updatedDataset);
                        },
                      },
                    ]);
                  }}
                />
              </View>
            )}
          />
        </View>
      )}
    </Subscribe>
  );
}
