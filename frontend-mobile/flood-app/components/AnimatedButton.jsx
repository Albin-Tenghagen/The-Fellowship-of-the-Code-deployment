import { StyleSheet, Text, Animated, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { useTheme } from '../themes/ThemeContext'

const AnimatedButton = () => {
    const { theme } = useTheme(); //importera!!!
    const styles = createStyles(theme);

    const scale = useRef ( new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.85, 
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1, 
            tension: 40,
            friction: 2,

            useNativeDriver: true,
        }).start();
    };

  return (
    <Animated.View style={[styles.buttonWrapper, {transform: [{scale}]}]}>
        <Pressable
            onPress={ handlePressIn }
            onPressOut={ handlePressOut }
            style={styles.button}
            accessibilityRole='button'
            accessibilityLabel='Knapp med animering'>
            <Text style={styles.buttonText}> Tryck här!</Text>
        </Pressable>
    </Animated.View>
  )
}

export default AnimatedButton

const createStyles = (theme) =>
    StyleSheet.create({
        buttonWrapper: {
            alignItems:"center",
            justifyContent: "center",
            marginTop: 20
        },
        button: {
            backgroundColor: theme.accent,
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 8,

        },
        buttonText: {
            fontSiza: 18,

        }
    })

    // för att lägga in
    //<AnimatedButton/>