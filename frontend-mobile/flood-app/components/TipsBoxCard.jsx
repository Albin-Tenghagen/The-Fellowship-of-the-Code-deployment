import { StyleSheet, View, Image, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../themes/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainButton from './MainButton';

const TipsBoxCard = ({
    title = 'Default Title',
    width = '45%',
    height = null,
    icon = null,
    image = null,
}) => {

    const { theme } = useTheme();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (!message.trim()) {
            Alert.alert('Please write something');
            return;
        }

        console.log("Sending message:", message);

        Alert.alert('Thanks!', 'Your report has been sent.');
        setMessage('');

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

            <TextInput
                placeholder="Describe the flood situation..."
                style={[styles.placeholder, styles.text]}
                placeholderTextColor={theme.primary}
                value={message}
                onChangeText={setMessage}
            />

            <MainButton
                title="Skicka Report"
                onPress={handleSend}
                color={theme.button}
                style={[styles.button]}
            />

        </View>
    );
};

export default TipsBoxCard;

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
    button: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    placeholder: {
        width: '80%',
        height: 150,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        width: '90%',
        marginBottom: 8,
    },
});
