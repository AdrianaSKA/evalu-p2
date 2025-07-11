import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '../firebase/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

export default function RegisterScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [usuario, setusuario] = useState("")
    const [celular, setcelular] = useState("")

    function register() {
        if (!usuario || !correo || !celular) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {

                const user = userCredential.user;

                save(user.uid)

                Alert.alert("Mensaje", "Registro exitoso")

                navigation.navigate('Login')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage);

                Alert.alert("Error", errorMessage)
            });

    }

    async function save(uid: string) {

        await setDoc(doc(db, "usuarios", uid), {
            usuario: usuario,
            correo: correo,
            celular: celular,
        });

        console.log("Datos del usuario guardados");
    }

    return (
        <View style={styles.container}>
            <Text>Registrar</Text>
            <TextInput
                placeholder='Ingresar correo'
                onChangeText={(text) => setcorreo(text)}
                style={styles.txt}
            />


            <TextInput
                placeholder='Ingresar contraseña'
                onChangeText={(text) => setcontrasenia(text)}
                style={styles.txt}

            />

            <TextInput
                placeholder='Ingresar usuario'
                onChangeText={(text) => setusuario(text)}
                style={styles.txt}

            />
            <TextInput
                placeholder='Ingresar celular'
                onChangeText={(text) => setcelular((text))}
                style={styles.txt}

            />
            <Button title='Register' onPress={() => register()} />

        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        backgroundColor: 'white',
        width: "80%",
        margin: 5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});