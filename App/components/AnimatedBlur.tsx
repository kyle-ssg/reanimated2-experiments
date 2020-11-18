import { FunctionComponent } from 'react'; // we need this to make JSX compile

import {
  BlurView as _BlurView,
  VibrancyView as _VibrancyView,
  BlurViewProperties,
  VibrancyViewProperties,
} from '@react-native-community/blur';
import { StyleSheet, ViewStyle } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

type BlurType = {
  blurProps?: BlurViewProperties;
  animatedValue: Animated.SharedValue<number>;
  style?: ViewStyle;
};

const VibrancyView = Animated.createAnimatedComponent(_VibrancyView);

const BlurView = Animated.createAnimatedComponent(_BlurView);

export const AnimatedBlur: FunctionComponent<BlurType> = ({
  animatedValue,
  children,
  style,
  blurProps,
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      blurAmount: interpolate(animatedValue.value, [0, 1], [0, 25]),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
    };
  });

  return (
    <BlurView
      style={[StyleSheet.absoluteFillObject, animatedStyle, style]}
      {...blurProps}
      animatedProps={animatedProps}
    >
      {children}
    </BlurView>
  );
};

type VibrancyType = {
  animatedValue: Animated.SharedValue<number>;
  vibrancyProps?: VibrancyViewProperties;
  style?: ViewStyle;
};

export const AnimatedVibrancy: FunctionComponent<VibrancyType> = ({
  vibrancyProps,
  children,
  style,
  animatedValue,
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      blurAmount: interpolate(animatedValue.value, [0, 1], [0, 25]),
    };
  });
  return (
    <VibrancyView
      style={[StyleSheet.absoluteFillObject, style]}
      {...vibrancyProps}
      animatedProps={animatedProps}
    >
      {children}
    </VibrancyView>
  );
};
