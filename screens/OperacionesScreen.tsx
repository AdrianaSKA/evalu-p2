import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/Config'


export default function OperacionesScreen({ navigation }: any) {
    const [id, setid] = useState("")
    const [precio, setprecio] = useState(0)
    const [cantidad, setcantidad] = useState(0)
    const [descripcion, setdescripcion] = useState("")



    async function save() {
        if (precio < 0) {
            Alert.alert("Error", "El precio no puede ser negativo")
            return
        }

        if ((precio > 0 && precio < 1) || precio > 20) {
            Alert.alert("Advertencia", "El monto es menor a $1 o mayor a $20. ¿Desea continuar con la operación?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Sí, continuar",
                        onPress: () => guardarOperacion()
                    }
                ]
            )
        } else {
            guardarOperacion()
        }
    }

    async function guardarOperacion() {
        try {
            const docRef = await addDoc(collection(db, "productos"), {
                id: id,
                precio: precio,
                cantidad: cantidad,
                descripcion: descripcion,
            });
            console.log("Document written with ID: ", docRef.id);

            Alert.alert("Mensaje", "Registro exitoso del producto")

                navigation.navigate('Historial')

        } catch (error) {
            Alert.alert("Error", "No se pudo guardar la operación")
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Operaciones</Text>
            <TextInput
                placeholder='Ingresar ID'
                onChangeText={(text) => setid(text)}
                style={styles.txt}
            />


            <TextInput
                placeholder='Ingresar precio'
                keyboardType='numeric'
                onChangeText={(text) => setprecio(Number(text))}
                style={styles.txt}

            />

            <TextInput
                placeholder='Ingresar cantidad'
                keyboardType='numeric'
                onChangeText={(text) => setcantidad(Number(text))}
                style={styles.txt}

            />
            <TextInput
                placeholder='Ingresar descripcion'
                onChangeText={(text) => setdescripcion((text))}
                style={styles.txt}

            />
            <Button title='Guardar' onPress={() => save()} />

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