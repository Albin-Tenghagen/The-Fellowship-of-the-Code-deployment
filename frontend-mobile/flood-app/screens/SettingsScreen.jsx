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
        </View>
      )}
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})