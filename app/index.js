import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        <ScrollView contentContainerStyle={styles.container}>
        <Image
            source={{
                uri: 'https://i.ibb.co/z8xZzfR/elexplorer.png',
            }}
            style={styles.logo}
        />
        <Text style={styles.appName}>ELEXPLORER</Text>
        <View style={styles.buttonContainer}>
            {['Learning'].map((title, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, { backgroundColor: getRandomColor() }]}
                    onPress={() => navigation.navigate(title.replace(' ', ''))} 
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingBottom: 20,
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
        marginBottom: 15, 
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
