import React from "react";
import { View, StyleSheet, Image, Dimensions, BackHandler } from "react-native";
import { Text, Button } from "react-native-ui-kitten";
import { HeaderNavigation } from "../../components/common";
import { ArrowBackIconOutline } from "../../assets/icons";

const { width, height } = Dimensions.get("window");

class ThanksProductScreen extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
    this.state = { isLoading: true, product: undefined };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this._willBlurSubscription = navigation.addListener("willBlur", payload =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.onBackButtonPressAndroid
      )
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    navigation.popToTop();
    return true;
  };

  render() {
    return (
      <View>
        <HeaderNavigation
          icon={ArrowBackIconOutline}
          onBackPress={this.onBackButtonPressAndroid}
        />
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/illustrations/undraw_super_thank_you_obwk.png")}
            resizeMode="contain"
            style={styles.imageHeader}
          />
        </View>
        <View style={styles.informationContainer}>
          <Text
            style={{ textAlign: "center", marginBottom: 42 }}
            appearance="hint"
          >
            ¡Gracias por colaborar querido meloner! Sin tu ayuda nuestra
            comunidad no podría existir.
          </Text>
          <Button onPress={this.onBackButtonPressAndroid}>
            Regresar al escaner
          </Button>
        </View>
      </View>
    );
  }
}

export default ThanksProductScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    minHeight: height / 2
  },
  imageHeader: {
    width: width - 32,
    height: "100%"
  },
  informationContainer: {
    paddingTop: 16,
    paddingHorizontal: 16
  }
});
