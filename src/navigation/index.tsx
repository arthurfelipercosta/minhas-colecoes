import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Garagem from '@/screens/Garagem';
import Perfil from '@/screens/Perfil';
import Add from '@/screens/Add';

const Tab = createBottomTabNavigator();

export function AppRoutes() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#FF0000',
                tabBarInactiveTintColor: '#8E8E8F',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                    // Altura dinâmica para não cortar em nenhum celular
                    height: Platform.OS === 'ios' ? 70 + insets.bottom : 70,
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: 'bold',
                    marginTop: 4,
                }
            }}
        >
            <Tab.Screen
                name="GARAGEM"
                component={Garagem}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Add"
                component={Add}
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                        <View style={styles.circleButton}>
                            <Ionicons 
                                name="add" 
                                size={45} 
                                color="white" 
                                style={styles.iconCenter} // Garantia extra de centralização
                            />
                        </View>
                    ),
                    tabBarButton: (props: any) => {
                        // Destruturamos para remover as propriedades que dão erro de tipagem
                        const { delayLongPress, ...rest } = props;
                        return (
                            <TouchableOpacity
                                {...rest}
                                activeOpacity={0.8}
                                style={[props.style, styles.customButtonContainer]}
                            />
                        );
                    }
                }}
            />

            <Tab.Screen
                name="PERFIL"
                component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    customButtonContainer: {
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E31C1C',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#000',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    iconCenter: {
        // Isso garante que o ícone ignore qualquer padding herdado e fique no centro
        textAlign: 'center',
        includeFontPadding: false,
    }
});