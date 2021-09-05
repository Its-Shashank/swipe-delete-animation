import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  'Here is a sample for swipe',
  'A delete functionality',
  'Leave a ⭐️ on the repository',
  'Making it easy for users',
  'Making the UI better 😎',
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
  const scrollRef = useRef(null);

  const onDismiss = useCallback((task: Task) => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Tasks</Text>
      <ScrollView style={{ flex: 1 }} ref={scrollRef}>
        {tasks.map(task => (
          <ListItem
            simultaneousHandlers={scrollRef}
            task={task}
            key={task.index}
            onDismiss={onDismiss}
          />
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
