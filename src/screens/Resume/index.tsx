import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Header,
  Title,
  Content,
} from './styles';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

export interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

type CategoryData = {
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative'
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).replace('R$', 'R$ ');
        totalByCategory.push({
          name: category.name,
          total: total,
          color: category.color,
        });
      }
    });
    setTotalByCategories(totalByCategory);

  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>

      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
      {console.log(totalByCategories)}
      {
          totalByCategories.map(item => (
            <HistoryCard
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>

    </Container>
  );
}