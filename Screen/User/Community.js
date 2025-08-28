import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useUser } from '@clerk/clerk-expo';
import { useRole } from '../../auth.context';

export default function Community({ navigation }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const {user} = useUser()
  const { role } = useRole();

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "chat"), orderBy("time", "asc"));
    onSnapshot(q, (snapshot) => {


      if (!snapshot) return
      const chats = []

      snapshot.docs.forEach((doc) => {
        chats.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setMessages(chats)
      setLoading(false)

      console.log(chats)

    })
  }, [])

  // Image picker
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Send message (handles normal + reply)
  const sendMessage = () => {
    if (!message.trim() && !image) {
      Alert.alert('Please enter a message');
      return;
    }

    const next = {
      id: messages?.length,
      message: message,
      image,
      // mark as reply if replyTo is set
      isReply: !!replyTo,
      replyToId: replyTo?.id ?? null,
      replyToText: replyTo?.text ?? null,
      isSender: true,  // Marks whether the message is from the user (right side)
    };



    try {
      const res = addDoc(collection(db, "chat"), {
        name: 'User',
        email: user.emailAddresses[0].emailAddress,
        message: message,
        time: new Date()
      })
      console.log('Inserted document with ID: ', res.id);
    } catch (error) {
      console.log('Error adding document: ', error);
    }

    setMessages([...messages, next]);
    setMessage('');
    setImage(null);
    setReplyTo(null); // clear reply state after sending
  };

  // Toggle options menu
  const toggleOptions = (messageId, event) => {
    setShowOptions(showOptions === messageId ? null : messageId);  // Toggle visibility of options menu
  };

  // Handle options actions (Copy, Save, Edit, Delete)
  const handleOptionAction = (action) => {
    Alert.alert(`${action} clicked!`);
    setShowOptions(null); // Close the dropdown after clicking an option
  };

  // Start reply to a specific message
  const startReply = (msg) => {
    setReplyTo({ id: msg.id, text: msg.text });
    setShowOptions(null); // Close options after clicking reply
  };

  // Filter messages based on the search query
  const filteredMessages = messages.filter((msg) => msg.text?.toLowerCase().includes(searchQuery.toLowerCase()));


  if (loading) return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'#2C3E50' }}><ActivityIndicator size="large" color="#0000ff" /></View>)

  return (

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => role === 'admin' ? navigation.navigate('HomeScreen')  : navigation.navigate('Home')} style={styles.iconBtn}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
        {/* Search Icon */}
        <TouchableOpacity onPress={() => setSearchActive(!searchActive)} style={styles.iconBtn}>
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input Field */}
      {searchActive && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#B0B0B0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            />
        </View>
      )}

      {/* Chat Messages */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageContainer}>
            <View
              style={[styles.messageBubble, msg?.email === user.emailAddresses[0].emailAddress ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]} // Right for sender, left for others
              >
              {/* If this is a reply, show a tiny quoted preview */}
              {msg.isReply && !!msg.replyToText && (
                <Text style={{ fontSize: 12, color: '#5A6B7A', marginBottom: 4 }}>
                  Replying to: “{msg.replyToText?.length > 60 ? msg.replyToText.slice(0, 60) + '…' : msg.replyToText}”
                </Text>
              )}

              {msg.image && <Image source={{ uri: msg.image }} style={styles.messageImage} />}
              {!!msg.message && <Text style={styles.messageText}>{msg.message}</Text>}
            </View>

            {/* Right-side actions: only the 3 dots */}
            <View style={styles.messageActions}>
              <TouchableOpacity onPress={(event) => toggleOptions(msg.id, event)} style={styles.moreButton}>
                <Text style={styles.moreText}>⋮</Text>
              </TouchableOpacity>
            </View>

            {/* Options menu (with Reply added) */}
            {showOptions === msg.id && (
              <View style={styles.optionsMenu}>
                <TouchableOpacity onPress={() => startReply(msg)} style={styles.optionItem}>
                  <Text style={styles.optionText}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionAction('Copy')} style={styles.optionItem}>
                  <Text style={styles.optionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionAction('Edit')} style={styles.optionItem}>
                  <Text style={styles.optionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionAction('Delete')} style={styles.optionItem}>
                  <Text style={styles.optionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Reply banner (shows when replying) */}
      {replyTo && (
        <View style={styles.replyBanner}>
          <Text style={styles.replyBannerText}>
            Replying to: {replyTo.text?.length > 60 ? replyTo.text.slice(0, 60) + '…' : replyTo.text}
          </Text>
          <TouchableOpacity onPress={() => setReplyTo(null)}>
            <Text style={styles.replyBannerClose}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Composer */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Text style={styles.iconText}>📸</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#B0B0B0"
          value={message}
          onChangeText={setMessage}
          />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 20,
  },
  headerBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#E7EDF3',
    fontSize: 22,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerTitle: {
    color: '#E7EDF3',
    fontSize: 18,
    fontWeight: '700',
  },
  searchContainer: {
    padding: 8,
    backgroundColor: '#2C3E50',
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingLeft: 12,
    height: 40,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginVertical: 8,
  },
  messageBubble: {
    backgroundColor: '#E7EDF3',
    padding: 10,
    borderRadius: 12,
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginBottom: 6,
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 6,
  },
  moreButton: {
    padding: 4,
  },
  moreText: {
    fontSize: 18,
    color: '#B0B0B0',
  },
  optionsMenu: {
    right: 0,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    top: 85,
  },
  optionItem: {
    paddingVertical: 8,
  },
  optionText: {
    color: '#007AFF',
    fontSize: 14,
  },
  replyBanner: {
    backgroundColor: '#E7EDF3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  replyBannerText: {
    color: '#1F2933',
    fontSize: 12,
    flex: 1,
    paddingRight: 8,
  },
  replyBannerClose: {
    color: '#1F2933',
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    padding: 10,
    bottom: 10,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingLeft: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
