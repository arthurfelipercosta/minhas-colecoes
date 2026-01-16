// src\screens\add.tsx
// import de pacotes
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

// import de arquivos
import { Input } from '@/components/Input';
import { storage } from '@/services/storage';
import { Checkbox } from '@/components/Checkbox';
import { YearStepper } from '@/components/YearStepper';
import { CustomDropdown } from '@/components/Dropdown';
import { RarityCheckbox } from '@/components/RarityCheckbox';
import { ActionModal } from '@/components/ActionModal';
import { Carro } from '@/config/carro';
import { MARCAS, PAISES, FABRICANTES, SERIES, PREMIUM, COLECOES, CONTADORANUAL, SIMPLECOLOR } from '@/config/data';
import { ConfirmModal } from '@/components/ConfirmModal';


const getAnosDisponiveis = (): { label: string; value: string }[] => {
    const anoAtual = new Date().getFullYear();
    const anos: { label: string; value: string }[] = [];

    for (let ano = anoAtual; ano >= 1968; ano--) {
        anos.push({
            label: ano.toString(),
            value: ano.toString()
        });
    }
    return anos;
}

const getTotalAno = (ano: string | number | undefined): string => {
    if (!ano) return '----';

    const anoStr = ano.toString();
    const encontrado = CONTADORANUAL.find(item => item.label === anoStr);

    return encontrado ? encontrado.value : '----';
}

export default function AddScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as { carToEdit?: Carro };
    // Inicializa como um objeto vazio mas tipado como Carro (ou Partial<Carro>)
    const [carro, setCarro] = useState<Partial<Carro>>(params?.carToEdit || { year: new Date().getFullYear(), rarity: 'normal' });
    const [errors, setErrors] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const detailList = carro?.type === 'mainline' ? COLECOES :
        carro?.type === 'premium' ? PREMIUM : [];

    const selectBrand = FABRICANTES.find(item => item.value === carro?.marca);
    const selectCountry = PAISES.find(item => item.label === carro?.country || item.value === carro?.country);
    const selectMarcas = MARCAS.find(item => item.label === carro?.brand || item.value === carro?.brand);
    const selectSeries = SERIES.find(item => item.label === carro.serieName || item.value === carro.type);
    const selectDetails = detailList.find(item => item.value === carro?.serieName);

    const defaultMontadora = require('@/assets/manufacturers/none.png');
    const defaultBrand = require('@/assets/brands/none.png');
    const defaultFlag = require('@/assets/flags/none.png');
    const defaultMarcas = require('@/assets/brands/none.png');
    const defaultSeries = require('@/assets/series/none.png');
    const defaultCollection = require('@/assets/collections/none.png');
    const defaultType = require('@/assets/series/none.png');

    // Função para abrir Galeria
    const handleGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Sem acesso à galeria 📷' });
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], allowsEditing: true, quality: 0.7,
        });
        if (!result.canceled) setCarro({ ...carro, imageUri: result.assets[0].uri });
    };

    // Função para abrir Câmera
    const handleCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Sem acesso à câmera 📸' });
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, aspect: [1, 1], quality: 0.7,
        });
        if (!result.canceled) setCarro({ ...carro, imageUri: result.assets[0].uri });
    };

    // Função para salvar um novo carrinho
    const handleSave = async () => {
        const mandatoryFields = ['marca', 'modelo', 'brand'];
        const newErrors: string[] = [];

        mandatoryFields.forEach(field => {
            if (!carro[field as keyof Carro]) {
                newErrors.push(field);
            }
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
            Toast.show({
                type: 'error',
                text1: 'Campos faltando',
                text2: 'Preencha os campos marcados em vermelho 🚩',
                position: 'top'
            });
            return;
        }

        setErrors([]);
        setLoading(true);

        console.log('Dados preenchidos:', carro);
        try {
            const success = await storage.saveCar(carro);

            if (success) {
                Toast.show({
                    type: 'success',
                    text1: 'Salvo com sucesso!',
                    text2: 'Seu carrinho já está na garagem 🏎️💨',
                    position: 'bottom'
                });

                setTimeout(() => {
                    navigation.navigate('GARAGEM' as never);
                }, 1500);
            }
            else {
                throw new Error('Falha ao salvar');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao salvar',
                text2: 'Não conseguimos guardar os dados agora. ❌',
                position: 'bottom'
            });
        } finally {
            setLoading(false);
        }
    };

    // Função para deletar o carrinho
    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const pickImage = async () => {
        try {
            // 1. Pedir permissão para acessar a galeria
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: 'Permissão negada',
                    text2: 'Precisamos acessar suas fotos para carregar a imagem 📷',
                    position: 'bottom'
                });
                return;
            }

            // 2. Abrir a galeria do celular
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true, // Permite cortar a foto
                aspect: [1, 1],      // Força um quadrado (bom para catálogo)
                quality: 0.8,        // Comprime um pouco para não pesar no banco
            });

            // 3. Se o usuário não cancelou
            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setCarro({ ...carro, imageUri: uri });

                Toast.show({
                    type: 'success',
                    text1: 'Imagem carregada!',
                    text2: 'Ficou show! 🏎️✨',
                    position: 'bottom',
                    visibilityTime: 2000 // Some mais rápido (2 segundos)
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao carregar',
                text2: 'Não conseguimos abrir suas fotos no momento.',
                position: 'bottom'
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('GARAGEM' as never) }}>
                        <View style={styles.backButton}>
                            <Ionicons name="chevron-back" size={24} color="#E31C1C" />
                            <Text style={styles.backText}>Voltar</Text>
                        </View>
                    </TouchableOpacity>
                    {carro.id && (
                        <TouchableOpacity onPress={handleDelete} style={{ padding: 5 }}>
                            <Ionicons name="trash-outline" size={24} color="#FF0000" />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <TouchableOpacity style={styles.imagePicker} onPress={() => setIsModalVisible(true)} activeOpacity={0.7}>
                        {carro?.imageUri ? (
                            <Image
                                source={{ uri: carro.imageUri }}
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                            />
                        ) : (
                            <Ionicons name="camera" size={50} color="#444" />
                        )}
                    </TouchableOpacity>

                    {/* MONTADORA (80% para o Dropdown / 20% para a Imagem) */}
                    <View style={styles.row}>
                        {/* Coluna do Dropdown ocupando 80% (flex: 4) */}
                        <View style={{ flex: 3, marginRight: 10 }}>
                            <CustomDropdown
                                placeholder="Montadora"
                                data={FABRICANTES}
                                value={carro?.marca || null}
                                error={errors.includes('marca')}
                                onChange={(val) => {
                                    const brandData = FABRICANTES.find(item => item.value === val);

                                    setCarro({
                                        ...carro,
                                        marca: val,
                                        country: brandData?.countryLabel
                                    })
                                }}
                            />
                        </View>

                        {/* Coluna do Logo ocupando 20% (flex: 1) */}
                        <View style={[styles.brandLogoContainer, { marginRight: 10 }]}>
                            <Image source={selectBrand?.image || defaultMontadora} style={styles.brandLogo} />
                        </View>
                        {/* Coluna do Logo ocupando 20% (flex: 1) */}
                        <View style={styles.brandLogoContainer}>
                            <Image source={selectCountry?.image || defaultFlag} style={styles.brandLogo} />
                        </View>
                    </View>

                    <Input
                        label="Modelo (Ex: P1, FXX...)"
                        value={carro?.modelo}
                        onChangeText={(val) => setCarro({ ...carro, modelo: val })}
                        error={errors.includes('modelo')}
                    />

                    {/* MARCA DO BRINQUEDO (Hot Wheels, Matchbox) */}
                    <View style={styles.row}>
                        <View style={{ flex: 0.6, marginRight: 10 }}>
                            <CustomDropdown
                                placeholder="Fabricante (Ex: Hot Wheels)"
                                data={MARCAS}
                                value={carro?.brand || null}
                                onChange={(val) => setCarro({ ...carro, brand: val })}
                                error={errors.includes('brand')}
                            />
                        </View>
                        {/* Coluna do Logo ocupando 20% (flex: 1) */}
                        <View style={[styles.brandLogoContainer, { flex: 0.4 }]}>
                            <Image source={selectMarcas?.image || defaultBrand} style={styles.brandLogo} />
                        </View>
                    </View>

                    {/* SÉRIE DO BRINQUEDO (Boulevard, Car Culture, Mainline, etc) */}
                    {carro?.brand === 'hotwheels' && (
                        <>
                            {/* DROPDOWN 1: TIPO (Mainline ou Premium) */}
                            <View style={styles.row}>
                                <View style={{ flex: 0.6, marginRight: 10 }}>
                                    <CustomDropdown
                                        placeholder="Tipo"
                                        data={SERIES} // Esta lista deve conter Mainline e Premium
                                        value={carro?.type || null}
                                        onChange={(val: any) => setCarro({ ...carro, type: val, serieName: undefined })}
                                    />
                                </View>
                                <View style={[styles.brandLogoContainer, { flex: 0.4 }]}>
                                    {/* Mostra o logo da Mainline ou Premium */}
                                    <Image source={selectSeries?.image || defaultSeries} style={styles.brandLogo} />
                                </View>
                            </View>

                            {/* DETALHE (Só aparece se o Tipo foi escolhido) */}
                            {carro?.type && (
                                <View style={styles.row}>
                                    <View style={{ flex: 0.6, marginRight: 10 }}>
                                        <CustomDropdown
                                            placeholder={carro.type === 'premium' ? "Séries Premium" : "Coleção Mainline"}
                                            data={detailList}
                                            value={carro?.serieName || null}
                                            onChange={(val) => setCarro({ ...carro, serieName: val })}
                                        />
                                    </View>
                                    <View style={[styles.brandLogoContainer, { flex: 0.4 }]}>
                                        {/* Mostra o logo específico (ex: Boulevard ou Nightburnerz) */}
                                        <Image source={selectDetails?.image || defaultCollection} style={styles.brandLogo} />
                                    </View>
                                </View>
                            )}
                        </>
                    )}
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <View style={{ flex: 3, marginRight: 10 }}>
                            <CustomDropdown
                                placeholder='Cor'
                                data={SIMPLECOLOR}
                                value={carro?.color || null}
                                onChange={(val) => setCarro({ ...carro, color: val })}
                            />
                        </View>
                        <View style={[styles.brandLogoContainer, { marginTop: -15 }]}>
                            <View style={{
                                width: 30, // Um pouco menor que o container para ter respiro
                                height: 30,
                                borderRadius: 15, // Círculo fica mais bonito que quadrado para cor
                                backgroundColor: carro?.color || '#222',
                                borderWidth: 1,
                                borderColor: '#444'
                            }} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Input
                                label="Código SKU"
                                value={carro?.code}
                                onChangeText={(val) => setCarro({ ...carro, code: val.toUpperCase() })}
                                autoCapitalize='characters'
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <YearStepper
                                value={carro?.year}
                                onChange={(val) => setCarro({ ...carro, year: val })}
                            />
                        </View>
                    </View>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <View style={{ flex: 0.5 }}>
                            <Input
                                label="Nº"
                                value={carro?.numberSerie}
                                onChangeText={(val) => setCarro({ ...carro, numberSerie: val })}
                            />
                        </View>
                        <View style={styles.slashContainer}>
                            <Text style={styles.slash}>/</Text>
                        </View>
                        <View style={{ flex: 0.75, marginRight: 10 }}>
                            <Input
                                label="Total"
                                value={carro?.totalSerie}
                                onChangeText={(val) => setCarro({ ...carro, totalSerie: val })}
                            />
                        </View>
                        {/* </View>
                <View style={[styles.row, { alignItems: 'center' }]}> */}
                        <View style={{ flex: 0.8 }}>
                            <Input
                                label="Nº no ano"
                                value={carro?.numberYear}
                                onChangeText={(val) => setCarro({ ...carro, numberYear: val })}
                            />
                        </View>
                        <View style={styles.slashContainer}>
                            <Text style={styles.slash}>/</Text>
                        </View>
                        <View style={{ flex: 0.45, justifyContent: 'center' }}>
                            <Text style={styles.totalLabelBold}>
                                {carro?.year ? getTotalAno(carro.year) : '----'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            label="New Model"
                            value={!!carro?.isNewModel} // Transforma undefined em false
                            onChange={(v) => setCarro({ ...carro, isNewModel: v })}
                            activeColor='#13A10E'
                            icon='star'
                        />
                        <Checkbox
                            label="Customizado"
                            value={!!carro?.isCustom}
                            onChange={(v) => setCarro({ ...carro, isCustom: v })}
                            icon='color-palette'
                            activeColor='orange'
                            iconColor='black'
                        />
                        <RarityCheckbox
                            label={carro?.rarity === 'super' ?
                                'Super TH' : carro?.rarity === 'regular' ?
                                    'TH Regular' : "T-Hunt?"}
                            value={carro?.rarity || 'normal'}
                            onChange={(val) => setCarro({ ...carro, rarity: val })}
                        />
                        <Checkbox
                            label="Pneu de borracha"
                            value={!!carro?.hasRubberTires}
                            onChange={(v) => setCarro({ ...carro, hasRubberTires: v })}
                            icon='disc'
                            activeColor='#C0C0C0'
                            iconColor='black'
                        />
                        <Checkbox
                            label="Zamac"
                            value={!!carro?.isZamac}
                            onChange={(v) => setCarro({ ...carro, isZamac: v })}
                            icon='car-sport'
                            iconColor='black'
                            activeColor='#C0C0C0'
                        />
                        <Checkbox
                            label="ID"
                            value={!!carro?.isID}
                            onChange={(v) => setCarro({ ...carro, isID: v })}
                            icon='hardware-chip'
                            iconColor='black'
                            activeColor='white'
                        />
                        <Checkbox
                            label="Mistery Machine"
                            value={!!carro?.isMM}
                            onChange={(v) => setCarro({ ...carro, isMM: v })}
                            icon='logo-medium'
                            iconColor='#AC10C0'
                            activeColor='white'
                        />
                        <Checkbox
                            label="Redline"
                            value={!!carro?.isRedLine}
                            onChange={(v) => setCarro({ ...carro, isRedLine: v })}
                            icon='timer'
                            iconColor='red'
                            activeColor='#333'
                        />
                        <Checkbox
                            label="Speed Machine"
                            value={!!carro?.isSpeed}
                            onChange={(v) => setCarro({ ...carro, isSpeed: v })}
                            icon='speedometer'
                            iconColor='#003366'
                            activeColor='#C0C0C0'
                        />
                        <Checkbox
                            label="À venda"
                            value={!!carro?.isForSale}
                            onChange={(v) => setCarro({ ...carro, isForSale: v })}
                            icon='logo-usd'
                            activeColor='#13A10E'
                        />

                        <TouchableOpacity
                            style={styles.saveButtonFull}
                            onPress={handleSave}
                            disabled={loading}
                            activeOpacity={0.7}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <>
                                    <Ionicons name='save' size={22} />
                                    <Text style={styles.saveButtonText}>SALVAR NA GARAGEM</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 50 }} />
                </ScrollView>
                {/* O Modal de Escolha no final do JSX */}
                <ActionModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    options={[
                        { label: 'Tirar Foto', icon: 'camera', onPress: handleCamera },
                        { label: 'Escolher da Galeria', icon: 'images', onPress: handleGallery },
                    ]}
                />
                <ConfirmModal
                    visible={isDeleteModalVisible}
                    title="Remover Carrinho"
                    message="Tem certeza que deseja excluir este item da sua coleção? 😢"
                    onClose={() => setIsDeleteModalVisible(false)}
                    onConfirm={async () => {
                        setIsDeleteModalVisible(false);
                        if (carro.id) {
                            const success = await storage.deleteCar(carro.id);
                            if (success) {
                                Toast.show({ type: 'success', text1: 'Removido da garagem!' });
                                navigation.navigate('GARAGEM' as never);
                            }
                        }
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
    backButton: { flexDirection: 'row', alignItems: 'center' },
    backText: { color: '#E31C1C', fontSize: 16 },
    scrollContent: { paddingHorizontal: 20 },
    imagePicker: { width: '100%', height: 250, backgroundColor: '#1A1A1A', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' },
    checkboxContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 15 },
    brandLogoContainer: {
        flex: 1,
        height: 50,
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    brandLogo: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    slashContainer: {
        height: 45, // Mesma altura dos Inputs
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    slash: {
        color: '#FFF',
        fontSize: 22,
        lineHeight: 22, // Força a linha a ter a mesma altura da fonte
        includeFontPadding: false, // Remove padding extra do Android
    },
    stepperContainer: {
        backgroundColor: '#222',
        borderRadius: 8,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    stepperLabel: {
        color: '#666',
        fontSize: 12,
    },
    stepperControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    stepperValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 45,
        textAlign: 'center',
    },
    totalLabelBold: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    saveButtonFull: {
        backgroundColor: '#E31C1C',
        flexDirection: 'row',
        height: 55,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});