import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CheckBox from './CheckBox';
import AnimatedButton from './AnimatedButton';

const DATA = [
  {
    id: '1',
    title: 'Oxelösund',
  },
  {
    id: '2',
    title: 'Nyköping',
  },
  {
    id: '3',
    title: 'Malmö',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const FlatListLocation = () => {
  const [selectedItems, setSelectedItems] = useState({});

  const toggleSelection = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderItem = ({ item }) => (
    <CheckBox
    id={item.id}
    title={item.title}
    isChecked={!!selectedItems[item.id]}
    onPress={() => toggleSelection(item.id)}
    />
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />

          <AnimatedButton>
            <Text>
              Påbörja ärende
            </Text>
          </AnimatedButton>
      </SafeAreaView>
    </SafeAreaProvider>
  );

}

export default FlatListLocation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});