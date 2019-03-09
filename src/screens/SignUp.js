import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
// galio component
import { Block, Button, Input, Text, NavBar } from "galio-framework";
import { materialTheme } from "../constants";
import { accountValidator } from "../validators/auth/login";
import * as userActions from "../redux/actions/user/signup";
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

class SignUp extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}),
    signup: PropTypes.func.isRequired,
    serverErrors: PropTypes.string.isRequired
  };

  static defaultProps = {
    navigation: { navigate: () => {} }
  };

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const {
      signup,
      navigation: { navigate }
    } = this.props;
    const errors = accountValidator({ ...this.state });
    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      this.setState({ errors });
      return false;
    }
    return signup({ ...this.state, navigate });
  };

  render() {
    const { navigation, serverErrors } = this.props;
    const { errors } = this.state;

    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        <NavBar
          title="Sign Up"
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
                  onPress={() => Alert.alert("Not implemented")}
                  color={theme.COLORS.FACEBOOK}
                  shadowColor={theme.COLORS.FACEBOOK}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
              <Block flex middle center>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="twitter"
                  iconFamily="FontAwesome"
                  onPress={() => Alert.alert("Not implemented")}
                  color={theme.COLORS.TWITTER}
                  shadowColor={theme.COLORS.TWITTER}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
              <Block flex middle left>
                <Button
                  round
                  onlyIcon
                  iconSize={theme.SIZES.BASE * 1.625}
                  icon="dribbble"
                  iconFamily="FontAwesome"
                  onPress={() => Alert.alert("Not implemented")}
                  color={theme.COLORS.DRIBBBLE}
                  shadowColor={theme.COLORS.DRIBBBLE}
                  iconColor={theme.COLORS.WHITE}
                  style={styles.social}
                />
              </Block>
            </Block>
            <Text muted center size={theme.SIZES.FONT * 0.875}>
              or be classical
            </Text>
          </Block>

          <Block flex={2} center space="between">
            <Block flex={2}>
              {serverErrors !== "" && (
                <Text
                  color={theme.COLORS.ERROR}
                  center
                  size={theme.SIZES.FONT * 0.875}
                >
                  {serverErrors}
                </Text>
              )}
              <Input
                rounded
                placeholder="Username"
                autoCapitalize="none"
                color={theme.COLORS.PRIMARY}
                style={{ width: width * 0.9 }}
                onChangeText={text => this.handleChange("name", text)}
              />
              {errors.name && (
                <Text
                  color={theme.COLORS.ERROR}
                  center
                  size={theme.SIZES.FONT * 0.875}
                >
                  {errors.name}
                </Text>
              )}
              <Input
                rounded
                type="email-address"
                placeholder="Email"
                autoCapitalize="none"
                color={theme.COLORS.PRIMARY}
                style={{ width: width * 0.9 }}
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
              <Input
                rounded
                password
                viewPass
                color={theme.COLORS.PRIMARY}
                placeholder="Confirm Password"
                style={{ width: width * 0.9 }}
                onChangeText={text =>
                  this.handleChange("confirmPassword", text)
                }
              />
              {errors.confirmPassword && (
                <Text
                  color={theme.COLORS.ERROR}
                  center
                  size={theme.SIZES.FONT * 0.875}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </Block>
            <Block flex middle>
              <Button round color="error" onPress={this.handleSubmit}>
                Sign up
              </Button>
              <Button
                color="transparent"
                shadowless
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  center
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                >
                  Already have an account? Sign In
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
  serverErrors: state.signup.errors || ""
});

const mapDispatchToProps = {
  signup: userActions.signUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
