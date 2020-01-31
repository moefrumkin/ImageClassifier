import React, {useState} from 'react';
import {dbInit, dbVerify, dbReadDatasets, dbWriteDatasets, dbIndex, dbImageURI } from '../../src/database.js';
import { Text, View, Button, ImageBackground, TextInput, FlatList, Image } from 'react-native';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function ViewDataset(){  
    return (
        <Subscribe to={[GlobalContainer]}>
            {gc =>(
                <View>
                    <Button title='Go Home' onPress={()=>{gc.setScreen("home")}}></Button>
                    <Button title='Datasets' onPress={()=>{gc.setScreen("Review Datasets")}}></Button>
                    <View><Text style={styles.title}>{gc.state.currentDataset.name}</Text></View>
                    <View style={styles.vdList}><FlatList horizontal={true} data = {gc.state.currentDataset.tags} renderItem = {({item}) =>(
                        <View><Text style={styles.vdTag}>{item}</Text></View>
                    )}/></View>
                    <View style = {styles.vdTakePhoto}><Button title='Take Photo' onPress = {() => gc.setScreen('Camera Screen')}/></View>
                    <FlatList data = {gc.state.currentDataset.images} renderItem = {({name}) => (
                        <Image source={}/>
                    )}/>
                </View>
            )}
        </Subscribe>
    )
}