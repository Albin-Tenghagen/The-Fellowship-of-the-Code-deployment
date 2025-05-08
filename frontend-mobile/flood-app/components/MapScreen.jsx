import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([
        {
            id: 1,
            coordinate: {
                latitude: 58.91667,
                longitude: 13.50000,
            },
            title: 'Lake Vänern',
            description: 'Largest lake in Sweden and the EU',
        },
        {
            id: 2,
            coordinate: {
                latitude: 58.33333,
                longitude: 14.50000,
            },
            title: 'Lake Vättern',
            description: 'Second largest lake in Sweden with crystal clear water',
        },
        {
            id: 3,
            coordinate: {
                latitude: 59.50000,
                longitude: 17.20000,
            },
            title: 'Lake Mälaren',
            description: 'Third largest lake in Sweden, near Stockholm',
        },
    ]);

    useEffect(() => {
        (async () => {
            // Request location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get current location
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const goToCurrentLocation = () => {
        if (location && mapRef.current) {

            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitude: 60.1282,       // Center of Sweden
                longitude: 18.6435,
                latitudeDelta: 7.5,      // Show more area
                longitudeDelta: 7.5
            });
        } else {
            console.log('Location not ready yet.');
        }
    };

    // If location permission was denied, show an error
    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 60.1282,       // Center of Sweden
                    longitude: 18.6435,
                    latitudeDelta: 7.5,      // Show more area
                    longitudeDelta: 7.5,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                    >
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.calloutTitle}>{marker.title}</Text>
                                <Text>{marker.description}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
                <Text style={styles.buttonText}>My Location</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    callout: {
        padding: 10,
        maxWidth: 200,
    },
    calloutTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    locationButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        margin: 20,
    },
});