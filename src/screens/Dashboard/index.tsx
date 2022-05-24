import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Icon,
    Photo,
    User,
    UserGreeting,
    UserName,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LoadContainer
} from './styles';

interface HighLightProps {
    amount: string;
}

interface HighlightData {
    entries: HighLightProps,
    expensive: HighLightProps,
    total: HighLightProps,
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).replace('R$', 'R$ ');

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date,
                }
            });
        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).replace('R$', 'R$ ')
            },
            expensive: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).replace('R$', 'R$ ')
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).replace('R$', 'R$ ')
            }
        });

        setIsLoading(false);

    };

    useEffect(() => {
        // async function removeAll() {
        //     await AsyncStorage.removeItem('@gofinances:transactions');
        // }
        // removeAll();
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ?
                <LoadContainer>
                    <ActivityIndicator color={theme.colors.primary} size='large'/>
                </LoadContainer> :
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/87244758?v=4' }} />
                                <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Italo</UserName>
                                </User>
                            </UserInfo>
                            <Icon name='power' />
                        </UserWrapper>
                    </Header>
                    <HighlightCards>
                        <HighlightCard
                            type='up'
                            title='Entradas'
                            amount={highlightData?.entries?.amount}
                            lastTransaction='Última entrada dia 13 de abril'
                        />
                        <HighlightCard
                            type='down'
                            title='Saídas'
                            amount={highlightData?.expensive?.amount}
                            lastTransaction='Última saída dia 13 de abril'
                        />
                        <HighlightCard
                            type='total'
                            title='Total'
                            amount={highlightData?.total?.amount}
                            lastTransaction='01 à 16 de abril'
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>
                        <TransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />

                    </Transactions>
                </>
            }
        </Container>
    );
}