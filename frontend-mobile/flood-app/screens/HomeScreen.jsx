import { useState } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomCard from '../components/CustomCard';
import CustomModal from '../components/CustomModal';

const HomeScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text>Test</Text>
          <Pressable onPress={toggleTheme}>
            <MaterialCommunityIcons
              name={isDark ? "white-balance-sunny" : "weather-night"}
              color={theme.accent}
              size={24}
            />
          </Pressable>
        </View>

        <HeroImage />

        <View>
          <Text>Testar lite till</Text>
        </View>

        <View style={styles.cardContainer}>
          <CustomCard title="1" width="60%" height={100} />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
          <Button title="Open Modal" onPress={openModal} />
        </View>
      </ScrollView>

      <CustomModal visible={modalVisible} onClose={closeModal} title="Hello from Modal">
        <View>
          <Button title="Close" onPress={closeModal} />
        </View>
      </CustomModal>
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
