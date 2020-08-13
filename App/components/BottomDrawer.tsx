import { FunctionComponent, useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useDerivedValue,
  withDecay,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import CustomModal from './Modal';
import { drawerSlideInConfig, drawerSlideOutConfig } from './util/reanimations';
import { Dimensions, StyleSheet } from 'react-native';
import { clamp } from './util/clamp';

export const closest = (value, values) => {
  'worklet';
  return values.reduce(function (prev, curr) {
    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
  });
};

export type ModalType = {
  animatedValue?: Animated.Value<number>;
  visible: boolean;
  preventDismiss: boolean;
  height: number;
  style: ReactNative.ViewStyle;
  onDismissPress?: () => void;
};

const BottomDrawer: FunctionComponent<ModalType> = ({
  animatedValue: _animatedValue,
  style,
  onDismissPress,
  visible,
  preventDismiss,
  height = Dimensions.get('window').height / 2,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const snapPoints = [0, height];
  const translateY = useSharedValue<number>(height);
  useEffect(() => {
    if (visible) {
      visible && setModalVisible(true);
      translateY.value = withTiming(snapPoints[0], drawerSlideInConfig);
    } else if (modalVisible) {
      translateY.value = withTiming(snapPoints[1], drawerSlideOutConfig, () => {
        setModalVisible(false);
      });
    }
  }, [visible, modalVisible, snapPoints, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedValue = useDerivedValue(() =>
    interpolate(
      translateY.value,
      [snapPoints[0], snapPoints[1]],
      [1, 0],
      Extrapolate.CLAMP
    )
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      console.log('Hey');
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, height);
    },
    onEnd: ({ velocityY }) => {
      const value = velocityY * 0.2 + translateY.value;
      const closestValue = closest(value, snapPoints);
      if (closestValue === snapPoints[0]) {
        translateY.value = withTiming(closestValue, drawerSlideInConfig);
      } else {
        translateY.value = withDecay(
          {
            velocity: Math.min(1200, Math.max(700, velocityY)),
            clamp: [snapPoints[0], snapPoints[1]],
          },
          () => {
            setModalVisible(false);
            onDismissPress();
          }
        );
      }
    },
  });

  return (
    <CustomModal
      controlled
      fadeContent={false}
      onDismissPress={onDismissPress}
      preventDismiss={preventDismiss}
      style={styles.container}
      animatedValue={animatedValue}
      visible={modalVisible}
    >
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View
          style={[styles.drawer, style, animatedStyle, { height }]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  drawer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
});

export default BottomDrawer;
