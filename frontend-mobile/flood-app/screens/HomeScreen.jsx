import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import { useAppData } from '../context/DataContext';
import WaterLevelCard from '../components/WaterLevelCard';
import InfoCard from '../components/InfoCard';
import TipsBoxCard from '../components/TipsBoxCard';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { monitoringData, refetchData, loading, error } = useAppData();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeroImage />

        <View style={styles.cardContainer}>
          <InfoCard
            title="Information till allmänheten"
            text="Vid akut översvämningsrisk – ring 112. För övrig information, använd vår app."
            width="90%"
            height={150}
            icon="information-variant"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Nuvarande vattenövervakning
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Vattennivå"
            parameter="ultraSoundLevel"
            width="45%"
            icon="water"
          />
          <WaterLevelCard
            title="Trycknivå"
            parameter="pressureLevel"
            width="45%"
            icon="gauge"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Väderförhållanden
        </Text>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Temperatur"
            parameter="temperature"
            width="45%"
            icon="thermometer"
          />
          <WaterLevelCard
            title="Luftfuktighet"
            parameter="humidity"
            width="45%"
            icon="water-percent"
          />
        </View>

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Lufttryck"
            parameter="airPressure"
            width="45%"
            icon="weather-windy"
          />
          <WaterLevelCard
            title="Jordfuktighet"
            parameter="soilMoisture"
            width="45%"
            icon="water-percent"
          />
        </View>

        <View style={styles.cardContainer}>
          <TipsBoxCard
            title="Säkerhetstips"
            text="Vid översvämning, håll dig borta från vattnet och följ myndigheternas råd."
            width="90%"
            height={150}
            icon="message-arrow-right-outline"
          />
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
            <Button
              title="Ladda om"
              onPress={refetchData}
              color={theme.primary}
            />
          </View>
        )}

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});