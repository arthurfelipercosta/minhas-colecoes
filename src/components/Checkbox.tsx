import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
    icon?: keyof typeof Ionicons.glyphMap;
    activeColor?: string;
}

export const Checkbox = ({ label, value, icon = "checkmark", activeColor = "#E31C1C", onChange }: CheckboxProps) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => onChange(!value)}
        activeOpacity={0.8}
    >
        <View style={[styles.box, value &&
            { backgroundColor: activeColor, borderColor: activeColor }]}>
            {value && <Ionicons name={icon} size={16} color="white" />}
        </View>
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '50%' // Para caber dois por linha se quiser
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