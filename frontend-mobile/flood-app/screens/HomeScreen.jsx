import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import HeroImage from '../components/HeroImage';
import { useTheme } from "../themes/ThemeContext";
import { useAppData } from '../context/DataContext';
import WaterLevelCard from '../components/WaterLevelCard';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { monitoringData, loading, error } = useAppData();
  
  const renderMonitoringContent = () => {
    if (loading) {
      return <Text style={{ color: theme.textColor }}>Fetching monitoring data...</Text>;
    }

    if (error) {
      return <Text style={{ color: 'red' }}>Error: {error}</Text>;
    }

    if (monitoringData && monitoringData.length > 0) {
      const latest = monitoringData[0];
      return (
        <>
          <Text style={[styles.text, { color: theme.textColor }]}>
            Water Level: {latest.data?.level ?? "N/A"}
          </Text>
          <Text style={[styles.text, { color: theme.textColor }]}>
            Status: {latest.data?.status ?? "N/A"}
          </Text>
        </>
      );
    }

    return <Text style={[styles.text, { color: theme.textColor }]}>No monitoring data available</Text>;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeroImage />

        <View style={styles.cardContainer}>
          <WaterLevelCard
            title="Current Water Level"
            width="90%"
            height={150}
            data={monitoringData}
            loading={loading}
            error={error}
            icon="water"
            renderContent={renderMonitoringContent}
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
