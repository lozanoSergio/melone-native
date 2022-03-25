import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ListItem, Text, withStyles} from 'react-native-ui-kitten';
import {ActivityAuthoring, textStyle} from '../../common';
import {MoreHorizontalIconFill} from '../../../assets/icons';

class SubCommentListItemComponent extends React.Component {
  onMorePress = () => {
    this.props.onMorePress(this.props.index);
  };

  renderMoreIcon = () => {
    const {themedStyle} = this.props;

    return MoreHorizontalIconFill(themedStyle.moreIcon);
  };

  render() {
    const {style, themedStyle, data, ...restProps} = this.props;

    return (
      <ListItem style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.authorContainer}>
          <ActivityAuthoring
            style={themedStyle.activityAuthoring}
            photo={data.author.photoURL}
            name={`${data.author.firstName} ${data.author.lastName}`}
            date={data.date}
          />
          <TouchableOpacity activeOpacity={0.75} onPress={this.onMorePress}>
            {this.renderMoreIcon()}
          </TouchableOpacity>
        </View>
        <Text style={themedStyle.commentLabel} category="s1">
          {data.text}
        </Text>
      </ListItem>
    );
  }
}

export const SubCommentListItem = withStyles(
  SubCommentListItemComponent,
  theme => ({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRadius: 10,
      backgroundColor: theme['background-basic-color-1'],
    },
    authorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    activityAuthoring: {
      flex: 1,
    },
    moreIcon: {
      width: 18,
      height: 18,
      tintColor: theme['text-hint-color'],
    },
    commentLabel: {
      marginTop: 14,
      ...textStyle.paragraph,
    },
  }),
);
