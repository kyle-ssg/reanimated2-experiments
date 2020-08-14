import { FunctionComponent } from 'react'; // we need this to make JSX compile
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
};
import { StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  box: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 50,
    bottom: 50,
    backgroundColor: 'green',
  },
});

export default AnimationTester;
