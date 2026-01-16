// src\services\storage.ts

// import de pacotes
import AsyncStorage from '@react-native-async-storage/async-storage';

// import de arquivos
import { Carro } from '@/config/carro';

const COLLECTION_KEY = '@minhas_colecoes:carros';

export const storage = {
    async saveCar(carro: Partial<Carro>) {
        try {
            const storageData = await AsyncStorage.getItem(COLLECTION_KEY);
            let listaAtual: Carro[] = storageData ? JSON.parse(storageData) : [];

            // Se o carro já tem ID, estamos EDITANDO
            if (carro.id) {
                // Encontra a posição do carro na lista e substitui pelos novos dados
                listaAtual = listaAtual.map(item =>
                    item.id === carro.id ? { ...item, ...carro } as Carro : item
                );
            } else {
                // Se não tem ID, estamos CRIANDO um novo
                const novoCarro = {
                    ...carro,
                    id: String(Date.now()), // Gera ID único apenas para novos
                    dataCadastro: Date.now(),
                } as Carro;

                listaAtual = [novoCarro, ...listaAtual]; // Adiciona no topo
            }

            await AsyncStorage.setItem(COLLECTION_KEY, JSON.stringify(listaAtual));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async getAllCars(): Promise<Carro[]> {
        try {
            const storageData = await AsyncStorage.getItem(COLLECTION_KEY);
            return storageData ? JSON.parse(storageData) : [];
        } catch (error) {
            return [];
        }
    },
    async deleteCar(id: string) {
        try {
            const storageData = await AsyncStorage.getItem(COLLECTION_KEY);
            if (!storageData) return false;

            const listaAtual: Carro[] = JSON.parse(storageData);
            // Filtra a lista removendo o item com o ID informado
            const novaLista = listaAtual.filter(item => item.id !== id);

            await AsyncStorage.setItem(COLLECTION_KEY, JSON.stringify(novaLista));
            return true;
        } catch (error) {
            console.error('Erro ao deletar:', error);
            return false;
        }
    }
}