import { FunctionComponent } from 'react'; // we need this to make JSX compile
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { StyleSheet, ViewStyle } from 'react-native';
type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
  style?: ViewStyle;
  colors: string[][];
};
const _AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedGradient: FunctionComponent<ComponentType> = ({ style }) => {
  //todo reanimated 2 colour interpolation not currently working
  return (
    <_AnimatedGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={[styles.linearGradient, style]}
    />
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AnimatedGradient;
