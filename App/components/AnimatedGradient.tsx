import { createRef, FunctionComponent, useState } from 'react'; // we need this to make JSX compile
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedProps,
  processColor,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import ReactNative, { Platform, StyleSheet, ViewStyle } from 'react-native';
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
  const [colors, setColors] = useState(undefined);
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

  const setColorAndroid = (colors) => {
    setColors(colors);
  };

  const animatedProps = useAnimatedProps(() => {
    let res;
    // uncomment for android fix
    // if (Platform.OS === 'android') {
    //   runOnJS(setColorAndroid)([
    //     backgroundColor1.value,
    //     backgroundColor2.value,
    //     backgroundColor3.value,
    //   ]);
    //   return {};
    // }

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
    return res;
  });
  return Platform.OS === 'android' ? (
    <LinearGradient
      {...(viewProps || {})}
      colors={colors}
      style={[styles.linearGradient, style]}
    >
      {children}
    </LinearGradient>
  ) : (
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
