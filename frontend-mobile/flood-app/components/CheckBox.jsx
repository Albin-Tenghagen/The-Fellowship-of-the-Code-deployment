import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox';


const CheckBox = ({ title, isChecked, onPress}) => {

  return (
    <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          
            <BouncyCheckbox
            isChecked={isChecked}
            onPress={onPress}
            fillColor="black"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: 'black' }}
            innerIconStyle={{ borderWidth: 2 }}

        />
            <Text style={styles.label}>{title}</Text>
        </View>
    </View>
  );
};

export default CheckBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
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