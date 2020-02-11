import { Camera } from 'expo-camera';
import { Container } from './unstate';

export class GlobalContainer extends Container {
    state = {
      screen: 'home',
      loggedIn: false,
      currentDataset: {},
      cameraPermission: Camera.getPermissionsAsync(),
    }

    setScreen(newScreen) {
      this.setState({ screen: newScreen });
    }

    setDataset(newDataset) {
      this.setState({ currentDataset: newDataset });
    }

    setCameraPermission(newPermission) {
      this.setState({ cameraPermission: newPermission });
    }
}
