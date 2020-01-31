import React, {useState, useEffect, useRef} from 'react';
import { Text, View, Button, ImageBackground, TextInput, FlatList, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {dbInit, dbVerify, dbReadDatasets, dbDeleteAtIndex, dbIndex, dbCopyImage, dbWriteDatasets } from '../../src/database.js';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function CameraScreen(){
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    return (
        <Subscribe to = {[GlobalContainer]}>
            {gc => {
                if(hasPermission){
                    return(
                        <View style={{ flex: 1 }}>
                        <Button title='Go Home' onPress={()=>{gc.setScreen("home")}}></Button>
                        <Button title={`Back to ${gc.state.currentDataset.name}`} onPress={()=>{gc.setScreen("View Dataset")}}></Button>
                        <View><Text style={styles.title}>Add a photo to {gc.state.currentDataset.name}</Text></View>
                        <Camera style={{ flex: 1 }} type={type}   ref={cameraRef}>
                        </Camera>
                        <View style={styles.csPicture}><Button title="Take Picture" onPress = {async () => {
                            let data = await dbReadDatasets();

                            let imageData = await cameraRef.current.takePictureAsync();
                            let imageName = `${gc.state.currentDataset.name}${gc.state.currentDataset.images.length}`;
                            await dbCopyImage(imageData.uri, imageName);

                            let currentDatasetIndex = await dbIndex(gc.state.currentDataset.name)
                            data.datasets[currentDatasetIndex].images.push({
                                "uri": imageData.uri,
                                "tag": undefined,
                            })

                            gc.setDataset(data.datasets[currentDatasetIndex]);
                            await dbWriteDatasets(data);

                            gc.setScreen("View Dataset");
                        }}/></View>
                      </View>
                    )
                } else {
                    return(<Text>There was a problem displying the camera</Text>)
                }
            }}
        </Subscribe>
    );
}