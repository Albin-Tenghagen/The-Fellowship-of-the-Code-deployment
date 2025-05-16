import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import CheckBox from './CheckBox';
import AnimatedButton from './AnimatedButton';
import { useTheme } from '../themes/ThemeContext';



const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const FlatListLocation = () => {
  const { theme } = useTheme();
  const [selectedItems, setSelectedItems] = useState({});
  const styles = createStyles(theme);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const getLocations = async () => {
    try {
      const response = await fetch('http://localhost:5001/users/safety');
      const json = await response.json();
      setLocations(json);

      setLocations(json.products); 
    } catch (error) {
      console.error('Fel vid API-anrop:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  getLocations();
}, []);




  const toggleSelection = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderItem = ({ item }) => (
    <CheckBox
    id={item.id}
    title={item.location}
    isChecked={!!selectedItems[item.id]}
    onPress={() => toggleSelection(item.id)}
    />
  );
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={locations}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          />

          <AnimatedButton title="Påbörja arbete" onPress={() => console.log('Sparar')} />
           
      </SafeAreaView>
    </SafeAreaProvider>
  );

}

export default FlatListLocation

const createStyles = (theme) => 
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.card,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: 8,
    margin: 8,
    padding: 30,
    paddingBottom: 30,
    paddingTop: 50,
  },

  
 

 
});