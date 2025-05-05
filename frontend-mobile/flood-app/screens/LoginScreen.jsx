import { StyleSheet, Text, View, TextInput, Pressable, Platform, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../themes/ThemeContext'
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';


const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { userName, saveUserName } = useUser();
  const styles = createStyles(theme);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = () => {
    if (name.trim().length < 2) {
      ServiceWorkerRegistration("Namnet måste vara minst 2 tecken");
      return;
    }
    saveUserName(name.trim());
    const fakeToken = Math.random().toString(36).slice(2);
    login(fakeToken);
    navigation.navigate("Home");
  }
  
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={Platform.OS === "web" ? styles.webBackground : styles.background}
      resizeMode='cover'
      accessible
      accessibilityLabel='Bakgrundsbild med inloggningsformulär'
    >

      <View style={styles.overlay}>
        <View style={styles.container} accessible accessibilityLabel='Inloggningsformulär'>
          <Text style={styles.label} accessibilityLabel='header'>Logga in</Text>
          <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            setError("");
          }}
          style={styles.input}
          placeholder='Skriv in ditt användarnamn'
          placeholderTextColor={theme.textSecondary}
          accessibilityLabel='Användarnamn'
          accessibilityHint='Fält där du skriver in ditt användarnamn'
          keyboardType='default'
          returnKeyType='done'
          />
          {error ? <Text>{error}</Text> : null}

          <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          accessibilityRole='button'
          accessibilityLabel='Loggain knapp'
          accessibilityHint='Tryck här för att logga in med det angivna namnet'
          >
            <Text>Spara och fortsätt</Text>
          </Pressable>
        </View> 
      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const createStyles = (theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    webBackground: {
      height: "100vh",
      width: "100",
      justifyContent: "center",
      alignItems: "center"
    },
    overlay: {
      flex: 1,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      backgroundColor: theme.backgroundOpacity,
      padding: 10,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center"
    },
    label: {
      color: theme.textSecondary,
      fontSize: 22,
      marginBottom: 10
    },
    input: {
      bordeWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
      padding: 8,
      marginBottom: 10,
      backgroundColor: theme.card,
    }

  })