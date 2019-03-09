import React from "react";
import { withNavigation } from "react-navigation";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import { Button, Block, NavBar, Input, Text, theme } from "galio-framework";

import Icon from "./Icon";
import materialTheme from "../constants/Theme";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const ChatButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Pro")}
  >
    <Icon
      family="GalioExtra"
      size={16}
      name="chat-33"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Pro")}
  >
    <Icon
      family="GalioExtra"
      size={16}
      name="basket-simple"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate("Pro")}
  >
    <Icon
      size={16}
      family="Galio"
      name="zoom-split"
      color={theme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  renderButtons = ({ chatKey, basketKey, navigation, white }) => [
    <ChatButton key={chatKey} navigation={navigation} isWhite={white} />,
    <BasketButton key={basketKey} navigation={navigation} isWhite={white} />
  ];

  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;
    let renderButtonArgs = {
      chatKey: "chat-title",
      basketKey: "basket-title",
      navigation,
      white
    };

    if (title === "Title") {
      return this.renderButtons(renderButtonArgs);
    }

    switch (routeName) {
      case "Home":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-home",
          basketKey: "backet-home"
        };
        return this.renderButtons(renderButtonArgs);
      case "Deals":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-categories",
          basketKey: "backet-categories"
        };
        return this.renderButtons(renderButtonArgs);
      case "Categories":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-categories",
          basketKey: "backet-categories"
        };
        return this.renderButtons(renderButtonArgs);
      case "Category":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-deals",
          basketKey: "backet-deals"
        };
        return this.renderButtons(renderButtonArgs);
      case "Profile":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-profile",
          basketKey: "backet-deals"
        };
        return this.renderButtons(renderButtonArgs);
      case "Product":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "search-product",
          basketKey: "backet-product"
        };
        return this.renderButtons(renderButtonArgs);
      case "Search":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-search",
          basketKey: "backet-search"
        };
        return this.renderButtons(renderButtonArgs);
      case "Settings":
        renderButtonArgs = {
          ...renderButtonArgs,
          chatKey: "chat-search",
          basketKey: "backet-search"
        };
        return this.renderButtons(renderButtonArgs);
      default:
        break;
    }
  };

  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Pro")}
        iconContent={
          <Icon
            size={16}
            color={theme.COLORS.MUTED}
            name="zoom-split"
            family="Galio"
          />
        }
      />
    );
  };

  renderTabs = () => {
    const { navigation, tabTitleLeft, tabTitleRight } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              name="grid-square"
              family="Galio"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              {tabTitleLeft || "Categories"}
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              {tabTitleRight || "Best Deals"}
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderHeader = () => {
    const { search, tabs } = this.props;
    if (search || tabs) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
    return null;
  };

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    const { routeName } = navigation.state;
    const noShadow = [
      "Search",
      "Categories",
      "Deals",
      "Pro",
      "Profile"
    ].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: "rgba(0,0,0,0)" } : null
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: "center" }}
          leftStyle={{ paddingVertical: 12, flex: 0.3 }}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            { color: theme.COLORS[white ? "WHITE" : "ICON"] }
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: "relative"
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold"
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 8
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300"
  }
});
