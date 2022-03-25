import React from 'react';
import {withStyles} from 'react-native-ui-kitten';
import {SafeAreaView, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import KeyboardListener from 'react-native-keyboard-listener';

class ScrollableAvoidKeyboardComponent extends React.Component {
  state = {
    scrollEnabled: true,
    keyboardHeight: 0,
  };

  render() {
    const {
      style,
      contentContainerStyle,
      themedStyle,
      ...restProps
    } = this.props;

    return (
      <SafeAreaView style={{marginTop: -20}}>
        <KeyboardListener
          onWillShow={() => {
            this.setState({scrollEnabled: false});
          }}
          onWillHide={() => {
            this.setState({scrollEnabled: true});
          }}
          onDidShow={e => {
            this.setState({keyboardHeight: e.endCoordinates.height});
          }}
          onDidHide={() => {
            this.setState({scrollEnabled: true});
          }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={[
            themedStyle.contentContainer,
            contentContainerStyle,
            {
              paddingBottom:
                Platform.OS == 'android' ? -this.state.keyboardHeight : null,
            },
          ]}
          enableOnAndroid={true}
          enableResetScrollToCoords={false}
          enableAutomaticScroll={false}
          extraHeight={40}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...restProps}
        />
      </SafeAreaView>
    );
  }
}

export const ScrollableAvoidKeyboard = withStyles(
  ScrollableAvoidKeyboardComponent,
  theme => ({
    container: {
      backgroundColor: 'transparent',
    },
    contentContainer: {
      flexGrow: 1,
    },
  }),
);
