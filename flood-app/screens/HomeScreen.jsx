import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native';
import HeroImage from '../components/HeroImage'
import { useTheme } from "../themes/ThemeContext";
import { MaterialCommunityIcons} from "@expo/vector-icons";

const HomeScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
            <Text>Test</Text>
           
          <Pressable onPress={toggleTheme}>
          <MaterialCommunityIcons
          name={isDark? "white-balance-sunny" : "weather-night"}
          color={theme.accent}
          size={24}
          
          />
         </Pressable>
        </View>
      <HeroImage/>
      <View>
        <Text>
          Testar lite till
        </Text>
      </View>

    </ScrollView>
  )
}
 export default HomeScreen

 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 1
  }
 })