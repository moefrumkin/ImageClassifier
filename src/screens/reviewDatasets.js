import React, {useState, useEffect} from 'react';
import {dbInit, dbVerify, dbReadDatasets, dbDeleteAtIndex, dbIndex } from '../../src/database.js';
import { Text, View, Button, ImageBackground, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function ReviewDatasets() {

    const [data, setData] = useState({});
    useEffect(() => {
        dbReadDatasets().then(setData);
    }, []);

    if(data == {}){
        return (
            <Subscribe to = {[GlobalContainer]}>
                {gc => (
                    <View>
                        <Button title='Go Home' onPress={()=>{gc.setScreen("home")}}></Button>
                        <View><Text  style={styles.title}> Loading Datasets </Text></View>
                    </View>
                )}
            </Subscribe>
        )
    } else {
        return(
            <Subscribe to = {[GlobalContainer]}>
                {gc => (
                    <View>
                        <Button title='Go Home' onPress={()=>{gc.setScreen("home")}}></Button>
                        <View><Text  style={styles.title}> Review Datasets </Text></View>
                        <ScrollView>
                            <FlatList
                                data={data.datasets}
                                renderItem={({item}) => (
                                    <View style = {styles.rdItem}>
                                        <Text style = {styles.rdTitle}>{item.name}</Text>
                                        <Text style = {styles.rdBody}>{item.tags.join(', ')}</Text>
                                        <Text style = {styles.rdBody}>{`${item.images.length} images so far`}</Text>
                                        <Button title='View Dataset' onPress = {async () => {
                                            gc.setDataset(item)
                                            gc.setScreen("View Dataset");
                                        }}/>
                                        <Button color='#f00' title="Delete" onPress = {()=>{
                                            Alert.alert(`Delete?`, `Are you sure you want to delete '${item.name}'?`, [
                                                {text: 'No'},
                                                {text: 'Yes', onPress: async () => {
                                                    await dbDeleteAtIndex(await dbIndex(item.name))
                                                    setData(await dbReadDatasets());
                                                }}
                                            ]);
                                        }}></Button>
                                    </View>
                                )}/>
                        </ScrollView>
                    </View>
                )}
            </Subscribe>
        );
    }
}