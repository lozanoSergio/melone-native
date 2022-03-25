import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import {Layout, Text} from 'react-native-ui-kitten';
import {HeaderNavigation} from '../../components/common';
import {IdentifyProductList} from '../../components/identifyProduct/identifyProductList';
import {ArrowBackIconOutline} from '../../assets/icons';
import {Icon} from '../../components/UI/Icons';
import {saveNewProduct} from '../../services/productActions';
import ImagePicker from 'react-native-image-picker';

const width = Dimensions.get('window').width;

const options = {
  title: 'Elige una imagen',
  quality: 1.0,
  allowsEditing: false,
  mediaType: 'photo',
  maxWidth: 1024,
  maxHeight: 1024,
  storageOptions: {
    skipBackup: true,
  },
};

const content = [
  {
    image: require('../../assets/images/examples/product_front.jpg'),
    text: 'Toca para añadir una imagen principal del producto',
  },
  {
    image: require('../../assets/images/examples/nutrition.jpg'),
    text: 'Toca para añadir una imagen de la tabla nutricional',
  },
  {
    image: require('../../assets/images/examples/ingredients.jpg'),
    text: 'Toca para añadir una imagen de los ingredientes',
  },
];

class IdentifyProductScreen extends React.Component {
  state = {
    index: null,
    images: [null, null, null],
    disableButton: true,
    loading: false,
  };

  setImageType = (index, image) => {
    switch (index) {
      case 0:
        return {name: 'front_image', uri: image};
      case 1:
        return {name: 'nutrients_image', uri: image};
      case 2:
        return {name: 'ingredients_image', uri: image};
      default:
        return null;
    }
  };

  setPicture = async image => {
    const imageIndex = this.state.index;

    let imagesArr = this.state.images;
    imagesArr[imageIndex] = this.setImageType(imageIndex, image.uri);

    this.checkImages(imagesArr);
  };

  removeImage = index => {
    let imagesArr = this.state.images;
    imagesArr[index] = null;

    this.checkImages(imagesArr);
  };

  addImageButton = index => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        let imagesArr = this.state.images;
        imagesArr[index] = this.setImageType(index, response.uri);

        this.checkImages(imagesArr);
      }
    });
  };

  checkImages = images => {
    const check = images.indexOf(null);

    if (check === -1) {
      this.setState({disableButton: false, images});
    } else {
      this.setState({disableButton: true, images});
    }
  };

  saveProduct = async () => {
    this.setState({loading: true});

    const result = await saveNewProduct(this.state.images);

    if (result.type === 'success') {
      this.props.navigation.navigate('ThanksProductScreen');
    }

    if (result.type === 'error') {
      Alert.alert(
        'Error',
        'Se ha producido un error en la subida de archivos, porfavor vuelva a intentarlo más tarde.',
      );

      this.setState({loading: false});
    }
  };

  render() {
    const {images, disableButton, loading} = this.state;

    return (
      <View style={styles.container}>
        <HeaderNavigation
          title="Enviar un nuevo producto"
          alignment="center"
          icon={ArrowBackIconOutline}
          onBackPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <IdentifyProductList
          addImageButton={this.addImageButton}
          removeImage={this.removeImage}
          saveProduct={this.saveProduct}
          content={content}
          images={images}
          disableButton={disableButton}
          loading={loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  modalContainer: {
    width: width - 32,
    height: 200,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IdentifyProductScreen;
