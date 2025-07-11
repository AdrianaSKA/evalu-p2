import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido~</Text>

            <Image
                source={{ uri: 'https://i.pinimg.com/736x/39/a6/4e/39a64ea394eccd5025423af0b47cdc00.jpg' }}
                style={styles.image}
                resizeMode="contain"
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Registro</Text>
            </TouchableOpacity>

            <Text style={styles.txt}>Desarrollado por: Adriana Escalante</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom:20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    txt: {
        fontSize: 20,
        marginBottom: 20,
        margin: 25,
    },
});
