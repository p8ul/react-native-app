import React from "react";
import { connect } from "react-redux";
import { DrawerItems } from "react-navigation";
import PropTypes from "prop-types";
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Icon } from "../components";
import { materialTheme } from "../constants";
import { removeToken } from "../utils/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#4B1958",
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: "center"
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: "flex-end"
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19
  },
  seller: {
    marginRight: 16
  }
});

class Drawer extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    profile: PropTypes.shape({}).isRequired
  };

  state = {};

  render() {
    const { navigation, profile } = this.props;
    return (
      <Block
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <Block flex={0.2} style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Profile")}
          >
            <Block style={styles.profile}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              <Text h5 color="white">
                {profile.name}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
          <Block row>
            <TouchableWithoutFeedback
              onPress={() => {
                removeToken(navigation.navigate);
              }}
            >
              <Block middle style={styles.pro}>
                <Text size={16} color="white">
                  Logout
                </Text>
              </Block>
            </TouchableWithoutFeedback>
            <Text size={16} muted style={styles.seller}>
              {profile.type}
            </Text>
            <Text size={16} color={materialTheme.COLORS.WARNING}>
              {profile.rating}{" "}
              <Icon name="shape-star" family="GalioExtra" size={14} />
            </Text>
          </Block>
        </Block>

        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <DrawerItems
              {...this.props}
              navigation={navigation}
              profile={profile}
            />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

export const mapStateToProps = state => ({
  login: state.login,
  profile: state.login.profile
});

export const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);
