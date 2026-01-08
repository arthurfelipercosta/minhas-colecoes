import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Garagem() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minha Garagem</Text>

            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PERFIL')}
                >
                    <Text style={styles.buttonText}>Ir para Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#E31C1C' }]}
                    onPress={() => navigation.navigate('Add')}
                >
                    <Text style={styles.buttonText}>Adicionar Novo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20
    },
    menu: {
        gap: 10,
        width: '80%'
    },
    button: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});