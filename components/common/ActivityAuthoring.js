import React from 'react';
import {View} from 'react-native';
import {Text, Avatar, withStyles} from 'react-native-ui-kitten';
import {textStyle} from './style';
import moment from 'moment';
import 'moment/locale/es';

class ActivityAuthoringComponent extends React.Component {
  render() {
    const {style, themedStyle, photo, name, date, ...restProps} = this.props;

    let formatted = moment(date).fromNow();
    moment.locale('es');

    return (
      <View {...restProps} style={[themedStyle.container, style]}>
        <Avatar style={themedStyle.authorPhoto} source={{uri: photo}} />
        <View style={themedStyle.authorInfoContainer}>
          <Text style={themedStyle.authorNameLabel}>{name}</Text>
          <Text style={themedStyle.dateLabel} appearance="hint" category="p2">
            {formatted}
          </Text>
        </View>
      </View>
    );
  }
}

export const ActivityAuthoring = withStyles(
  ActivityAuthoringComponent,
  theme => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    authorInfoContainer: {
      marginLeft: 16,
    },
    authorPhoto: {
      margin: 0,
    },
    authorNameLabel: textStyle.subtitle,
    dateLabel: textStyle.paragraph,
  }),
);
