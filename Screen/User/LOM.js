import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export default function LOMChecker({ navigation }) {
  const [messages, setMessages] = useState([]); // {id, role: 'user'|'assistant', content}
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [isTyping, setIsTyping] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const scrollRef = useRef(null);

  // auto-scroll on new messages
  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }, [messages]);

  // keep scrolled to bottom while typing
  useEffect(() => {
    if (isTyping) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }, [isTyping]);

  // dots animation
  useEffect(() => {
    if (!isTyping) return;
    const t = setInterval(() => setDotCount((d) => (d + 1) % 4), 450);
    return () => clearInterval(t);
  }, [isTyping]);

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      if (Platform.OS === 'android') ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
      else Alert.alert('Copied to clipboard');
    } catch (e) {
      Alert.alert('Copy failed', e?.message || 'Please try again.');
    }
  };

  // --- Gemini call ---
  const sendToGemini = async (userText) => {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error('Missing GEMINI_API_KEY. Add it to app.json under expo.extra and restart the app.');
      }
      setIsTyping(true);

      const history = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const systemInstruction = {
        role: 'user',
        parts: [
          {
            text:
              'You are a helpful assistant that drafts and improves Letters of Motivation (LOM) and Statements of Purpose (SOP). Ask for missing details and keep responses clear.',
          },
        ],
      };

      const body = {
        contents: [
          systemInstruction,
          ...history,
          { role: 'user', parts: [{ text: userText }] },
        ],
      };

      const endpoint =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
        encodeURIComponent(GEMINI_API_KEY);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Gemini error');
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts
          ?.map((p) => (typeof p.text === 'string' ? p.text : ''))
          .join('') || '(no reply)';

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', content: reply }]);
    } catch (e) {
      Alert.alert('Error', e.message || 'Failed to get a response.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: text }]);
    setInput('');
    setInputHeight(40);
    await sendToGemini(text);
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LOM Checker</Text>
        <View style={styles.iconBtn} />
      </View>

      {/* KAV wraps messages + composer */}
      {/* <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      > */}
        {/* Messages ScrollView */}
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m) => (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.8}
              delayLongPress={300}
              onLongPress={() => copyToClipboard(m.content)}
            >
              <View
                style={[
                  styles.bubble,
                  m.role === 'user' ? styles.bubbleRight : styles.bubbleLeft,
                ]}
              >
                {m.role === 'user' ? (
                  <Text style={styles.bubbleText}>{m.content}</Text>
                ) : (
                  <Markdown style={{ body: styles.bubbleText }}>{m.content}</Markdown>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {isTyping && (
            <View style={[styles.bubble, styles.bubbleLeft]}>
              <Text style={styles.bubbleText}>AI is typing{'.'.repeat(dotCount)}</Text>
            </View>
          )}
        </ScrollView>

        {/* Composer (sticks to bottom, pushed by KAV) */}
        <View style={styles.composerRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message"
            placeholderTextColor="#9AA7B2"
            multiline
            onContentSizeChange={(e) => {
              const h = e.nativeEvent.contentSize.height;
              setInputHeight(Math.min(Math.max(40, h), 140));
            }}
            style={[styles.input, { height: inputHeight }]}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1C2E5C' },
  flex: { flex: 1 },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconBtn: { width: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#E7EDF3', fontSize: 18, fontWeight: '700' },

  messages: { flex: 1 },

  bubble: {
    maxWidth: '78%',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  bubbleLeft: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF' },
  bubbleRight: { alignSelf: 'flex-end', backgroundColor: '#E7EDF3' },
  bubbleText: { color: '#09121A', fontSize: 15, lineHeight: 21 },

  composerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1a2d3f',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700' },
});
