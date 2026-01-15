// src\components\Input.tsx

// import de pacotes
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label: string;
    rightIcon?: React.ReactNode;
    error?: boolean;
}

export const Input = ({ label, rightIcon, error, ...props }: InputProps) => {
    return (
        <View style={[styles.container, props.style]}>
            <View style={[
                styles.inputWrapper,
                error && { borderColor: '#E31C1C', borderWidth: 1 }
            ]}>
                <TextInput
                    style={styles.input}
                    placeholder={label}
                    placeholderTextColor="#666"
                    {...props}
                />
                {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { marginBottom: 12 },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 6,
        alignItems: 'center',
        paddingHorizontal: 12,
        height: 45,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
    },
    icon: { marginLeft: 10 }
});