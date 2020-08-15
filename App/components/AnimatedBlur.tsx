import React, { FunctionComponent } from 'react'; // we need this to make JSX compile
import {
  BlurView as _BlurView,
  VibrancyView as _VibrancyView,
  BlurViewProperties,
} from '@react-native-community/blur';
import {Image, StyleSheet, ViewStyle} from 'react-native';
import { VibrancyViewProperties } from '@react-native-community/blur/index';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type BlurType = {
  blurProps?: BlurViewProperties;
  animatedValue: Animated.SharedValue<number>;
};

const VibrancyView = Animated.createAnimatedComponent(_VibrancyView);
const AnimatedImage = Animated.createAnimatedComponent(Image);

const BlurView = Animated.createAnimatedComponent(_BlurView);
export const AnimatedBlur: FunctionComponent<BlurType> = ({
  animatedValue,
}) => {
  const animatedProps = useAnimatedProps(() => {
    console.log(interpolate(animatedValue.value, [0, 1], [0, 25]));
    return {
      blurAmount: interpolate(animatedValue.value, [0, 1], [0, 25]),
    };
  });

  const style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
    };
  });

  return (
    <>
      <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        {...animatedProps}
        animatedProps={animatedProps}
      />
      <Animated.View style={[styles.box, style]} />
    </>
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
      blurRadius: interpolate(animatedValue.value, [0, 1], [0, 25]),
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
