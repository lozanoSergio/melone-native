import React from 'react';
import {Dimensions} from 'react-native';
import {withStyles, List} from 'react-native-ui-kitten';
import {NutrimentCard} from './NutrimentsCard';

const {width} = Dimensions.get('window');
const itemWidth = width / 2;

class NutrimentCardListComponent extends React.Component {
  renderItem = info => {
    return (
      <NutrimentCard
        style={this.props.themedStyle.item}
        energyUnit={this.props.energyUnit}
        data={info.item}
        deviceWidth={width}
      />
    );
  };

  render() {
    const {themedStyle, ...restProps} = this.props;
    return (
      <List
        numColumns={2}
        columnWrapperStyle={themedStyle.columnWrapperStyle}
        renderItem={this.renderItem}
        {...restProps}
      />
    );
  }
}

export const NutrimentCardList = withStyles(
  NutrimentCardListComponent,
  theme => ({
    item: {
      flex: 1,
      width: 0,
      flexGrow: 1,
      maxWidth: itemWidth,
      marginHorizontal: 8,
      marginVertical: 8,
      backgroundColor: theme['background-basic-color-1'],
    },
    columnWrapperStyle: {
      justifyContent: 'center',
    },
  }),
);
