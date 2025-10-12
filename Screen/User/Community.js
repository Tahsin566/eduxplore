import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Image, Alert, ActivityIndicator, Modal, Pressable, KeyboardAvoidingView, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useUser } from '@clerk/clerk-expo';
import { useRole } from '../../auth.context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Community({ navigation }) {

  // auth / role
  const { user } = useUser();
  const { role, profile } = useRole();

  // basic states
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  // reply + action modal
  const [replyTo, setReplyTo] = useState(null);     // { id, text, image, email }
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);

  // UI-only local hide for “delete” without touching DB
  const [hiddenIds, setHiddenIds] = useState(new Set());

  // safe area
  const insets = useSafeAreaInsets();

  // full-screen image viewer
  const [viewerUri, setViewerUri] = useState(null);

  // scroll
  const scrollRef = useRef(null);

  // simple composer height calc (kept same behavior)
  const [composerHeight, setComposerHeight] = useState(58);

  // --- keep jump-to-original but make it beginner-style (use plain objects instead of Map)
  const positionsRef = useRef({}); // { [id]: y }
  const [highlightedId, setHighlightedId] = useState(null);

  // subscribe to chat
  useEffect(() => {
    const q = query(collection(db, 'chat'), orderBy('time', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot) return;
      const chats = [];
      snapshot.docs.forEach((d) => {
        const data = d.data();
        chats.push({ ...data, id: d.id });
      });
      setMessages(chats);
      setLoading(false);

      // auto-scroll to bottom on new content
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollToEnd({ animated: true });
        }
      }, 50);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const myEmail = user?.emailAddresses?.[0]?.emailAddress;

  function displayNameOf(msg) {
    if (msg && msg.name && String(msg.name).trim()) {
      return String(msg.name).trim();
    }
    if (msg && msg.email) {
      const parts = msg.email.split('@');
      return parts[0] || 'User';
    }
    return 'User';
  }

  function formatTime(t) {
    try {
      if (!t) return '';
      let d;
      if (t.seconds) {
        d = new Date(t.seconds * 1000);
      } else {
        d = new Date(t);
      }
      if (isNaN(d.getTime())) return '';
      let hr = d.getHours();
      const min = String(d.getMinutes()).padStart(2, '0');
      const ampm = hr >= 12 ? 'PM' : 'AM';
      hr = hr % 12 || 12;
      return hr + ':' + min + ' ' + ampm;
    } catch (e) {
      return '';
    }
  }

  function parseReplyParts(text) {
    if (!text) return { quote: null, body: '' };
    const prefix = '↪ Replying to: ';
    if (text.indexOf(prefix) === 0) {
      const nl = text.indexOf('\n');
      const head = nl !== -1 ? text.slice(0, nl) : text;
      const body = nl !== -1 ? text.slice(nl + 1) : '';
      const quote = head.slice(prefix.length);
      return { quote, body };
    }
    return { quote: null, body: text };
  }

  function canDelete(msg) {
    return role === 'admin' || (msg && msg.email === myEmail);
  }

  // pick image (basic)
  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission to access media library is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const f = {
        uri: result.assets[0].uri,
        type: result.assets[0].mimeType,
        name: result.assets[0].fileName
      };
      setImage(result.assets[0].uri);
      setFile(f);
    }
  };

  // upload (kept same)
  const uploadToCloudinary = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'images-expo-app');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkmdyo7bm/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data && data.secure_url ? data.secure_url : '';
    } catch (err) {
      console.log('Error uploading image:', err.message);
      return profile?.photo;
    }
  };

  // send (kept same)
  const sendMessage = async () => {
    if ((!message || !message.trim()) && !image) {
      Alert.alert('Please enter a message or pick an image');
      return;
    }

    let quoted = '';
    if (replyTo && replyTo.text) {
      const t = replyTo.text.length > 80 ? replyTo.text.slice(0, 80) + '…' : replyTo.text;
      quoted = '↪ Replying to: ' + t + '\n';
    } else if (replyTo && replyTo.image) {
      quoted = '↪ Replying to: Photo\n';
    }

    try {
      addDoc(collection(db, 'chat'), {
        name: profile?.name,
        email: myEmail,
        message: quoted + (message || ''),
        photo: profile?.photo || user.imageUrl,
        image: (await uploadToCloudinary()) || '',
        time: new Date(),
        replyToId: replyTo ? (replyTo.id || null) : null,
      });
    } catch (e) {
      console.log('Error adding document: ', e);
    }

    setMessage('');
    setImage(null);
    setReplyTo(null);
    setFile(null);

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  // actions
  const onLongPressMessage = (msg) => {
    setSelectedMsg(msg);
    setActionOpen(true);
  };

  const handleReply = () => {
    if (!selectedMsg) return;
    setReplyTo({
      id: selectedMsg.id,
      text: selectedMsg.message || '',
      image: selectedMsg.image || null,
      email: selectedMsg.email || ''
    });
    setActionOpen(false);
  };

  const handleCopy = async () => {
    if (!selectedMsg || !selectedMsg.message) {
      Alert.alert('Nothing to copy');
      return;
    }
    await Clipboard.setStringAsync(selectedMsg.message);
    setActionOpen(false);
    Alert.alert('Copied to clipboard');
  };

  const handleDeleteLocal = () => {
    if (!selectedMsg) return;
    if (!canDelete(selectedMsg)) {
      setActionOpen(false);
      Alert.alert("You can't delete this message.");
      return;
    }
    try {
      deleteDoc(doc(db, 'chat', selectedMsg.id));
      setActionOpen(false);
    } catch (err) {
      console.log('Error adding document: ', err);
    }
  };

  // avatar (kept same)
  function resolveAvatar(msg, isMine) {
    if (isMine) {
      return profile?.photo || user?.imageUrl || null;
    }
    return msg && msg.photo ? msg.photo : null;
  }

  // simple highlight timer
  function flashHighlight(id) {
    setHighlightedId(id);
    setTimeout(() => {
      setHighlightedId(null);
    }, 1200);
  }

  // jump to original (beginner style: plain object lookups)
  function scrollToOriginal(replyToId, quoteText) {
    if (!scrollRef.current) return;

    if (replyToId && positionsRef.current && positionsRef.current[replyToId] !== undefined) {
      const y = positionsRef.current[replyToId];
      const targetY = y > 12 ? y - 12 : 0;
      scrollRef.current.scrollTo({ y: targetY, animated: true });
      flashHighlight(replyToId);
      return;
    }

    if (quoteText) {
      const target = messages.find((m) => {
        const mm = (m && m.message) ? m.message : '';
        return mm.indexOf(quoteText) !== -1;
      });
      if (target && positionsRef.current[target.id] !== undefined) {
        const y = positionsRef.current[target.id];
        const targetY = y > 12 ? y - 12 : 0;
        scrollRef.current.scrollTo({ y: targetY, animated: true });
        flashHighlight(target.id);
      }
    }
  }

  // filter (kept same behavior)
  const shownMessages = messages
    .filter((m) => !hiddenIds.has(m.id))
    .filter((m) => ((m && m.message) ? m.message : '').toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1C2E5C' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const bottomInsetPad = insets.bottom > 0 ? 4 : 0;

  return (
    <KeyboardAvoidingView
      style={styles.kav}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 45}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => (role === 'admin' ? navigation.navigate('HomeScreen') : navigation.navigate('Home'))}
            style={styles.iconBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Community</Text>
          <TouchableOpacity onPress={() => setSearchActive(!searchActive)} style={styles.iconBtn}>
            <Ionicons name={searchActive ? 'close' : 'search'} size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        {searchActive ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages..."
              placeholderTextColor="#B0B0B0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        ) : null}

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          onContentSizeChange={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollToEnd({ animated: true });
            }
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {shownMessages.map((msg) => {
            const isMine = msg && msg.email === myEmail;
            const isAdminSender = (msg && msg.role === 'admin') || (isMine && role === 'admin');
            const name = displayNameOf(msg);
            const parsed = parseReplyParts((msg && msg.message) ? msg.message : '');
            const quote = parsed.quote;
            const body = parsed.body;
            const timeStr = formatTime(msg.time);
            const replyToId = msg && msg.replyToId ? msg.replyToId : null;

            const leftUri = !isMine ? resolveAvatar(msg, false) : null;
            const rightUri = isMine ? resolveAvatar(msg, true) : null;

            return (
              <View
                key={msg.id}
                onLayout={(e) => {
                  const y = e.nativeEvent.layout.y;
                  const dict = positionsRef.current || {};
                  dict[msg.id] = y;
                  positionsRef.current = dict;
                }}
                style={[styles.row, isMine ? styles.rowRight : styles.rowLeft]}
              >
                {!isMine ? (
                  leftUri ? (
                    <Image source={{ uri: leftUri }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Text style={styles.avatarLetter}>
                        {(name && name[0] ? name[0] : 'U').toUpperCase()}
                      </Text>
                    </View>
                  )
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onLongPress={() => onLongPressMessage(msg)}
                  delayLongPress={250}
                  style={[
                    styles.messageBubble,
                    isMine ? styles.rightBubble : styles.leftBubble,
                    highlightedId === msg.id ? styles.highlightBubble : null
                  ]}
                >
                  {/* Name */}
                  <Text style={[styles.username, isAdminSender ? styles.adminName : null]} numberOfLines={1}>
                    {name}
                  </Text>

                  {/* Quote preview */}
                  {quote ? (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => scrollToOriginal(replyToId, quote)}
                      style={styles.quoteBox}
                    >
                      <Text style={styles.quoteText} numberOfLines={2}>{quote}</Text>
                    </TouchableOpacity>
                  ) : null}

                  {/* Image */}
                  {msg && msg.image ? (
                    <TouchableOpacity onPress={() => setViewerUri(msg.image)} activeOpacity={0.9}>
                      <Image source={{ uri: msg.image }} style={styles.messageImage} />
                    </TouchableOpacity>
                  ) : null}

                  {/* Body */}
                  {body ? <Text style={styles.messageText}>{body}</Text> : null}

                  {/* Time */}
                  <Text style={styles.timeText}>{timeStr}</Text>
                </TouchableOpacity>

                {isMine ? (
                  rightUri ? (
                    <Image source={{ uri: rightUri }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Text style={styles.avatarLetter}>
                        {(name && name[0] ? name[0] : 'U').toUpperCase()}
                      </Text>
                    </View>
                  )
                ) : null}
              </View>
            );
          })}
        </ScrollView>

        {/* Reply banner */}
        {replyTo ? (
          <View style={styles.replyBanner}>
            {replyTo.image ? (
              <TouchableOpacity onPress={() => setViewerUri(replyTo.image)} activeOpacity={0.9}>
                <Image source={{ uri: replyTo.image }} style={styles.replyThumb} />
              </TouchableOpacity>
            ) : null}
            <Text style={styles.replyBannerText}>
              Replying to: {replyTo.text ? (replyTo.text.length > 60 ? replyTo.text.slice(0, 60) + '…' : replyTo.text) : (replyTo.image ? 'Photo' : '')}
            </Text>
            <TouchableOpacity onPress={() => setReplyTo(null)}>
              <Text style={styles.replyBannerClose}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Composer */}
        <View
          style={[styles.inputContainer, { paddingBottom: 8 + (insets.bottom > 0 ? 4 : 0) }]}
          onLayout={(e) => setComposerHeight(e.nativeEvent.layout.height)}
        >
          <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
            <Ionicons name='camera-outline' size={35} color='#f7f7f7' />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#B0B0B0"
            value={message}
            onChangeText={setMessage}
            onFocus={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollToEnd({ animated: true });
              }
            }}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Action Modal */}
        <Modal transparent visible={actionOpen} animationType="fade" onRequestClose={() => setActionOpen(false)}>
          <Pressable style={styles.modalBackdrop} onPress={() => setActionOpen(false)}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Message options</Text>

              <TouchableOpacity style={styles.modalItem} onPress={handleReply}>
                <Text style={styles.modalItemText}>Reply</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalItem} onPress={handleCopy}>
                <Text style={styles.modalItemText}>Copy</Text>
              </TouchableOpacity>

              {selectedMsg && canDelete(selectedMsg) ? (
                <TouchableOpacity style={styles.modalItem} onPress={handleDeleteLocal}>
                  <Text style={[styles.modalItemText, { color: '#E11D48' }]}>Delete</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity style={[styles.modalItem, styles.modalCancel]} onPress={() => setActionOpen(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Full-screen Image Viewer */}
        <Modal
          transparent
          visible={!!viewerUri}
          animationType="fade"
          onRequestClose={() => setViewerUri(null)}
        >
          <Pressable style={styles.viewerBackdrop} onPress={() => setViewerUri(null)}>
            {viewerUri ? (
              <Image source={{ uri: viewerUri }} style={styles.viewerImage} resizeMode="contain" />
            ) : null}
          </Pressable>
        </Modal>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, backgroundColor: '#1C2E5C' },
  container: { flex: 1, backgroundColor: '#1C2E5C' },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  iconBtn: { width: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#E7EDF3', fontSize: 24, fontWeight: '700' },

  searchContainer: { paddingHorizontal: 8, backgroundColor: '#1C2E5C' },
  searchInput: { backgroundColor: '#FFF', borderRadius: 10, paddingLeft: 12, marginTop: 10, height: 40 },

  messagesContainer: { flex: 1, paddingHorizontal: 12, backgroundColor: '#1C2E5C' },
  row: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 6, gap: 8 },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },

  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#cfd8dc' },
  avatarFallback: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: '#b0bec5',
    alignItems: 'center', justifyContent: 'center'
  },
  avatarLetter: { color: '#1F2933', fontWeight: '700' },

  messageBubble: {
    padding: 8,
    borderRadius: 12,
    maxWidth: '75%',
    position: 'relative',
    paddingBottom: 18
  },
  rightBubble: { alignSelf: 'flex-end', backgroundColor: '#DDEAF6' },
  leftBubble: { alignSelf: 'flex-start', backgroundColor: '#E7EDF3' },

  highlightBubble: { borderWidth: 2, borderColor: '#007AFF' },

  username: { fontSize: 12, color: '#1F2933', fontWeight: '700', marginBottom: 2 },
  adminName: { color: '#007AFF' },

  quoteBox: {
    borderLeftWidth: 3, borderLeftColor: '#5A6B7A',
    backgroundColor: '#f1f5f9', paddingVertical: 4, paddingHorizontal: 6,
    borderRadius: 6, marginBottom: 6
  },
  quoteText: { fontSize: 12, color: '#334155' },

  messageImage: { width: 140, height: 140, borderRadius: 8, marginBottom: 6 },
  messageText: { fontSize: 16, color: '#000', paddingRight: 44 },

  timeText: {
    position: 'absolute',
    bottom: 2,
    right: 8,
    fontSize: 11,
    color: '#5A6B7A',
  },

  replyBanner: {
    backgroundColor: '#E7EDF3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  replyThumb: { width: 32, height: 32, borderRadius: 6, marginRight: 8 },
  replyBannerText: { color: '#1F2933', fontSize: 12, flex: 1, paddingRight: 8 },
  replyBannerClose: { color: '#1F2933', fontSize: 16 },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2E5C',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  iconButton: { marginHorizontal: 8 },
  input: {
    flex: 1, height: 40, backgroundColor: '#FFF',
    borderRadius: 10, paddingLeft: 12, fontSize: 16
  },
  sendButton: {
    backgroundColor: '#007AFF', paddingVertical: 8,
    paddingHorizontal: 16, borderRadius: 20, marginLeft: 8
  },
  sendButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  modalBackdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center', alignItems: 'center'
  },
  modalCard: {
    width: 260, backgroundColor: '#FFF', borderRadius: 12,
    paddingVertical: 8, paddingHorizontal: 10, elevation: 4
  },
  modalTitle: { fontSize: 14, color: '#111827', marginBottom: 6, fontWeight: '700' },
  modalItem: { paddingVertical: 10, paddingHorizontal: 8 },
  modalItemText: { fontSize: 16, color: '#111827' },
  modalCancel: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E7EB' },
  modalCancelText: { fontSize: 16, color: '#6B7280' },

  viewerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerImage: { width: '100%', height: '100%' },
});
