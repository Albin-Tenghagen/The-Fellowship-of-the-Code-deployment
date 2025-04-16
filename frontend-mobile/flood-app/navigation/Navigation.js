import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import { MaterialCommunityIcons} from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeContext";
import LoginScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';


const Tab = createBottomTabNavigator();


const Navigation = () => {
  const {customTheme} = useTheme()
  return (
    <NavigationContainer theme={customTheme}>
        <Tab.Navigator>
            <Tab.Screen
            name= "Home"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}

            />
              <Tab.Screen
              name= "Login"
              component={LoginScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="login" color={color} size={size}/>
                )
            }}

            />
              <Tab.Screen
              name= "User"
              component={UserScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="user" color={color} size={size}/>
                )
            }}

            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation