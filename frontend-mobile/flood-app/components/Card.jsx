import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({
    title = 'Default Title',
    width = '45%',
    height = null,
    icon = null,
    image = null,
}) => {

    const { theme } = useTheme();

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
        </View>
    );
};

export default Card;

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
