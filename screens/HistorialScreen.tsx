import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Config';

export default function HistorialScreen() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  async function obtenerProductos() {
    try {
      const productosRef = collection(db, 'productos');
      const querySnapshot = await getDocs(productosRef);
      const datos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          descripcion: data.descripcion || '',
          cantidad: data.cantidad || 0,
          precio: data.precio || 0
        };
      });
      setProductos(datos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Productos</Text>
      {productos.map((item, index) => (
        <View key={item.id || index} style={styles.item}>
          <Text style={styles.texto}>Descripción: {item.descripcion}</Text>
          <Text style={styles.texto}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.texto}>Precio: ${item.precio}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  texto: {
    fontSize: 16
  }
});
