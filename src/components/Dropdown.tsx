import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';

// Definimos o que o componente precisa receber
interface Props {
    placeholder: string;
    data: { label: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
    onAddNew?: (text: string) => void; // Função opcional para quando cadastrar novo
}

export const CustomDropdown = ({ placeholder, data, value, onChange, onAddNew }: Props) => {
    const [localData, setLocalData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddNew = (text: string) => {
        const newValue = text.toLowerCase().replace(/\s/g, '-');
        const newItem = { label: text, value: newValue };

        setLocalData([...localData, newItem]);
        onChange(newValue);
        if (onAddNew) onAddNew(text);
    };

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            containerStyle={styles.containerStyle}
            itemTextStyle={{ color: '#fff' }}
            activeColor="#333"
            data={localData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Procure ou digite algo novo..."
            value={value}
            onChange={item => onChange(item.value)}
            onChangeText={setSearchQuery}
            renderItem={(item) => (
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                </View>
            )}
            flatListProps={{
                ListFooterComponent: () => (
                    searchQuery.length > 0 && !localData.find(d => d.label.toLowerCase() === searchQuery.toLowerCase()) ? (
                        <TouchableOpacity
                            style={styles.footer}
                            onPress={() => handleAddNew(searchQuery)}
                        >
                            <Ionicons name="add-circle-outline" size={20} color="#E31C1C" />
                            <Text style={styles.footerText}>Cadastrar "{searchQuery}"</Text>
                        </TouchableOpacity>
                    ) : null
                )
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: '#222',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    containerStyle: {
        backgroundColor: '#222',
        borderWidth: 0,
        borderRadius: 8,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: { flex: 1, fontSize: 16, color: '#fff' },
    placeholderStyle: { fontSize: 16, color: '#666' },
    selectedTextStyle: { fontSize: 16, color: '#fff' },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#444',
        gap: 10
    },
    footerText: { color: '#E31C1C', fontWeight: 'bold' }
});