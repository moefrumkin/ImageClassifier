import React, {useState} from 'react';
import {dbInit, dbVerify, dbReadDatasets, dbWriteDatasets, dbIndex } from '../../src/database.js';
import { Text, View, Button, ImageBackground, TextInput } from 'react-native';
import { Provider, Subscribe } from '../../src/unstate';
import { GlobalContainer } from '../../src/container';
import { styles } from '../../src/styles.js';

export function NewDataset() {
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    return (
      <Subscribe to={[GlobalContainer]}>
        {gc => (
          <View> 
            <Button title="Go Home" onPress={() =>{ gc.setScreen("home")}}/>
            <View><Text style={styles.title}>New Dataset</Text></View>
            <View style={styles.ndInputContainer}>
              <TextInput
                style={styles.ndInput}
                placeholder="Dataset name"
                onChangeText={(text) => {setName(text)}}
                value={name}/>
              <TextInput
                style={styles.ndInput}
                placeholder="Dataset Tags"
                onChangeText={text => setTags(text)}
                value={tags}/>
            </View>
            <View style={styles.ndCreateDataset}><Button title="Create!" onPress={async ()=>{
                if(!await dbVerify()){
                  await dbInit();
                  alert("Database initialised");
                }

                let data = await dbReadDatasets();

                if((await dbIndex(name)) != null ){
                    alert(`A dataset already exists with the name '${name}'`)
                } else if(name == ""){
                    alert(`You cannot create a dataset with no name`);
                } else {
                    data.datasets.push({
                        "name": name,
                        "tags": tags.split(','),
                        "images": [],
                    });
    
                    await dbWriteDatasets(data);
                    alert(`A new dataset, '${name}', has been created`);
                    gc.setScreen("Review Datasets");
                }

              }}/></View>
          </View>
        )}
      </Subscribe>
    )
}