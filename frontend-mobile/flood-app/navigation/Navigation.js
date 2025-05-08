import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Platform, SafeAreaView, ScrollView, ImageBackground} from 'react-native';
import { useTheme } from '../themes/ThemeContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';

const LoginScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { userName, saveUserName, clearUser } = useUser();
  const { login, logout } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const styles = createStyles(theme);

  const handleSubmit = () => {
    if (name.trim().length < 2) {
      setError("Namnet måste vara minst 2 tecken");
      return;
    }
    saveUserName(name.trim());
    const fakeToken = Math.random().toString(36).slice(2);
    login(fakeToken);
    navigation?.navigate("Home"); // Navigation is optional
  };

  const handleSaveToken = async () => {
    const fakeToken = Math.random().toString(36).slice(2);
    await saveToStorage("userToken", fakeToken);
    console.log("Token sparad!");
  };

  const handleGetToken = async () => {
    const token = await getFromStorage("userToken");
    console.log("Token hämtad:", token);
  };

  const handleDeleteToken = async () => {
    await deleteFromStorage("userToken");
    console.log("Token är raderad");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.headerBackground}
      />

      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={Platform.OS === "web" ? styles.webBackground : styles.background}
        resizeMode='cover'
        accessible
        accessibilityLabel='Bakgrundsbild med inloggningsformulär'
      >
        <View style={styles.overlay}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            accessibilityLabel='Inloggningsformulär och adminfunktioner'
          >
            <View style={styles.form}>
              <Text style={styles.label}>Admininloggning</Text>
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
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                accessibilityRole='button'
                accessibilityLabel='Loggain knapp'
              >
                <Text>Spara och fortsätt</Text>
              </Pressable>
            </View>

            <View style={styles.section}>
              <Text>{userName ? `Välkommen ${userName}!` : `Välkommen - ingen användare!`}</Text>
              <Pressable
                onPress={() => {
                  logout();
                  clearUser();
                }}
              >
                <Text>Logga ut</Text>
              </Pressable>
            </View>

            <View style={styles.section}>
              <Pressable onPress={handleSaveToken}>
                <Text>Spara token</Text>
              </Pressable>
              <Pressable onPress={handleGetToken}>
                <Text>Hämta token</Text>
              </Pressable>
              <Pressable onPress={handleDeleteToken}>
                <Text>Ta bort token</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const createStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    webBackground: {
      height: "100vh",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      flex: 1,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 20,
    },
    scrollContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    form: {
      backgroundColor: theme.backgroundOpacity,
      padding: 20,
      borderRadius: 8,
      width: "100%",
      maxWidth: 400,
      alignItems: "center",
      marginBottom: 30,
    },
    label: {
      color: theme.textSecondary,
      fontSize: 22,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.accent,
      borderRadius: 8,
      padding: 8,
      width: "100%",
      marginBottom: 10,
      backgroundColor: theme.card,
    },
    button: {
      backgroundColor: theme.accent,
      padding: 10,
      borderRadius: 6,
      marginTop: 10,
    },
    pressed: {
      opacity: 0.7,
    },
    section: {
      marginTop: 20,
      alignItems: "center",
    },
    errorText: {
      color: "red",
      marginBottom: 10,
    },
  });
