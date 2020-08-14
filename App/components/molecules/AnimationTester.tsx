import React, { FunctionComponent } from 'react'; // we need this to make JSX compile
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
};

const AnimationTester: FunctionComponent<ComponentType> = ({
  animatedValue,
}) => {
  const style = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
    transform: [
      {
        rotate:
          interpolate(animatedValue.value, [0, 0.5, 1], [0, 180, 360]) + 'deg',
      },
    ],
  }));
  return <Animated.View style={[styles.box, style]} />;
};

const styles = ReactNative.StyleSheet.create({
  box: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 50,
    top: 50,
    backgroundColor: 'green',
  },
});

export default AnimationTester;
