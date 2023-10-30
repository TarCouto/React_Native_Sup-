import React, { useState } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import { Button, Text } from 'native-base';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
      const botResponse: Message = { id: Date.now().toString(), text: 'Olá! Como posso ajudar?', sender: 'bot' };

      setMessages(prevMessages => [...prevMessages, newMessage, botResponse]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {messages.map(message => (
          <View key={message.id} style={message.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <RNTextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
        />
        <Button style={styles.sendButton} onPress={handleSend}>
          <Text>Enviar</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'lightgreen',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default ChatBot;
