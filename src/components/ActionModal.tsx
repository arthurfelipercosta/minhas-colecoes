// src/components/ActionModal.tsx

// import de pacotes
import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Option {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    options: Option[];
}

export const ActionModal = ({ visible, onClose, options }: Props) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.container}>
                    <View style={styles.handle} />

                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.option}
                            onPress={() => {
                                option.onPress();
                                onClose();
                            }}
                        >
                            <Ionicons name={option.icon} size={24} color="#FFF" />
                            <Text style={styles.optionLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={[styles.option, styles.cancelBtn]} onPress={onClose}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    container: {
        backgroundColor: '#1A1A1A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#333',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        gap: 15,
    },
    optionLabel: { color: '#FFF', fontSize: 16, fontWeight: '500' },
    cancelBtn: { justifyContent: 'center', borderBottomWidth: 0, marginTop: 10 },
    cancelText: { color: '#E31C1C', fontSize: 16, fontWeight: 'bold' }
});