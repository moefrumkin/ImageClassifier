import React, {useState} from 'react';
import { Text, View, Button, ImageBackground, TextInput } from 'react-native';

import { Provider, Subscribe } from './src/unstate';
import { GlobalContainer } from './src/container';
import { styles } from './src/styles.js';

import { dbInit, dbVerify } from './src/database.js';

import { HomeScreen } from './src/screens/home.js';
import { NewDataset } from './src/screens/newDataset.js';
import { ReviewDatasets } from './src/screens/reviewDatasets.js';
import { ViewDataset } from './src/screens/viewDataset.js';
import { CameraScreen } from './src/screens/camera.js';

import { ScreenNotFound } from './src/screens/screenNotFound.js';


export default function App() {
  return (
    <Provider>
      <Subscribe to={[GlobalContainer]}>
        {gc => {
          switch(gc.state.screen){
            case "home":
              return <HomeScreen/>;
            break;
            case "New Dataset":
              return <NewDataset/>;
            break;
            case "Review Datasets":
              return <ReviewDatasets/>;
            break;
            case "View Dataset":
              return <ViewDataset/>;
            break;
            case "Camera Screen":
              return <CameraScreen/>;
            default:
              return <ScreenNotFound/>;
          }
        }}
      </Subscribe>
    </Provider>
  );
}