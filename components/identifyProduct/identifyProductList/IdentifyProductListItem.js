import React from 'react';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Text, withStyles, ListItem, Button} from 'react-native-ui-kitten';
import {CloseIconOutline} from '../../../assets/icons';

const width = Dimensions.get('window').width;

class IdentifyProductListItemComponent extends React.Component {
  addImageButton = () => {
    this.props.addImageButton(this.props.index);
  };

  removeImage = () => {
    this.props.removeImage(this.props.index);
  };

  render() {
    const {
      index,
      style,
      themedStyle,
      content,
      images,
      ...restProps
    } = this.props;

    return (
      <ListItem {...restProps} style={[themedStyle.container, style]}>
        <View style={themedStyle.detailsContainer}>
          <View style={themedStyle.imageRow}>
            {images[index] !== null ? (
              <View style={themedStyle.selectedImage}>
                <Image
                  style={themedStyle.image}
                  resizeMode="cover"
                  source={{uri: images[index].uri}}
                />
                <Button
                  style={themedStyle.closeButton}
                  size="small"
                  activeOpacity={0.95}
                  icon={CloseIconOutline}
                  onPress={this.removeImage}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={themedStyle.upload}
                onPress={this.addImageButton}>
                <Text appearance="hint" style={themedStyle.text}>
                  {content.text}
                </Text>
              </TouchableOpacity>
            )}
            <View style={themedStyle.imageContainer}>
              <Image
                style={themedStyle.image}
                resizeMode="contain"
                source={content.image}
              />
            </View>
          </View>
        </View>
      </ListItem>
    );
  }
}

export const IdentifyProductListItem = withStyles(
  IdentifyProductListItemComponent,
  theme => ({
    container: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexDirection: 'column',
      borderRadius: 12,
    },
    detailsContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: theme['background-basic-color-1'],
      marginTop: 16,
    },
    imageContainer: {
      width: '50%',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageRow: {
      width: '100%',
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    upload: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 2 - 48,
      height: width / 2 - 48,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: '#C5CEE0',
      borderRadius: 1,
    },
    selectedImage: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width / 2 - 48,
      height: width / 2 - 48,
      borderRadius: 1,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderColor: theme['color-danger-default'],
      backgroundColor: theme['color-danger-default'],
      position: 'absolute',
      alignSelf: 'flex-end',
      top: -15,
      right: -15,
    },
    text: {
      textAlign: 'center',
    },
  }),
);
