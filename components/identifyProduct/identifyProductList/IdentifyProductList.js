import React from 'react';
import {Layout, Button, List, withStyles} from 'react-native-ui-kitten';
import {ContainerView} from '../../common';
import {IdentifyProductListItem} from './IdentifyProductListItem';

class IdentifyProductListComponent extends React.Component {
  addImageButton = index => {
    this.props.addImageButton(index);
  };

  removeImage = index => {
    this.props.removeImage(index);
  };

  saveProduct = () => {
    this.props.saveProduct();
  };

  renderItem = info => {
    const {themedStyle, images} = this.props;

    return (
      <IdentifyProductListItem
        style={themedStyle.item}
        addImageButton={this.addImageButton}
        content={info.item}
        images={images}
        removeImage={this.removeImage}
      />
    );
  };

  render() {
    const {themedStyle, disableButton, loading, content} = this.props;
    return (
      <ContainerView>
        <List
          contentContainerStyle={themedStyle.container}
          data={content}
          renderItem={this.renderItem}
        />
        <Layout style={themedStyle.buttonContainer}>
          <Button
            onPress={this.saveProduct}
            disabled={disableButton || loading}>
            Enviar producto
          </Button>
        </Layout>
      </ContainerView>
    );
  }
}

export const IdentifyProductList = withStyles(
  IdentifyProductListComponent,
  theme => ({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme['background-basic-color-2'],
    },
    item: {
      marginVertical: 8,
      backgroundColor: theme['background-basic-color-1'],
    },
    buttonContainer: {
      marginHorizontal: 16,
      marginBottom: 16,
    },
  }),
);
