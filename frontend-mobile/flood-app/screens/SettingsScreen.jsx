<<<<<<< HEAD
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchSafety } from '../services/api';

const SettingsScreen = () => {
  const [safety, setSafety] = useState([]);
  const [safetyError, setSafetyError] = useState(null);

  useEffect(() => {
    const getSafety = async () => {
      try {
        const safetyData = await fetchSafety();
        setSafety(safetyData);
      } catch (error) {
        setSafetyError(error.message);
      }
    };

    getSafety();
  }, []);

  return (
    <View style={styles.container}>
      {safety.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {item.proactiveActions && (
            <View style={styles.actions}>
              <Text style={styles.actionsHeader}>Förebyggande åtgärder:</Text>
              {item.proactiveActions.basementProtection && (
                <Text>• Källarskydd: {item.proactiveActions.basementProtection}</Text>
              )}
              {item.proactiveActions.trenchDigging && (
                <Text>• Grävning: {item.proactiveActions.trenchDigging}</Text>
              )}
              {item.proactiveActions.electricHazards && (
                <Text>• Elrisker: {item.proactiveActions.electricHazards}</Text>
              )}
            </View>
          )}
        </View>
      ))}

      {safetyError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ Kunde inte hämta tips: {safetyError}</Text>
=======
import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { fetchTips } from '../services/api';

const SettingsScreen = () => {
  const [tips, setTips] = useState([]);
  const [tipsError, setTipsError] = useState(null);

  useEffect(() => {
    const getTips = async () => {
      try {
        const tipsData = await fetchTips();
        setTips(tipsData);
      } catch (error) {
        setTipsError(error.message);
      }
    };

    getTips();
  }, []);


  return (
    <View>
      {/* <Text>SettingsScreen</Text> */}
      <View>
        {tips.map((tip) => (
          <View key={tip.id} style={{ marginBottom: 10 }}>
            <Text>
              {tip.user}
            </Text>
            <Text>
              {tip.description}
            </Text>
          </View>
        ))}
      </View>

      {tipsError && (
        <View>
          <Text>Vi kunde inte hämta tips för tillfället: {tipsError}</Text>
>>>>>>> backend
        </View>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
  },
  actions: {
    marginTop: 10,
  },
  actionsHeader: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  errorBox: {
    padding: 10,
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
  },
});
