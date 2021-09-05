import React, { FC } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { Task } from '../../App';

interface ListItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: Task;
  onDismiss?: (task: Task) => void;
}

const LIST_ITEM_HEIGHT = 70;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem: FC<ListItemProps> = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: e => {
      translateX.value = e.translationX;
    },
    onEnd: () => {
      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
        return;
      }
      translateX.value = withTiming(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return {
      opacity,
    };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.tasksContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name='trash-alt'
          size={LIST_ITEM_HEIGHT * 0.4}
          color='red'
        />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  tasksContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: 20,
    // shadow for IOS
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    // shadow for android
    elevation: 5,
    borderRadius: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
