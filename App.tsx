import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, View } from 'react-native';
import ListItem from './components/ListItem/ListItem';

export interface Task {
  title: string;
  index: number;
}

const TITLES = [
  'Here is a sample for swipe',
  'A delete functionality',
  'Leave a ⭐️ on the repository',
  'Making it easy for users',
  'Making the UI better 😎',
];

const TASKS: Task[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = '#FAFBFF';

export default function App() {
  const [tasks, setTasks] = useState(TASKS);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Tasks</Text>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map(task => (
          <ListItem task={task} key={task.index} />
        ))}
      </ScrollView>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  titleStyle: {
    fontSize: 60,
    marginLeft: '5%',
    marginVertical: 20,
  },
});
