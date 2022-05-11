import React from 'react';
import { Container, Title } from './styles';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';

export function Dashboard() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <Container>
            <Title>Dashboard</Title>
        </Container>
    );
}