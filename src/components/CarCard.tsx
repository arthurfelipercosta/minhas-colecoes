import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Carro } from '@/config/carro';
import { FABRICANTES, MARCAS } from '@/config/data';

export const CarCard = ({ carro }: { carro: Carro }) => {
    const navigation = useNavigation();

    const montadora = FABRICANTES.find(f => f.value === carro.marca);
    const marcaBrinquedo = MARCAS.find(m => m.value === carro.brand);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Add' as never, { carToEdit: carro } as never)}
        >
            <View style={styles.card}>
                {/* 1/4 do lado esquerdo para a imagem */}
                <View style={styles.imageContainer}>
                    <Image
                        source={carro.imageUri ? { uri: carro.imageUri } : require('@/assets/manufacturers/none.png')}
                        style={styles.carImage}
                    />
                </View>

                {/* Dados no lado direito */}
                <View style={styles.infoContainer}>
                    <View style={styles.topRow}>
                        <Text style={styles.modelText} numberOfLines={1}>
                            {carro.modelo}
                        </Text>
                        {montadora?.image && (
                            <Image source={montadora.image} style={styles.brandLogo} />
                        )}
                    </View>

                    <View style={styles.middleRow}>
                        <Text style={styles.yearText}>{carro.year}</Text>
                        <Text style={styles.skuText}>{carro.code || '---'}</Text>
                    </View>

                    <View style={styles.bottomRow}>
                        {/* Exibe o logo da Hot Wheels/Matchbox etc */}
                        {marcaBrinquedo?.image ? (
                            <Image source={marcaBrinquedo.image} style={styles.toyLogo} />
                        ) : (
                            <Text style={styles.brandNameText}>{carro.brand}</Text>
                        )}

                        {/* Badge de Raridade (opcional, se quiser mostrar) */}
                        {carro.rarity && carro.rarity !== 'normal' && (
                            <View style={[
                                styles.rarityBadge,
                                { backgroundColor: carro.rarity === 'super' ? '#FFD700' : '#C0C0C0' }
                            ]}>
                                <Text style={styles.rarityText}>
                                    {carro.rarity === 'super' ? 'STH' : 'TH'}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', // Alinha imagem e texto lado a lado
        backgroundColor: '#161616',
        borderRadius: 10,
        marginBottom: 12,
        height: 90, // Altura fixa e menor
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
    },
    imageContainer: {
        width: '25%', // Ocupa 1/4 da largura
        backgroundColor: '#1A1A1A',
    },
    carImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modelText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 5,
    },
    brandLogo: {
        width: 25,
        height: 15,
        resizeMode: 'contain',
    },
    middleRow: {
        flexDirection: 'row',
        gap: 10,
    },
    yearText: {
        color: '#8E8E8F',
        fontSize: 13,
    },
    skuText: {
        color: '#555',
        fontSize: 13,
        fontWeight: '600',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    toyLogo: {
        width: 60,
        height: 18,
        resizeMode: 'contain',
    },
    brandNameText: {
        color: '#8E8E8F',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    rarityBadge: {
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
    },
    rarityText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
    }
});