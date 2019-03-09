import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Platform
} from "react-native";

// galio component
import { Block, Button, Input, NavBar, Text } from "galio-framework";
import { materialTheme } from "../constants";

import { accountValidator } from "../validators/auth/login";
import { login } from "../redux/actions/auth/login";
import { getToken } from "../utils/auth";

const theme = materialTheme;
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  }
});

class Login extends React.Component {
  static propTypes = {
    login: PropTypes.shape({}).isRequired,
    signIn: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    serverErrors: PropTypes.string.isRequired
  };

  state = {
    email: "-",
    password: "-",
    errors: {}
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await getToken();
    const {
      navigation: { navigate }
    } = this.props;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigate(token ? "Home" : "Login");
  };

  handleChange = (name, value) => {
    const { errors } = this.state;
    delete errors[name];
    this.setState({ [name]: value, errors });
  };

  handleSubmit = () => {
    const {
      signIn,
      navigation: { navigate }
    } = this.props;

    const errors = accountValidator({ ...this.state, isLogin: false });
    const isValid = Object.keys(errors).length === 0;

    if (!isValid) {
      this.setState({ errors });
      return false;
    }
    return signIn({ ...this.state, navigate });
  };

  render() {
    const { navigation, serverErrors } = this.props;
    const { errors } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Sign In"
          onLeftPress={() => navigation.openDrawer()}
          style={
            Platform.OS === "android" ? { marginTop: theme.SIZES.BASE } : null
          }
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="height"
          enabled
        >
          <Block
            flex
            center
            style={{
              marginTop: theme.SIZES.BASE * 1.875,
              marginBottom: height * 0.1
            }}
          >
            <Text
              muted
              center
              size={theme.SIZES.FONT * 0.875}
              style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}
            >
              This is the perfect place to write a short description of this
              step and even the next steps ahead
            </Text>
            <Block
              row
              center
              space="between"
              style={{ marginVertical: theme.SIZES.BASE * 1.875 }}
            >
              <Block flex middle right>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="facebook"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.FACEBOOK}
                  shadowColor={theme.COLORS.FACEBOOK}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
              <Block flex middle center>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="twitter"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.TWITTER}
                  shadowColor={theme.COLORS.TWITTER}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
              <Block flex middle left>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="dribbble"
                  iconFamily="FontAwesome"
                  color={theme.COLORS.DRIBBBLE}
                  shadowColor={theme.COLORS.DRIBBBLE}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                  onPress={() => Alert.alert("Not implemented")}
                />
              </Block>
            </Block>
            <Text muted center size={theme.SIZES.FONT * 0.875}>
              or be classical
            </Text>
            {serverErrors !== "" && (
              <Text
                color={theme.COLORS.ERROR}
                center
                size={theme.SIZES.FONT * 0.875}
              >
                {serverErrors}
              </Text>
            )}
          </Block>

          <Block flex={2} center space="evenly">
            <Block flex={2}>
              <Input
                rounded
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                style={{ width: width * 0.9 }}
                color={theme.COLORS.PRIMARY}
                onChangeText={text => this.handleChange("email", text)}
              />
              {errors.email && (
                <Text
                  color={theme.COLORS.ERROR}
                  center
                  size={theme.SIZES.FONT * 0.875}
                >
                  {errors.email}
                </Text>
              )}
              <Input
                rounded
                password
                viewPass
                color={theme.COLORS.PRIMARY}
                placeholder="Password"
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange("password", text)}
              />
              {errors.password && (
                <Text
                  color={theme.COLORS.ERROR}
                  center
                  size={theme.SIZES.FONT * 0.875}
                >
                  {errors.password}
                </Text>
              )}
              <Text
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
                onPress={() => Alert.alert("Not implemented")}
                style={{
                  alignSelf: "flex-end",
                  lineHeight: theme.SIZES.FONT * 2
                }}
              >
                Forgot your password?
              </Text>
            </Block>
            <Block flex middle>
              <Button
                round
                color="error"
                onPress={() => {
                  this.handleSubmit();
                }}
              >
                Sign in
              </Button>
              <Button
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("Register")}
              >
                <Text
                  center
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                >
                  {"Don't have an account? Sign Up"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  serverErrors: state.login.errors || ""
});

const mapDispatchToProps = { signIn: login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
