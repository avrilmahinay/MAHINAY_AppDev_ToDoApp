import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotesPage() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteKey, setEditNoteKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const addNote = () => {
    if (note.trim() === '') return;

    if (isEditing) {
      setNotes((prevNotes) =>
        prevNotes.map((item) =>
          item.key === editNoteKey ? { ...item, value: note } : item
        )
      );
      setIsEditing(false);
      setEditNoteKey(null);
    } else {
      setNotes([...notes, { key: Math.random().toString(), value: note }]);
    }

    setNote('');
    setModalVisible(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditNoteKey(null);
    setNote('');
    setModalVisible(false);
  };

  const editNote = (noteKey, noteValue) => {
    setIsEditing(true);
    setEditNoteKey(noteKey);
    setNote(noteValue);
    setModalVisible(true);
  };

  const removeNote = (noteKey) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.key !== noteKey));
  };

  const filteredNotes = notes.filter((note) =>
    note.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>{item.value}</Text>
      <View style={styles.noteActions}>
        <TouchableOpacity
          onPress={() => editNote(item.key, item.value)}
          style={styles.actionButton}
        >
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeNote(item.key)}
          style={styles.actionButton}
        >
          <Ionicons name="trash-outline" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.header}>Notes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search notes"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search-outline" size={24} color="#757575" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconAddNote}>
        <View style={styles.addButtonCircle}>
          <Ionicons name="add" size={36} color="#fff" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder={isEditing ? 'Edit your note' : 'Add a new note'}
              style={styles.modalInput}
              value={note}
              onChangeText={setNote}
            />
            <TouchableOpacity onPress={addNote} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {isEditing ? 'Update Note' : 'Add Note'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={cancelEdit} style={styles.modalCancel}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 10,
  },
  listContent: {
    flexGrow: 1,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
  },
  iconAddNote: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  addButtonCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancel: {
    marginTop: 20,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#F44336',
  },
});
