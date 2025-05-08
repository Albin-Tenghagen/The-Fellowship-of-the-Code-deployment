import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useAppData } from "../context/DataContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WaterLevelCard = ({
    title = 'Default Title',
    width = '45%',
    height = null,
    icon = null,
    image = null,
    parameter = null,
}) => {
    
    const { theme } = useTheme();
    const { monitoringData, loading, error } = useAppData();
    const [paramValue, setParamValue] = useState('N/A');
    const [timestamp, setTimestamp] = useState('No date');
    
    useEffect(() => {
        if (Array.isArray(monitoringData) && monitoringData.length > 0 && parameter) {
            const latestData = monitoringData[0];

            if (latestData[parameter] !== undefined) {
                setParamValue(latestData[parameter]);
            } else if (latestData.data && latestData.data[parameter] !== undefined) {
                setParamValue(latestData.data[parameter]);
            } else {
                setParamValue('N/A');
            }
            
    
            if (latestData.timestamp) {
                setTimestamp(latestData.timestamp);
            } else {
                setTimestamp('No date');
            }
        } else {
            setParamValue('N/A');
            setTimestamp('No date');
        }
    }, [monitoringData, parameter]);

    const getParameterIcon = () => {
        if (!parameter) return icon;
        
        const iconMap = {
            airPressure: 'weather-windy',
            soilMoisture: 'water-percent',
            temperature: 'thermometer',
            humidity: 'water-percent',
            pressureLevel: 'gauge',
            ultraSoundLevel: 'wave',
        };
        
        return iconMap[parameter] || icon;
    };

    const getParameterUnit = () => {
        const unitMap = {
            airPressure: 'hPa',
            soilMoisture: '%',
            temperature: '°C',
            humidity: '%',
            pressureLevel: 'kPa',
            ultraSoundLevel: 'm',
        };
        
        return parameter ? unitMap[parameter] || '' : '';
    };

    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.card },
                width ? { width } : {},
                height ? { height } : { aspectRatio: 1 },
            ]}
        >
            {getParameterIcon() && (
                <MaterialCommunityIcons
                    name={getParameterIcon()}
                    size={32}
                    color={theme.icon}
                    style={{ marginBottom: 8 }}
                />
            )}
            
            {image && (
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            
            <Text style={[styles.text, { color: theme.textColor }]}>
                {title}
            </Text>
            
            {loading ? (
                <Text style={{ color: theme.textColor }}>Loading...</Text>
            ) : error ? (
                <Text style={{ color: 'red' }}>Error: {error}</Text>
            ) : !Array.isArray(monitoringData) || monitoringData.length === 0 ? (
                <Text style={{ color: theme.textColor }}>No data available</Text>
            ) : (
                <View style={styles.dataContainer}>
                    <Text style={[styles.valueText, { color: theme.textColor }]}>
                        {paramValue} {getParameterUnit()}
                    </Text>
                    <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
                        {timestamp}
                    </Text>
                </View>
            )}
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
    image: {
        width: 60,
        height: 60,
        marginBottom: 8,
    },
    dataContainer: {
        alignItems: 'center',
        marginTop: 4,
    },
    valueText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
});