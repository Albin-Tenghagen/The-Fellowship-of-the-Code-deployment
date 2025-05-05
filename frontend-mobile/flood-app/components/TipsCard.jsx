import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { useAppData } from "../context/DataContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TipsCard = ({
    title = 'Default Title',
    width = '45%',
    height = null,
    icon = null,
    image = null,
  }) => {

    const { theme } = useTheme();
    const { tipsData, loading, error } = useAppData();


    return (
        <View
            style={[
                styles.card,
                { backgroundColor: theme.card },
                width ? { width } : {},
                height ? { height } : { aspectRatio: 1 },
            ]}
        >
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
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
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                tipsData.length > 0 && tipsData.map((tip, index) => (
                    <View key={index} style={{ marginVertical: 4, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: theme.textColor }}>{tip.title}</Text>
                        <Text style={{ fontSize: 12, color: theme.textColor }}>{tip.category}</Text>
                    </View>
                ))
            )}


        </View>
    );
};

export default TipsCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        aspectRatio: 1,
        borderRadius: 8,
        margin: 8,
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
    },
});
