import { StyleSheet, View, Image, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useAppData } from "../context/DataContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WaterLevelCard = ({
    title = 'Standardtitel',
    width = '45%',
    height = null,
    icon = null,
    image = null,
    parameter = null,
    alternateParams = [],
}) => {

    const { theme } = useTheme();
    const { monitoringData, loading, error } = useAppData();
    const [paramValue, setParamValue] = useState('Ej tillgänglig');
    const [timestamp, setTimestamp] = useState('Ingen tid');

    const findValueInData = (data, primaryParam, alternateParams = []) => {
        if (!data) return null;

        if (data[primaryParam] !== undefined) {
            return data[primaryParam];
        }

        for (const altParam of alternateParams) {
            if (data[altParam] !== undefined) {
                return data[altParam];
            }
        }

        const nestedObjects = ['data', 'readings', 'sensors', 'measurements'];
        for (const nestedKey of nestedObjects) {
            if (data[nestedKey]) {
                if (data[nestedKey][primaryParam] !== undefined) {
                    return data[nestedKey][primaryParam];
                }

                for (const altParam of alternateParams) {
                    if (data[nestedKey][altParam] !== undefined) {
                        return data[nestedKey][altParam];
                    }
                }
            }
        }

        return null;
    };

    const formatTimestamp = (rawTimestamp) => {
        if (!rawTimestamp || rawTimestamp === 'Ingen tid') return 'Ingen tid';

        try {
            if (typeof rawTimestamp === 'string' &&
                (rawTimestamp.includes('/') || rawTimestamp.includes('-'))) {
                return rawTimestamp;
            }

            const date = new Date(rawTimestamp);
            if (isNaN(date.getTime())) return String(rawTimestamp);

            return date.toLocaleString('sv-SE', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Fel vid datumformattering:', error);
            return String(rawTimestamp);
        }
    };

    const formatParameterValue = (value) => {
        if (value === null || value === undefined || value === 'Ej tillgänglig') {
            return 'Ej tillgänglig';
        }

        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(numValue)) {
            return value.toString();
        }

        switch (parameter) {
            case 'temperature':
                return numValue.toFixed(0);
            case 'humidity':
            case 'soilMoisture':
                return Math.round(numValue);
            case 'ultraSoundLevel':
                return numValue.toFixed(1);
            case 'airPressure':
            case 'pressureLevel':
                return Math.round(numValue);
            default:
                return Math.abs(numValue) < 10 ? numValue.toFixed(1) : Math.round(numValue);
        }
    };

    const getParameterTitle = (param) => {
        const titleMap = {
            airPressure: 'Lufttryck',
            soilMoisture: 'Jordfuktighet',
            temperature: 'Temperatur',
            humidity: 'Luftfuktighet',
            pressureLevel: 'Tryck',
            ultraSoundLevel: 'Vattennivå'
        };

        return param ? (titleMap[param] || param) : '';
    };

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

    const hasValidData = () => {
        return (
            monitoringData !== null &&
            monitoringData !== undefined &&
            Array.isArray(monitoringData) &&
            monitoringData.length > 0
        );
    };

    useEffect(() => {
        if (!hasValidData()) {
            setParamValue('Ej tillgänglig');
            setTimestamp('Ingen tid');
            return;
        }

        try {
            const latestData = monitoringData[0];
            const foundValue = findValueInData(latestData, parameter, alternateParams);

            if (foundValue !== null) {
                const formattedValue = formatParameterValue(foundValue);
                setParamValue(formattedValue);
            } else {
                setParamValue('Ej tillgänglig');
            }

            const timestampValue = findValueInData(
                latestData,
                'timestamp',
                ['time', 'date', 'recordedAt', 'created', 'createdAt']
            );

            if (timestampValue) {
                const formattedTime = formatTimestamp(timestampValue);
                setTimestamp(formattedTime);
            } else {
                setTimestamp('Ingen tid');
            }
        } catch (err) {
            console.error('Fel vid bearbetning av övervakningsdata:', err);
            setParamValue('Fel');
            setTimestamp('Ingen tid');
        }
    }, [monitoringData, parameter, alternateParams]);

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
                <Text style={{ color: theme.textColor }}>Laddar...</Text>
            ) : error ? (
                <Text style={{ color: 'red' }}>Fel: {error}</Text>
            ) : !hasValidData() ? (
                <View>
                    <Text style={{ color: theme.textColor }}>Ingen data tillgänglig</Text>
                </View>
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
