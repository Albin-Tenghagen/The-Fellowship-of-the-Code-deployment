import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { customTheme, theme, isDark, toggleTheme } = useTheme();

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={{
          headerTitle: "HydroGuard",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => (
            <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
              <MaterialCommunityIcons
                name={isDark ? "white-balance-sunny" : "weather-night"}
                color={theme.accent}
                size={24}
              />
            </Pressable>
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="login" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;