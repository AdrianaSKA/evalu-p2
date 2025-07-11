import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/Config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);

        const data = docSnap.data();
        setUsuario(data!.usuario);
        setCorreo(data!.correo);
        setCelular(data!.celular);
      }
    });

  });

  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('Home')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.value}>{usuario}</Text>

      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{correo}</Text>

      <Text style={styles.label}>Celular:</Text>
      <Text style={styles.value}>{celular}</Text>

      <TouchableOpacity onPress={() => logout()} style={styles.button}>
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 20,
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
  },
});
