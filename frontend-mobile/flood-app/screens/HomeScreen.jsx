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
  const { theme, isDark, toggleTheme } = useTheme();

  // const openModal = () => setModalVisible(true);
  // const closeModal = () => setModalVisible(false);

  const { tipsData, loading, error } = useAppData();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <HeroImage />

        <View>
          <Text>Testar lite till</Text>
        </View>

        <View style={styles.cardContainer}>
          <TipsCard title="Tips"
            width="80%"
            height={150}
            tips={tipsData}
            loading={loading}
            error={error}
            icon="lightbulb-on-outline" />
        </View>
{/* 
        <View>
          <CustomCard
          title='Hej prov!'>
          </CustomCard>
        </View> */}

        {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          <Button title="Open Modal" onPress={openModal} />
        </View> */}
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
  }
})
