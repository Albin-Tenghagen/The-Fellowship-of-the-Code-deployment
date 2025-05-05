import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TipsCard = ({
    title = 'Default Title',
    width = '45%',
    height = null,
    icon = null,
    image = null,
    tips = [],
    loading = false,
    error = null,
    renderContent = null,
}) => {

    const { theme } = useTheme();

    const defaultRenderContent = () => {
        if (loading) {
            return <Text style={{ color: theme.textColor }}>Loading...</Text>;
        } else if (error) {
            return <Text style={{ color: 'red' }}>{error}</Text>;
        } else if (tips && tips.length > 0) {
            return (
                <View style={{ marginVertical: 4, alignItems: 'center' }}>
                    <Text style={[styles.itemText, { color: theme.textColor }]}>
                        {tips[0].title}
                    </Text>
                    <Text style={[styles.categoryText, { color: theme.textColor }]}>
                        {tips[0].category}
                    </Text>
                </View>
            );
        } else {
            return <Text style={{ color: theme.textColor }}>No tips available</Text>;
        }
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

            {renderContent ? renderContent(tips, loading, error, theme) : defaultRenderContent()}
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
    itemText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      categoryText: {
        fontSize: 12,
        textAlign: 'center',
      },
      image: {
        width: 48,
        height: 48,
        borderRadius: 4,
        marginBottom: 8,
      },
});
