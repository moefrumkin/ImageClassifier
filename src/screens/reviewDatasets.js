import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, Alert } from 'react-native';
// eslint-disable-next-line import/extensions
import { dbReadDatasets, dbDeleteAtIndex, dbIndex } from '../database.js';
import { Subscribe } from '../unstate';
import { GlobalContainer } from '../container';
// eslint-disable-next-line import/extensions
import { styles } from '../styles.js';

export function ReviewDatasets() {
  const [data, setData] = useState({});
  useEffect(() => {
    dbReadDatasets().then(setData);
  }, []);

  if (data === {}) {
    return (
      <Subscribe to={[GlobalContainer]}>
        {gc => (
          <View>
            <Button title="Go Home" onPress={() => { gc.setScreen('home'); }} />
            <View><Text style={styles.title}> Loading Datasets </Text></View>
          </View>
        )}
      </Subscribe>
    );
  }
  return (
    <Subscribe to={[GlobalContainer]}>
      {gc => (
        <View>
          <Button title="Go Home" onPress={() => { gc.setScreen('home'); }} />
          <View><Text style={styles.title}> Review Datasets </Text></View>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={data.datasets}
            renderItem={({ item }) => (
              <View style={styles.rdItem} key={item.name}>
                <Text style={styles.rdTitle}>{item.name}</Text>
                <Text style={styles.rdBody}>{item.tags.join(', ')}</Text>
                <Text style={styles.rdBody}>{`${item.images.length} images so far`}</Text>
                <Button
                  title="View Dataset"
                  onPress={async () => {
                    gc.setDataset(item);
                    gc.setScreen('View Dataset');
                  }}
                />
                <Button
                  color="#f00"
                  title="Delete"
                  onPress={() => {
                    Alert.alert('Delete?', `Are you sure you want to delete '${item.name}'?`, [
                      { text: 'No' },
                      { text: 'Yes',
                        onPress: async () => {
                          await dbDeleteAtIndex(await dbIndex(item.name));
                          setData(await dbReadDatasets());
                        } },
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
