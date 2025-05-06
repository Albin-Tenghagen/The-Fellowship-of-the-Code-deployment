import { useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TipsCard from '../components/TipsCard';
// import CustomModal from '../components/CustomModal';
import { useAppData } from '../context/DataContext';
import CustomCard from '../components/CustomCard';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { tipsData, loading, error } = useAppData();

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
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <HeroImage />

        <View>
          <Text>Testar lite till</Text>
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

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
