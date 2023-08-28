import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Keyboard,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { name: task, completed: false, editMode: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return updatedTasks;
    });
  };

  const toggleEditMode = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].editMode = !updatedTasks[index].editMode;
      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  const updateTaskName = (index, newName) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].name = newName;
      return updatedTasks;
    });
  };

  const renderTaskItem = ({ item, index }) => (
    <View style={styles.taskItem}>
      {item.editMode ? (
        <TextInput
          style={styles.editInput}
          value={item.name}
          onChangeText={(text) => updateTaskName(index, text)}
          autoFocus
          onBlur={() => toggleEditMode(index)}
          onSubmitEditing={Keyboard.dismiss}
        />
      ) : (
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedTask,
          ]}
          onPress={() => toggleEditMode(index)}
        >
          {item.name}
        </Text>
      )}
      <View style={styles.taskButtons}>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => toggleTaskCompletion(index)}
        >
          <Text style={styles.taskButtonText}>
            {item.completed ? 'Undo' : 'Done'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => deleteTask(index)}
        >
          <Text style={styles.taskButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.taskList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    color: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  taskButtons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  taskButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  taskButtonText: {
    color: '#fff',
  },
  editInput: {
    flex: 1,
    height: 20,
    color: '#fff',
  },
});