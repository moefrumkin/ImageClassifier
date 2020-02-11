import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
// eslint-disable-next-line import/extensions
import { dbReadDatasets, dbIndex, dbCopyImage, dbWriteDatasets } from '../database.js';
import { Subscribe } from '../unstate';
import { GlobalContainer } from '../container';
// eslint-disable-next-line import/extensions
import { styles } from '../styles.js';

export function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const [tag, setTag] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <Subscribe to={[GlobalContainer]}>
      {(gc) => {
        if (hasPermission) {
          return (
            <View style={{ flex: 1 }}>
              <Button title="Go Home" onPress={() => { gc.setScreen('home'); }} />
              <Button title={`Back to ${gc.state.currentDataset.name}`} onPress={() => { gc.setScreen('View Dataset'); }} />
              <View>
                <Text style={styles.title}>
                  Add a photo to
                  {' '}
                  {gc.state.currentDataset.name}
                </Text>
              </View>
              <Camera style={{ flex: 1 }} type={type} ref={cameraRef} />
              <View style={styles.csPicture}>
                <Button
                  title="Take Picture"
                  onPress={async () => {
                    const data = await dbReadDatasets();

                    const imageData = await cameraRef.current.takePictureAsync();
                    const imageName = `${gc.state.currentDataset.name}${gc.state.currentDataset.images.length}`;
                    await dbCopyImage(imageData.uri, imageName);

                    const currentDatasetIndex = await dbIndex(gc.state.currentDataset.name);
                    data.datasets[currentDatasetIndex].images.push({
                      uri: imageName,
                      tag: undefined,
                    });

                    gc.setDataset(data.datasets[currentDatasetIndex]);
                    await dbWriteDatasets(data);

                    gc.setScreen('View Dataset');
                  }}
                />
              </View>
            </View>
          );
        }
        return (<Text>There was a problem displying the camera</Text>);
      }}
    </Subscribe>
  );
}
