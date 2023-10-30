import React from 'react';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { useState } from 'react';
import { Heading, VStack, SectionList, Text } from 'native-base';
import ChatBot from './ChatBot';

export function History() {

  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Padaria 9 de setembro", "Remada unilateral"]
    },
    {
      title: '27.08.22',
      data: ["Puxada frontal"]
    }
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title='ChatBot' />

      <ChatBot />
    </VStack>
  );
}