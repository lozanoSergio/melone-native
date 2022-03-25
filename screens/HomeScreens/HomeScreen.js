import React from 'react';
import DeviceInfo from 'react-native-device-info';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import ArticleListContainer from '../../components/containers/articles/ArticleListContainer';

const hasNotch = DeviceInfo.hasNotchSync();

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ArticleListContainer />
      </View>
    );
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingTop: Platform.select({
      ios: Platform.OS === 'ios' && hasNotch ? 42 : 21,
      android: StatusBar.currentHeight,
    }),
  },
});
