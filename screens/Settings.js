import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const colors = isDarkTheme ? COLORS : COLORS_LIGHT;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.appBackground },
      ]}
    >
      <Text style={[styles.text, { color: colors.fontMain }]}>
        Choose color theme:
      </Text>

      <Switch
        value={isDarkTheme}
        onValueChange={setIsDarkTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  text: {
    fontSize: 16,
  },
});

export default Settings;
