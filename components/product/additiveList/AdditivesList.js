import React from 'react';
import {View} from 'react-native';
import {withStyles} from 'react-native-ui-kitten';
import {AdditivesListItem} from './AdditivesListItem';

class AdditivesListComponent extends React.Component {
  state = {
    scrollEnabled: false,
  };

  renderItem = (item, index) => {
    const {themedStyle} = this.props;

    return <AdditivesListItem data={item} key={index} />;
  };

  render() {
    const {style, themedStyle, data, ...restProps} = this.props;

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        {data.map(this.renderItem)}
      </View>
    );
  }
}

export const AdditivesList = withStyles(AdditivesListComponent, theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: theme['background-basic-color-2'],
  },
}));
