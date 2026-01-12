import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tipo atualizado conforme seu pedido
type Rarity = 'normal' | 'regular' | 'super';

interface Props {
    label: string;
    value: Rarity;
    onChange: (value: Rarity) => void;
}

export const RarityCheckbox = ({ label, value, onChange }: Props) => {

    // Lógica de ciclo atualizada: normal -> regular -> super -> normal
    const handlePress = () => {
        if (value === 'normal' || !value) onChange('regular');
        else if (value === 'regular') onChange('super');
        else onChange('normal');
    };

    // Cores e ícones baseados nos novos nomes
    const getStyles = () => {
        switch (value) {
            case 'regular': return { color: '#C0C0C0', icon: 'car-sport-sharp' }; // Prata
            case 'super': return { color: '#FFD700', icon: 'car-sport-sharp' };      // Dourado
            default: return { color: '#444', icon: null };                // Normal
        }
    };

    const config = getStyles();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            <View style={[
                styles.box,
                value !== 'normal' && { backgroundColor: config.color, borderColor: config.color }
            ]}>
                {config.icon && <Ionicons name={config.icon as any} size={16} color="black" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '50%'
    },
    box: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#444',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: { color: '#fff', fontSize: 14 }
});