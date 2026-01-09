// src\screens\Perfil.tsx

// import de pacotes
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Perfil() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Perfil do Usuário</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 20 },
  text: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 10 }
});