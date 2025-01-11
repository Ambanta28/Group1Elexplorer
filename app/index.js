import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Utility function to generate random colors
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={{
                    uri: 'https://i.ibb.co/z8xZzfR/elexplorer.png',
                }}
                style={styles.logo}
            />

            {/* App Name */}
            <Text style={styles.appName}>ELEXPLORER</Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {['Learning', 'Quiz Game', 'Setting', 'Exit'].map((title, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, { backgroundColor: getRandomColor() }]}
                        onPress={() => navigation.navigate(title.replace(' ', ''))} // Replace with actual screen names
                    >
                        <Text style={styles.buttonText}>{title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15, // Space between buttons
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
