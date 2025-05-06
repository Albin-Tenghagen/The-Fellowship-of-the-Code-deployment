import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from "../themes/ThemeContext";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/UserScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { customTheme } = useTheme();


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: customTheme.colors.tabBar,
        },
        headerTintColor: customTheme.colors.textSecondary,
        headerTitleStyle: {
          fontFamily: customTheme.fonts.medium.fontFamily,
          fontSize: 18
        },
        tabBarStyle: {
          backgroundColor: customTheme.colors.tabBar,
          height: 55
        },
        tabBarActiveTintColor: customTheme.colors.accent,
        tabBarInactiveTintColor: customTheme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
        }

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
  );
}

const Navigation = () => {
  const { customTheme } = useTheme();
  const {token, isLoading} = useAuth();

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
         
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>

        )}

        </Stack.Navigator>
  
    </NavigationContainer>
  );
};

export default Navigation;
