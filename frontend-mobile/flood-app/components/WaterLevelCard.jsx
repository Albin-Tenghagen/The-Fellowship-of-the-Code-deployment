import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import baseUrl from '../services/urlConfig';

const WaterLevelCard = ({
    title = 'Standardtitel',
    width = '45%',
    height = null,
    icon = null,
    parameter = null,
}) => {
    const { theme } = useTheme();
    const [paramValue, setParamValue] = useState('Loading...');


    useEffect(() => {
        const testFetch = async () => {
            try {
                console.log(`=== Testing fetch for ${parameter} ===`);
                
                const response = await fetch(`${baseUrl}/admins/authenticated/monitoring`);
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    setParamValue(`Error: ${response.status}`);
                    return;
                }
                
                const data = await response.json();
                console.log('Full response:', data);
                
                if (!data.data || data.data.length === 0) {
                    console.log('No data from API, using fallback data...');
                    
    
                    const fallbackData = {
                        "id": 1001,
                        "timestamp": "18/4-25",
                        "airPressure": 32,
                        "soilMoisture": 52,
                        "temperature": 14,
                        "humidity": 43,
                        "pressureLevel": 53,
                        "ultraSoundLevel": 4
                    };
                    
                    if (fallbackData[parameter] !== undefined) {
                        let value = fallbackData[parameter];
                        
                        if (parameter === 'temperature') {
                            value = `${value}°C`;
                        } else if (parameter === 'humidity' || parameter === 'soilMoisture') {
                            value = `${value}%`;
                        } else if (parameter === 'airPressure') {
                            value = `${value} hPa`;
                        } else if (parameter === 'pressureLevel') {
                            value = `${value} kPa`;
                        } else if (parameter === 'ultraSoundLevel') {
                            value = `${value} m`;
                        }
                        
                        setParamValue(value);
                    } else {
                        setParamValue('No parameter match');
                    }
                    return;
                }
                
                const first = data.data[0];
                console.log('First entry:', first);
                console.log(`Value for ${parameter}:`, first[parameter]);
                
                if (first[parameter] !== undefined) {
                    setParamValue(`${first[parameter]}`);
                } else {
                    setParamValue('No value in API data');
                }
                
            } catch (error) {
                console.error('Fetch error:', error);
                setParamValue(`Error: ${error.message}`);
            }
        };

        if (parameter) {
            testFetch();
        }
    }, [parameter]);

    const getParameterIcon = () => {
        const iconMap = {
            temperature: 'thermometer',
            humidity: 'water-percent',
            airPressure: 'weather-windy',
            soilMoisture: 'water-percent',
            pressureLevel: 'gauge',
            ultraSoundLevel: 'wave',
        };
        return iconMap[parameter] || icon;
    };

    return (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
            {getParameterIcon() && (
                <MaterialCommunityIcons
                    name={getParameterIcon()}
                    size={32}
                    color={theme.icon}
                    style={{ marginBottom: 8 }}
                />
            )}
            
            <Text style={[styles.text, { color: theme.textColor }]}>
                {title}
            </Text>
            
            <Text style={[styles.valueText, { color: theme.textColor }]}>
                {paramValue}
            </Text>
        </View>
    );
};

export default WaterLevelCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        aspectRatio: 1,
        borderRadius: 8,
        margin: 8,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 8,
    },
    valueText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    debugText: {
        fontSize: 10,
        marginTop: 4,
    },
});