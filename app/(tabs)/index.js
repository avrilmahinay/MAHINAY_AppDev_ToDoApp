import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskKey, setEditTaskKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const addTask = () => {
    if (task.trim() === '') return;

    if (isEditing) {
      setTaskList((prevTasks) =>
        prevTasks.map(item =>
          item.key === editTaskKey ? { ...item, value: task } : item
        )
      );
      setIsEditing(false);
      setEditTaskKey(null);
    } else {
      setTaskList([...taskList, { key: Math.random().toString(), value: task, completed: false }]);
    }
    setTask('');
    setModalVisible(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditTaskKey(null);
    setTask('');
    setModalVisible(false); 
  };

  const toggleComplete = (taskKey) => {
    setTaskList((prevTasks) =>
      prevTasks.map(task =>
        task.key === taskKey ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskKey) => {
    setTaskList((prevTasks) => prevTasks.filter(task => task.key !== taskKey));
  };

  const editTask = (taskKey, taskValue) => {
    setIsEditing(true);
    setEditTaskKey(taskKey);
    setTask(taskValue);
    setModalVisible(true);
  };

  const filteredTasks = taskList.filter((task) =>
    task.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleComplete(item.key)} style={styles.checkbox}>
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={25}
          color={item.completed ? '#ed34346' : '#F44336'} 
        />
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.value}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => editTask(item.key, item.value)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeTask(item.key)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#403f3f" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>To Do Lists</Text>
        </View>
        
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search tasks"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search-outline" size={24} color="#757575" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconAddTask}>
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
              placeholder={isEditing ? "Edit your task" : "Add a new task"}
              style={styles.modalInput}
              value={task}
              onChangeText={setTask}
            />
            <TouchableOpacity onPress={addTask} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>
                {isEditing ? "Update Task" : "Add Task"}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoIcon: {
    marginLeft: 0, 
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
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
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  listContent: {
    flexGrow: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  taskText: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkbox: {
    padding: 5,
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
  },
  iconAddTask: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
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

export default App;
