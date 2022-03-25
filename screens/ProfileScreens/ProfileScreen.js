import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProfileSettings} from '../../components/containers/profile/ProfileContainer';
import {signOut} from '../../services/authActions';
import {
  updateDisplayName,
  savePhotoURL,
  getUser,
} from '../../redux/user/userActions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Elige una imagen',
  quality: 1.0,
  allowsEditing: false,
  mediaType: 'photo',
  maxWidth: 512,
  maxHeight: 512,
  storageOptions: {
    skipBackup: true,
  },
};

const mapState = state => ({
  user: state.user,
});

const actions = {
  updateDisplayName,
  savePhotoURL,
  getUser,
};

class ProfileScreen extends React.Component {
  state = {
    profile: this.props.user,
    loading: true,
  };

  async componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    const {user} = this.props;
    if (!user.displayName || !user.photoURL) {
      let newUser = await this.props.getUser();
      this.setState({profile: newUser, loading: false});
    } else {
      this.setState({loading: false});
    }
  };

  onPhotoButtonPress = async () => {
    const {user} = this.props;
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({imageURL: source});

        this.props.savePhotoURL(user, source.uri);
      }
    });
  };

  onCloseSessionPress = () => {
    signOut();
  };

  onEditUserAction = displayName => {
    this.props.updateDisplayName(this.state.profile, displayName);
  };

  render() {
    const {loading, profile} = this.state;
    if (loading) {
      return <></>;
    } else {
      return (
        <View style={styles.container}>
          <ProfileSettings
            profile={profile}
            onPhotoButtonPress={this.onPhotoButtonPress}
            onCloseSessionPress={this.onCloseSessionPress}
            onEditUserAction={this.onEditUserAction}
          />
        </View>
      );
    }
  }
}

export default connect(
  mapState,
  actions,
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
