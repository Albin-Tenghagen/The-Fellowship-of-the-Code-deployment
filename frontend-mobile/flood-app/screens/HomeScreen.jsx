import React from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, Platform, ScrollView } from 'react-native';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../context/UserContext';
import { saveToStorage, getFromStorage, deleteFromStorage } from '../services/webCompatibleSecureStore';
import { useAuth } from '../context/AuthContext';
import TipsCard from '../components/TipsCard';
// import CustomModal from '../components/CustomModal';
import { useAppData } from '../context/DataContext';
import CustomCard from '../components/CustomCard';

const HomeScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { tipsData, loading, error } = useAppData();
  const { userName, clearUser } = useUser();
  const styles = createStyles(theme);
  const { logout } = useAuth();

  const handleButtonPress = () => {
    console.log("Nu har du klickat på knappen");
  }

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


  const renderTipContent = (tips, loading, error, theme) => {
    if (loading) {
      return <Text style={{ color: theme.textColor }}>Fetching tips...</Text>;
    }

    if (error) {
      return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }

    if (tips && tips.length > 0) {
      // Show a random tip instead of always the first one // JUST FOR TESTING !!!!! 
      const randomIndex = Math.floor(Math.random() * tips.length);
      const tip = tips[randomIndex];

      return (
        <Text style={[styles.text, { color: theme.textColor }]}>
          {tip.title || tip.body || "Tip content not available"}
        </Text>
      );
    }

    return <Text style={[styles.text, { color: theme.textColor }]}>No tips available</Text>;
  };

  // const openModal = () => setModalVisible(true);
  // const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
      barStyle={isDark ? "Light-content" : "dark-content"}
      backgroundColor={theme.headerBackground}
      />
        <View 
        style={styles.header}
        accessible={true}
        accessibilityRole='header'
        accessibilityLabel='Appens rubrik och knapp för att byta färgtema'>
          <Text
            style={styles.title}
            accessibilityRole='header'
            accessibilityLabel='HydroGuard, appens namnn'
            >HydroGuard</Text>
            <Pressable onPress={toggleTheme}
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel={
                isDark ? "Byt till ljust tema" : "Byt till mörkt tema"
              }
              >
                <MaterialCommunityIcons
                name={isDark ? "white-balance-sunny" : "weather-night"}
                color={theme.accent}
                size={24}
                accessibilityElementsHidden={true}
                />
              </Pressable>
            </View>
            <ScrollView
              style={styles.container}
              accessibilityRole={true}
              accessibilityLabel='Scrollbart innehåll med introduktion till appens aktiviteter'
              >
            <HeroImage />
            <View>
              <Text
                accessibilityLabel='Testar att skriva saker men har inget innehåll än'>
                Testar lite till
              </Text>
            </View>
            <View>
              <Text>
                {userName ? `Välkommen ${userName}!` : `Välkommen - ingen användare!`}
              </Text>
              <Pressable
                onPress={() => {
                  logout();
                  clearUser();
                }}
                >
                  <Text>Logga ut</Text>
                </Pressable>
            </View>
            <View>
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
            

        <View style={styles.cardContainer}>
          <TipsCard
            title="Custom Tip Display"
            width="70%"
            height={150}
            tips={tipsData}
            loading={loading}
            error={error}
            icon="information-outline"
            renderContent={renderTipContent}
          />
        </View>

        <View style={styles.cardContainer}>
          <TipsCard
            title="Custom Tip Display"
            width="70%"
            height={150}
            tips={tipsData}
            loading={loading}
            error={error}
            icon="information-outline"
            renderContent={renderTipContent}
          />
        </View>

      </ScrollView>
    </SafeAreaView>

   
  );
};

export default HomeScreen;

const createStyles = (theme) =>
StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.backgound,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  container: {
    flex: 1,
    backgroundColor: theme.backgound,
    paddingBottom: 150
  },

  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  text: {
    fontSize: 14,
    textAlignVertical: 'center',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
},
})
