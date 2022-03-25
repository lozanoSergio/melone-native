import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Loader} from '../../components/common';
import {connect} from 'react-redux';
import {Text} from 'react-native-ui-kitten';
import {ProductHistoryContainer} from '../../components/containers/productHistory/ProductHistoryContainer';
import {
  getProductHistory,
  removeFromHistory,
} from '../../redux/productHistory/productActions';

const hasNotch = DeviceInfo.hasNotchSync();

const mapState = state => ({
  products: state.products,
  loading: state.async.loading,
});

const actions = {
  getProductHistory,
  removeFromHistory,
};

const {width, height} = Dimensions.get('window');

class ProductHistoryScreen extends React.Component {
  state = {
    moreProducts: false,
    loadingInitial: true,
    loadedProducts: [],
    noProducts: false,
  };

  async componentDidMount() {
    let next = await this.props.getProductHistory();

    if (next && next.docs) {
      this.setState({
        moreProducts: true,
        loadingInitial: false,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {products} = this.props;

    if (products !== nextProps.products) {
      let merged = [...nextProps.products];

      merged &&
        merged.sort(function(a, b) {
          return new Date(b.last_scan) - new Date(a.last_scan);
        });

      this.setState({
        loadedProducts: [...merged],
      });
    } else if (products.length === 0) {
      this.setState({
        loadedProducts: [...nextProps.products],
      });
    }
  }

  getNextProducts = async () => {
    const {products} = this.props;

    if (products.length <= 3) {
      return;
    }
    let lastProduct = products && products[products.length - 1];
    let next = await this.props.getProductHistory(lastProduct);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreProducts: false,
      });
    }
  };

  onItemPress = code => {
    this.props.navigation.navigate('ProductScreen', {
      itemRef: code,
      previous: 'HistoryScreen',
    });
  };

  onRemoveProductPress = (index, product) => {
    const {loadedProducts} = this.state;
    const removeIndex = loadedProducts.indexOf(loadedProducts[index]);

    if (removeIndex > -1) {
      const updateProducts = loadedProducts;
      updateProducts.splice(removeIndex, 1);
      this.setState({loadedProducts: updateProducts});
    }

    this.props.removeFromHistory(product);
  };

  render() {
    const {loading} = this.props;
    const {loadedProducts, moreProducts, loadingInitial} = this.state;

    if (!loadingInitial && loadedProducts.length === 0) {
      return (
        <View style={styles.permissionContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/images/illustrations/undraw_time_management_30iu.png')}
              resizeMode="contain"
              style={styles.imageHeader}
            />
          </View>
          <View style={styles.informationContainer}>
            <Text
              style={{textAlign: 'center', marginBottom: 42}}
              appearance="hint">
              Aquí guardaremos los productos que vayas escaneando, cuando estes
              preparado comienza a escanear {'\n'} ¡Nosotros nos ocupamos del
              resto!
            </Text>
          </View>
        </View>
      );
    } else if (loadedProducts.length !== 0) {
      return (
        <>
          <View style={styles.container} />
          <ProductHistoryContainer
            products={loadedProducts}
            onItemPress={this.onItemPress}
            handleLoadMore={this.getNextProducts}
            loadMore={moreProducts}
            loading={loading}
            onRemoveProductPress={this.onRemoveProductPress}
          />
        </>
      );
    } else {
      return <Loader />;
    }
  }
}

export default connect(
  mapState,
  actions,
)(ProductHistoryScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: Platform.OS === 'ios' && hasNotch ? 42 : 21,
      android: StatusBar.currentHeight,
    }),
  },
  permissionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#F7F9FC',
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
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: height / 3,
  },
});
