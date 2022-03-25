import React, {Component} from 'react';
import {withStyles} from 'react-native-ui-kitten';
import {LayoutList} from '../common/layoutList/LayoutList';

class ProductInfoComponent extends Component {
  onItemPress = index => {
    console.log(index);
  };
  render() {
    const {themedStyle, data} = this.props;
    return (
      <LayoutList
        contentContainerStyle={themedStyle.listContentContainer}
        data={data}
        onItemPress={this.onItemPress}
      />
    );
  }
}

export const ProductInfo = withStyles(ProductInfoComponent, theme => ({
  listContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}));
