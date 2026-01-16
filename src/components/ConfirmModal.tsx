// src\components\ConfirmModal.tsx

// import de pacotes
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({
    visible, title, message, onClose, onConfirm,
    confirmText = "Excluir", cancelText = "Cancelar"
}: ConfirmModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="warning" size={40} color="#E31C1C" />
                    </View>

                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    content: {
        width: '100%',
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333'
    },
    iconContainer: { marginBottom: 15 },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    message: {
        color: '#8E8E8F',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 15,
        width: '100%'
    },
    cancelButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#333'
    },
    confirmButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: '#E31C1C'
    },
    cancelText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    confirmText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});