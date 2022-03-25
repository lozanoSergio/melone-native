import React from 'react';
import {Text, withStyles, Layout} from 'react-native-ui-kitten';
import {Chip} from '../../common/Chip';
import {Icon} from '../../UI/Icons';

class AdditivesListItemComponent extends React.Component {
  render() {
    const {style, themedStyle, data, ...restProps} = this.props;

    return (
      <Layout style={themedStyle.container}>
        <Chip
          {...restProps}
          style={themedStyle.chipContainer}
          color={data.color}>
          <Layout
            style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
            <Icon name="lab-flask" type="entypo" size={16} color="white" />
            <Text
              style={{fontSize: 14}}
              category="label"
              appearance="alternative">
              {data.name}
            </Text>
          </Layout>
        </Chip>
      </Layout>
    );
  }
}

export const AdditivesListItem = withStyles(
  AdditivesListItemComponent,
  theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme['background-basic-color-2'],
    },
    chipContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      marginVertical: 8,
    },
    label: {
      color: 'white',
    },
  }),
);
