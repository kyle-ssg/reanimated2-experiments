import { FunctionComponent } from 'react'; // we need this to make JSX compile
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
type ComponentType = {
  animatedValue: Animated.SharedValue<number>;
  inputRange: number[];
  outputRange: string[];
  children?: React.ReactNode;
  style?: ReactNative.ViewStyle;
  viewProps?: ReactNative.ViewProps;
};
import { StyleSheet } from 'react-native';

const AnimatedBackground: FunctionComponent<ComponentType> = ({
  animatedValue,
  inputRange,
  outputRange,
  style,
  viewProps,
  children,
}) => {
  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        // @ts-ignore
        inputRange,
        outputRange
      ),
    };
  });
  return (
    <Animated.View {...(viewProps || {})} style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedBackground;
