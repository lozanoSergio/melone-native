import React from 'react';
import {View, StyleSheet, Image, Dimensions, BackHandler} from 'react-native';
import {Text, Button} from 'react-native-ui-kitten';
import {connect} from 'react-redux';
import {HeaderNavigation, Loader} from '../../components/common';
import {NutrimentInfo} from '../../components/product/NutrimentsInfo';
import {ArrowBackIconOutline} from '../../assets/icons';
import {
  fetchProduct,
  removeProduct,
} from '../../redux/scannedProduct/scannedProductActions';
import {addProductToHistory} from '../../redux/productHistory/productActions';

const mapState = state => ({
  product: state.scannedProduct,
  loading: state.async.loading,
});

const actions = {
  fetchProduct,
  removeProduct,
  addProductToHistory,
};

const {width, height} = Dimensions.get('window');

class ProductScreen extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    this.state = {isLoading: true, product: undefined};
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const itemRef = navigation.getParam('itemRef', null);
    const scanned = navigation.getParam('scanned', false);

    if (itemRef !== null) {
      this.props.fetchProduct(itemRef, scanned, this.props.addProductToHistory);
      this.setState({isLoading: false});
    }

    this._willBlurSubscription = navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener(
        'hardwareBackPress',

        this.onBackButtonPressAndroid,
      ),
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this.props.removeProduct();
  }

  onBackButtonPressAndroid = () => {
    const {navigation} = this.props;
    if (navigation.state.params.previous === true) {
      navigation.state.params.resetState();
    }
    navigation.goBack();
    return true;
  };

  render() {
    const {product} = this.props;
    const {isLoading} = this.props;

    if (product && product.status !== 0 && product.length !== 0) {
      return (
        <View style={styles.container}>
          <HeaderNavigation
            title={product.name}
            alignment="center"
            icon={ArrowBackIconOutline}
            onBackPress={this.onBackButtonPressAndroid}
            novaScore={product.novaScore}
          />
          <NutrimentInfo product={product} />
        </View>
      );
    } else if (product && product.status === 0 && !isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.backgroundContainer}>
            <HeaderNavigation
              icon={ArrowBackIconOutline}
              transparent
              onBackPress={this.onBackButtonPressAndroid}
            />
          </View>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/illustrations/undraw_not_found_60pq.png')}
              resizeMode="contain"
              style={styles.imageHeader}
            />
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.informationText} appearance="hint">
              ¡Vaya! Parece que este producto se esconde de nosotros. ¿Crees que
              deberiamos incluir tu producto? ¡Ayudanos a identificarlo en tres
              sencillos pasos!
            </Text>
            <Button
              onPress={() =>
                this.props.navigation.navigate('IdentifyProductScreen')
              }>
              Identificar Producto
            </Button>
            <Button
              style={styles.backButton}
              appearance="ghost"
              onPress={() => this.props.navigation.goBack()}>
              Volver a escanear
            </Button>
          </View>
        </View>
      );
    }

    return <Loader />;
  }
}

export default connect(
  mapState,
  actions,
)(ProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  backgroundContainer: {
    backgroundColor: '#F7F9FC',
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  noProductContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  imageHeader: {
    marginTop: -0,
    width: width - 32,
    height: '100%',
  },
  informationContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  informationText: {
    textAlign: 'center',
    marginBottom: 42,
  },
  backButton: {
    marginTop: 16,
  },
});
