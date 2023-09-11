import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export default function ChatBot() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá! Como posso ajudar?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    // Aqui você pode fazer a lógica para responder às mensagens do usuário.
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // Este é o ID do usuário (pode ser o ID do usuário logado)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
