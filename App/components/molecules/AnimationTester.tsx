import { FunctionComponent } from 'react'; // we need this to make JSX compile
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
  min?: number;
  max?: number;
};
import { StyleSheet } from 'react-native';

const AnimationTester: FunctionComponent<ComponentType> = ({
                                                             animatedValue,
                                                             min = 0,
                                                             max = 1,
                                                           }) => {
  const $min = useSharedValue(min);
  const $max = useSharedValue(max);
  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [$min.value, $max.value], [0, 1]),
      backgroundColor: interpolateColor(
          animatedValue.value,
          [min ,max],
          ["#ff3884", "#38ffb3"]
      ),
      transform: [
        {
          rotate:
              interpolate(
                  animatedValue.value,
                  [min, (max - min) / 2, max],
                  [0, 180, 360]
              ) + 'deg',
        },
      ],
    };
  });
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
