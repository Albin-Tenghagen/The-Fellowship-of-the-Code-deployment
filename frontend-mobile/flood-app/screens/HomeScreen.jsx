import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import WaterLevelCard from '../components/WaterLevelCard';
import InfoCard from '../components/InfoCard';
import TipsBoxCard from '../components/TipsBoxCard';
import InfrastructureIssuesCard from '../components/InfrastructureIssuesCard';

const HomeScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <HeroImage /> */}


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

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Infrastrukturproblem
        </Text>
        
        <InfrastructureIssuesCard
          title="Aktuella problem"
          width="90%"
          maxItems={3}
        />

        <View style={styles.cardContainer}>
          <TipsBoxCard
            title="Säkerhetstips"
            text="Vid översvämning, håll dig borta från vattnet och följ myndigheternas råd."
            width="90%"
            height={150}
            icon="message-arrow-right-outline"
          />
        </View>

        <View style={styles.infoCardContainer}>
          <InfoCard
            title="Information till allmänheten"
            text="Vid akut översvämningsrisk – ring 112. För övrig information, använd vår app."
            width="90%"
            height={50}
            icon="information-variant"
          />
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  infoCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});