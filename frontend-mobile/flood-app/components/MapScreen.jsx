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
                latitude: 58.5333,
                longitude: 15.6167,
            },
            title: 'Sjön Roxen',
            description: 'En stor sjö norr om Linköping, populär för fiske och båtliv.',
        },
        {
            id: 2,
            coordinate: {
                latitude: 58.2667,
                longitude: 15.6833,
            },
            title: 'Sjön Rängen',
            description: 'Känd för sitt klara vatten och natursköna omgivningar.',
        },
        {
            id: 3,
            coordinate: {
                latitude: 58.2333,
                longitude: 15.6167,
            },
            title: 'Sjön Järnlunden',
            description: 'Läge sydost om Linköping, erbjuder fiske och naturupplevelser.',
        },
        {
            id: 4,
            coordinate: {
                latitude: 58.4109,
                longitude: 15.6216,
            },
            title: 'Stångån / Kinda kanal',
            description: 'Flödar genom Linköping och ingår i Kinda kanal, populär för båtturer.',
        },
        {
            id: 5,
            coordinate: {
                latitude: 58.4000,
                longitude: 15.7000,
            },
            title: 'Svartån',
            description: 'Rinner ut i Roxen och är känd för sin vackra natur.',
        },
        {
            id: 6,
            coordinate: {
                latitude: 58.5500,
                longitude: 15.3000,
            },
            title: 'Motala ström',
            description: 'Förbinder Vättern med Östersjön, passerar genom Roxen.',
        },
    ]);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

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
                    latitude: 58.4109,      
                    longitude: 15.6216,
                    latitudeDelta: 0.6,     
                    longitudeDelta: 0.6,
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