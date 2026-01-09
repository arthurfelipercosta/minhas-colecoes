import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '@/components/Input';
import { Checkbox } from '@/components/Checkbox';
import { CustomDropdown } from '@/components/Dropdown';
import { Carro } from '@/config/carro';
import { MARCAS, PAISES, FABRICANTES, SERIES, COLECOES } from '@/config/data';

export default function AddScreen() {
    // Inicializa como um objeto vazio mas tipado como Carro (ou Partial<Carro>)
    const [carro, setCarro] = useState<Partial<Carro>>({});

    const handleSave = () => {
        console.log('Dados preenchidos:', carro);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {}}>
                    <View style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#E31C1C" />
                        <Text style={styles.backText}>Voltar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                    <Ionicons name="save" size={28} color="#E31C1C" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <TouchableOpacity style={styles.imagePicker}>
                    <Ionicons name="camera" size={50} color="#444" />
                </TouchableOpacity>

                {/* MARCA DO VEÍCULO (Jaguar, Ford, etc) */}
                <CustomDropdown
                    placeholder="Marca do Veículo"
                    data={FABRICANTES}
                    value={carro?.marca || null} // Uso do ?. para não quebrar
                    onChange={(val) => setCarro({ ...carro, marca: val })}
                />

                <Input 
                    label="Modelo (Ex: P1, FXX...)" 
                    value={carro?.modelo}
                    onChangeText={(val) => setCarro({ ...carro, modelo: val })}
                />

                <View style={styles.row}>
                    <View style={{ flex: 1.5, marginRight: 10 }}>
                        <Input 
                            label="SKU (Code)" 
                            value={carro?.code}
                            onChangeText={(val) => setCarro({ ...carro, code: val })}
                        />
                    </View>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Input 
                            label="Ano" 
                            keyboardType="numeric"
                            value={carro?.year?.toString()}
                            onChangeText={(val) => setCarro({ ...carro, year: Number(val) })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input 
                            label="Nº Série" 
                            value={carro?.numberSerie}
                            onChangeText={(val) => setCarro({ ...carro, numberSerie: val })}
                        />
                    </View>
                </View>

                {/* MARCA DO BRINQUEDO (Hot Wheels, Matchbox) */}
                <CustomDropdown
                    placeholder="Fabricante (Ex: Hot Wheels)"
                    data={MARCAS}
                    value={carro?.brand || null}
                    onChange={(val) => setCarro({ ...carro, brand: val })}
                />

                <CustomDropdown
                    placeholder="Série"
                    data={SERIES}
                    value={carro?.serieName || null}
                    onChange={(val) => setCarro({ ...carro, serieName: val })}
                />

                <CustomDropdown
                    placeholder="País"
                    data={PAISES}
                    value={carro?.country || null}
                    onChange={(val) => setCarro({ ...carro, country: val })}
                />

                <View style={styles.checkboxContainer}>
                    <Checkbox 
                        label="New Model" 
                        value={!!carro?.isNewModel} // Transforma undefined em false
                        onChange={(v) => setCarro({ ...carro, isNewModel: v })} 
                    />
                    <Checkbox 
                        label="Customizado" 
                        value={!!carro?.isCustom} 
                        onChange={(v) => setCarro({ ...carro, isCustom: v })} 
                    />
                    <Checkbox 
                        label="Pneu de borracha" 
                        value={!!carro?.hasRubberTires} 
                        onChange={(v) => setCarro({ ...carro, hasRubberTires: v })} 
                    />
                    <Checkbox 
                        label="À venda" 
                        value={!!carro?.isForSale} 
                        onChange={(v) => setCarro({ ...carro, isForSale: v })} 
                    />
                </View>

                <View style={styles.row}>
                    <Input 
                        label="Preço Compra" 
                        keyboardType="numeric"
                        onChangeText={(val) => setCarro({ ...carro, buyPrice: Number(val) })}
                    />
                    <Input 
                        label="Preço Venda" 
                        keyboardType="numeric"
                        onChangeText={(val) => setCarro({ ...carro, sellPrice: Number(val) })}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
    backButton: { flexDirection: 'row', alignItems: 'center' },
    backText: { color: '#E31C1C', fontSize: 16 },
    scrollContent: { paddingHorizontal: 20 },
    imagePicker: { width: '100%', height: 250, backgroundColor: '#1A1A1A', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    checkboxContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 15 }
});