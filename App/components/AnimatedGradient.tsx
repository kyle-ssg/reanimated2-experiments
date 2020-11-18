import { FunctionComponent } from 'react'; // we need this to make JSX compile
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedProps,
  processColor,
  useDerivedValue,
} from 'react-native-reanimated';
import ReactNative, { StyleSheet, ViewStyle } from 'react-native';
import { interpolateColor } from 'react-native-redash';

type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
  inputRange: number[];
  outputRange: string[][];
  children?: React.ReactNode;
  style?: ReactNative.ViewStyle;
  viewProps?: ReactNative.ViewProps;
};

const _AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimatedGradient: FunctionComponent<ComponentType> = ({
  style,
  viewProps,
  inputRange,
  outputRange,
  children,
  animatedValue,
}) => {
  const backgroundColor1 = useDerivedValue(() => {
    return processColor(
      interpolateColor(
        animatedValue.value,
        inputRange,
        inputRange.map((v, index) => outputRange[index][0])
      )
    );
  });

  const backgroundColor2 = useDerivedValue(() => {
    return processColor(
      interpolateColor(
        animatedValue.value,
        inputRange,
        inputRange.map((v, index) => outputRange[index][1])
      )
    );
  });

  const backgroundColor3 = useDerivedValue(() => {
    return processColor(
      interpolateColor(
        animatedValue.value,
        inputRange,
        inputRange.map(
          (v, index) => outputRange[index][2] || outputRange[index][1]
        )
      )
    );
  });

  const animatedProps = useAnimatedProps(() => {
    let res;
    switch (outputRange[0].length) {
      case 2:
        res = {
          colors: [backgroundColor1.value, backgroundColor2.value],
        };
        break;
      default:
        res = {
          colors: [
            backgroundColor1.value,
            backgroundColor2.value,
            backgroundColor3.value,
          ],
        };
        break;
    }
    console.log(res)
    return res;
  });
  return (
    <_AnimatedGradient
      animatedProps={animatedProps}
      {...(viewProps || {})}
      style={[styles.linearGradient, style]}
    >
      {children}
    </_AnimatedGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AnimatedGradient;
