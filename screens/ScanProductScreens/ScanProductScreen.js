import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import {Button, Text} from 'react-native-ui-kitten';
import {RNCamera} from 'react-native-camera';
import {ContainerView, Loader} from '../../components/common';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');
const DESIRED_RATIO = '16:9';

export default class ScanProductScreen extends React.Component {
  state = {
    hasCameraPermission: undefined,
    error: {
      message: null,
      code: null,
    },
    product: null,
    focusedScreen: false,
    ratio: DESIRED_RATIO,
  };

  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find(val => val === DESIRED_RATIO) || ratios[ratios.length - 1];

      this.setState({ratio});
    }
  };

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
      this._checkPermissionsAsync();
      this.setState({focusedScreen: true});
    });
    navigation.addListener('willBlur', () => {
      this.setState({focusedScreen: false});
      StatusBar.setBarStyle('dark-content');
    });
  }

  _checkPermissionsAsync = async () => {
    let error = {};
    if (Platform.OS === 'android') {
      await check(PERMISSIONS.ANDROID.CAMERA)
        .then(async result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              error = {
                code: 0,
                message:
                  'Lo sentimos :( No hemos podido reconocer ninguna cámara en tu dispositivo',
              };
              this.setState({error, hasCameraPermission: false});
              break;
            case RESULTS.DENIED:
              const askPermission = await request(PERMISSIONS.ANDROID.CAMERA);
              if (askPermission === 'granted') {
                this.setState({hasCameraPermission: true});
                break;
              }
              error = {
                code: 1,
                message:
                  'Para mantener un entorno donde todas las aplicaciones sean seguras, necesitamos pedirte permiso para utilizar la cámara. De esta forma podrás acceder al escáner de productos. ¡No te preocupes! Melone no almacena ni graba ningún tipo de imagen.',
              };
              this.setState({error, hasCameraPermission: false});
              break;
            case RESULTS.GRANTED:
              this.setState({hasCameraPermission: true});
              break;
            case RESULTS.BLOCKED:
              error = {
                code: 2,
                message:
                  'Para mantener un entorno donde todas las aplicaciones sean seguras, necesitamos pedirte permiso para utilizar la cámara. De esta forma podrás acceder al escáner de productos. ¡No te preocupes! Melone no almacena ni graba ningún tipo de imagen.',
              };
              this.setState({error, hasCameraPermission: false});
              break;
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else if (Platform.OS === 'ios') {
      await check(PERMISSIONS.IOS.CAMERA).then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            error = {
              code: 0,
              message:
                'Lo sentimos :( No hemos podido reconocer ninguna cámara en tu dispositivo',
            };
            this.setState({error, hasCameraPermission: false});
            break;
          case RESULTS.DENIED:
            const askPermission = await request(PERMISSIONS.IOS.CAMERA);
            if (askPermission === 'granted') {
              this.setState({hasCameraPermission: true});
              break;
            }
            error = {
              code: 1,
              message:
                'Para mantener un entorno donde todas las aplicaciones sean seguras, necesitamos pedirte permiso para utilizar la cámara. De esta forma podrás acceder al escáner de productos. ¡No te preocupes! Melone no almacena ni graba ningún tipo de imagen.',
            };
            this.setState({error, hasCameraPermission: false});
            break;
          case RESULTS.GRANTED:
            this.setState({hasCameraPermission: true});
            break;
          case RESULTS.BLOCKED:
            error = {
              code: 2,
              message:
                'Para mantener un entorno donde todas las aplicaciones sean seguras, necesitamos pedirte permiso para utilizar la cámara. De esta forma podrás acceder al escáner de productos. ¡No te preocupes! Melone no almacena ni graba ningún tipo de imagen.',
            };
            this.setState({error, hasCameraPermission: false});
            break;
        }
      });
    }
  };

  handleBarCodeScanned = ({type, data}) => {
    this.camera.pausePreview();
    StatusBar.setBarStyle('dark-content');
    this.props.navigation.navigate('ProductScreen', {
      itemRef: data,
      scanned: true,
      resetState: this.resetState,
    });
  };

  resetState = () => {
    if (this.state.focusedScreen) {
      this.camera.resumePreview();
    }
  };

  changeStatuBar = () => {
    this.state.hasCameraPermission
      ? StatusBar.setBarStyle('light-content')
      : StatusBar.setBarStyle('dark-content');
  };

  render() {
    const {hasCameraPermission, focusedScreen, ratio, error} = this.state;

    if (!hasCameraPermission) {
      return (
        <ContainerView contentContainerStyle={styles.permissionContainer}>
          {this.changeStatuBar()}
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/illustrations/undraw_camera_mg5h.png')}
              resizeMode="contain"
              style={styles.imageHeader}
            />
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationText} appearance="hint">
              {error.message}
            </Text>
            {error.code === 1 ? (
              <Button onPress={() => this._checkPermissionsAsync()}>
                Acceder a la cámara
              </Button>
            ) : error.code === 2 ? (
              <Button onPress={() => openSettings()}>Habilitar permisos</Button>
            ) : null}
          </View>
        </ContainerView>
      );
    } else if (focusedScreen) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'android' ? (
            <RNCamera
              ratio={ratio}
              ref={ref => {
                this.camera = ref;
              }}
              onBarCodeRead={this.handleBarCodeScanned}
              style={styles.container}
            />
          ) : (
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              onBarCodeRead={this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/scan_border.png')} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.centerContainer}>
          <Loader size={80} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  permissionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F9FC',
    minHeight: height,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: height / 2,
    paddingTop: 80,
  },
  imageHeader: {
    width: width - 32,
    height: '100%',
  },
  informationContainer: {
    position: 'absolute',
    top: height / 2,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  informationText: {
    textAlign: 'center',
    marginBottom: 42,
  },
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: height / 3,
  },
});
