import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const LocationCard = () => {
    const [isSelected, setSelection] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
            isChecked={isSelected}
            onPress={() => setSelection(!isSelected)}
            fillColor="green"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: 'green' }}
            innerIconStyle={{ borderWidth: 2 }}
        />
            <Text style={styles.label}>Påbörja ärende</Text>
        </View>
        <Text>Är CheckBox vald: {isSelected ? 'yes' : 'no' } </Text>
    
    </View>
  );
};

export default LocationCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});