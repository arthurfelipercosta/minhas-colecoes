// src\screens\Garagem.tsx

// import de pacotes
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// import de arquivos
import { storage } from '@/services/storage';
import { CarCard } from '@/components/CarCard';
import { Carro } from '@/config/carro';

export default function Garagem() {
  const [carros, setCarros] = useState<Carro[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadCars = async () => {
        const data = await storage.getAllCars();
        setCarros(data);
      };
      loadCars();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com Filtro */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Minha Garagem</Text>
          <Text style={styles.subtitle}>{carros.length} carrinhos na coleção</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#FF0000" />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Área da Lista (Placeholder) */}
      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarCard carro={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="car-sport-outline" size={80} color="#333" />
            <Text style={styles.emptyText}>Sua garagem está vazia.</Text>
            <Text style={styles.emptySubText}>Toque no "+" para adicionar seu primeiro carrinho.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#8E8E8F',
    fontSize: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100, // Espaço para não ficar atrás da TabBar
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptySubText: {
    color: '#8E8E8F',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  }
});