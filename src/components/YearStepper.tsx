// src/components/YearStepper.tsx

// import de pacotes
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface YearStepperProps {
    value?: number;
    onChange: (year: number) => void;
}

export const YearStepper = ({ value, onChange }: YearStepperProps) => {
    // Se não tiver valor, pega o ano atual como base
    const currentYear = value || new Date().getFullYear();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ano</Text>

            <View style={styles.controls}>
                <TouchableOpacity
                    onPress={() => onChange(currentYear - 1)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-down" size={22} color="#E31C1C" />
                </TouchableOpacity>

                <Text style={styles.value}>{currentYear}</Text>

                <TouchableOpacity
                    onPress={() => onChange(currentYear + 1)}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-up" size={22} color="#E31C1C" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222',
        borderRadius: 8,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    label: {
        color: '#666',
        fontSize: 12,
        fontWeight: '500',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    value: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 45,
        textAlign: 'center',
    },
});