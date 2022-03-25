import React from 'react';
import {View, Platform} from 'react-native';
import RNCamera from 'react-native-camera';
import CameraToolbar from '../../components/camera/CameraToolbar';
import styles from '../../components/camera/styles';

const DESIRED_RATIO = '16:9';

export default class CameraScreen extends React.Component {
  camera = null;

  state = {
    capture: null,
    capturing: null,
    ratio: DESIRED_RATIO,
    cameraType: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find(ratio => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];

      this.setState({ratio});
    }
  };

  setFlashMode = flashMode => this.setState({flashMode});
  setCameraType = cameraType => this.setState({cameraType});

  handleShortCapture = async () => {
    if (this.camera) {
      this.setState({capturing: true});

      const photoData = await this.camera.takePictureAsync();
      this.camera.pausePreview();

      if (photoData) {
        this.setState({capturing: false});
        const {navigation} = this.props;
        navigation.goBack();
        navigation.state.params.setPicture(photoData);
      } else {
        this.setState({capturing: false});
        this.camera.resumePreview();
      }
    }
  };

  render() {
    const {flashMode, cameraType, capturing, ratio} = this.state;

    return (
      <React.Fragment>
        <View>
          <RNCamera
            ratio={ratio}
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            onCameraReady={this.prepareRatio}
            ref={camera => (this.camera = camera)}
          />
        </View>
        <CameraToolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
