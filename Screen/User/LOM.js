import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, StatusBar, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Markdown from 'react-native-markdown-display';
import { Ionicons } from '@expo/vector-icons';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export default function LOMChecker({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [isTyping, setIsTyping] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [expandedMap, setExpandedMap] = useState({}); // id -> boolean

  const scrollRef = useRef(null);

  useEffect(() => {
    setTimeout(() => { if (scrollRef.current) scrollToEnd(); }, 50);
  }, [messages]);

  useEffect(() => {
    if (!isTyping) return;
    const t = setTimeout(() => { if (scrollRef.current) scrollToEnd(); }, 50);
    return () => clearTimeout(t);
  }, [isTyping]);

  useEffect(() => {
    if (!isTyping) return;
    const timer = setInterval(() => setDotCount((d) => (d + 1 > 3 ? 0 : d + 1)), 450);
    return () => clearInterval(timer);
  }, [isTyping]);

  function scrollToEnd() {
    scrollRef.current.scrollToEnd({ animated: true });
  }

  async function copyToClipboard(text) {
    try {
      await Clipboard.setStringAsync(text);
      if (Platform.OS === 'android') ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
      else Alert.alert('Copied to clipboard');
    } catch (e) {
      Alert.alert('Copy failed', e?.message || 'Please try again.');
    }
  }

  // --- Gemini call (unchanged behavior) ---
  async function sendToGemini(userText) {
    try {
      if (!GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY.');
      setIsTyping(true);

      const history = [];
      for (let i = 0; i < messages.length; i++) {
        const m = messages[i];
        const role = m.role === 'assistant' ? 'model' : 'user';
        history.push({ role, parts: [{ text: m.content }] });
      }

      const systemInstruction = {
        role: 'user',
        parts: [
          { text: 'You are a helpful assistant that drafts and improves Letters of Motivation (LOM) and Statements of Purpose (SOP). Ask for missing details and keep responses clear.' },
        ],
      };

      const body = { contents: [systemInstruction, ...history, { role: 'user', parts: [{ text: userText }] }] };

      const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(GEMINI_API_KEY);

      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Gemini error');
      }

      const data = await res.json();
      let reply = '(no reply)';
      const parts = data?.candidates?.[0]?.content?.parts;
      if (Array.isArray(parts)) {
        let acc = '';
        for (let j = 0; j < parts.length; j++) {
          const pj = parts[j];
          if (pj && typeof pj.text === 'string') acc += pj.text;
        }
        if (acc) reply = acc;
      }

      setMessages((prev) => prev.concat({ id: Date.now() + 1, role: 'assistant', content: reply }));
    } catch (e) {
      Alert.alert('Error', e?.message || 'Failed to get a response.');
    } finally {
      setIsTyping(false);
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => prev.concat({ id: Date.now(), role: 'user', content: text }));
    setInput('');
    setInputHeight(40);
    await sendToGemini(text);
  }

  function typingDots(n) {
    if (n === 0) return '';
    if (n === 1) return '.';
    if (n === 2) return '..';
    return '...';
  }

  function isOverLimit(t) {
    return (t || '').length > 300;
  }

  function toggleExpand(id) {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LOM Checker</Text>
        <View style={styles.iconBtn} />
      </View>

      {/* Messages + Composer */}
      <KeyboardAvoidingView style={styles.flex} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 45}>
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            const full = m.content || '';
            const over = isOverLimit(full);
            const expanded = expandedMap[m.id] === true;
            const preview = full.slice(0, 300);

            return (
              <TouchableOpacity
                key={m.id}
                activeOpacity={0.8}
                delayLongPress={300}
                onLongPress={() => copyToClipboard(full)}
              >
                <View style={[styles.bubble, isUser ? styles.bubbleRight : styles.bubbleLeft]}>
                  {isUser ? (
                    <Text style={styles.bubbleText}>
                      {expanded || !over ? full : preview}
                      {!expanded && over ? (
                        <Text style={styles.readMoreInline} onPress={() => toggleExpand(m.id)}>
                          {' '}… Read more
                        </Text>
                      ) : null}
                      {expanded && over ? (
                        <Text style={styles.readMoreInline} onPress={() => toggleExpand(m.id)}>
                          {' '} Show less
                        </Text>
                      ) : null}
                    </Text>
                  ) : expanded || !over ? (
                    <Markdown
                      style={{ body: styles.bubbleText }}
                      onLinkPress={(url) => {
                        if (url && url.startsWith('readless://')) {
                          toggleExpand(m.id);
                          return false;
                        }
                        return true;
                      }}
                    >
                      {full + (over ? ' [Show less](readless://' + m.id + ')' : '')}
                    </Markdown>
                  ) : (
                    <Markdown
                      style={{ body: styles.bubbleText }}
                      onLinkPress={(url) => {
                        if (url && url.startsWith('readmore://')) {
                          toggleExpand(m.id);
                          return false;
                        }
                        return true;
                      }}
                    >
                      {preview + ' … [Read more](readmore://' + m.id + ')'}
                    </Markdown>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {isTyping ? (
            <View style={[styles.bubble, styles.bubbleLeft]}>
              <Text style={styles.bubbleText}>AI is typing{typingDots(dotCount)}</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* Composer */}
        <View style={styles.composerRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message"
            placeholderTextColor="#9AA7B2"
            multiline
            onContentSizeChange={(e) => {
              const h = e?.nativeEvent?.contentSize?.height || 40;
              let newH = h;
              if (newH < 40) newH = 40;
              if (newH > 140) newH = 140;
              setInputHeight(newH);
            }}
            style={[styles.input, { height: inputHeight }]}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1C2E5C' },
  flex: { flex: 1 ,marginBottom: 10},

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  iconBtn: { width: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#E7EDF3', fontSize: 18, fontWeight: '700',marginLeft: 'auto',marginRight: 'auto' },
  messages: { flex: 1 },

  bubble: {
    maxWidth: '88%',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6
  },
  bubbleLeft: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF' },
  bubbleRight: { alignSelf: 'flex-end', backgroundColor: '#E7EDF3' },
  bubbleText: { color: '#09121A', fontSize: 15, lineHeight: 21 },
  readMoreInline: { color: '#A7C2FF', textDecorationLine: 'underline' },

  composerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',    
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1C2E5C'
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    height: 40,                
    paddingHorizontal: 16,      
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'       
  },
  sendText: { color: '#fff', fontWeight: '700' }
});
