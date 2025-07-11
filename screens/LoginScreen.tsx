import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';


export default function LoginScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {

                const user = userCredential.user;
                console.log(user);

                Alert.alert("Mensaje", "Login exitoso")

                navigation.navigate('Tab')
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);


                if (errorCode == "auth/invalid-email") {
                    errorCode = "Credenciales invalidas"
                    errorMessage = "Verificar correo y contraseña"
                } else if (errorCode == "auth/missing-password") {
                    errorCode = "Error en contraseña"
                    errorMessage = "No se reconocio la contraseña o se envio la contraseña en blanco"
                } else {
                    errorCode = "Error"
                    errorMessage = "Error en las credenciales, verificar correo y contraseña"
                }

                Alert.alert(errorCode, errorMessage)

            });

    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
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
            <Button title='Login' onPress={() => login()} />

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