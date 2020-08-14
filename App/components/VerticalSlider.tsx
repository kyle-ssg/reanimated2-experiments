import { FunctionComponent, useEffect, useRef } from 'react'; // we need this to make JSY compile
import { StyleSheet, ViewStyle } from 'react-native';
import { View } from 'react-native';
import {
  interpolate,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import MaskedView from '@react-native-community/masked-view';
import Animated from 'react-native-reanimated';
import { clamp } from './util/clamp';
import { useMeasure } from './util/useMeasure';
import { toNearest } from './util/toNearest';
const throttle = require('lodash/throttle');
type ComponentType = {
  vertical?: boolean;
  containerStyle: ViewStyle;
  innerStyle: ViewStyle;
  animatedValue?: Animated.SharedValue<number>;
  maskStyle: ViewStyle;
  onChange: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
};

function updateValue(animatedWidth, animatedValue, value, min, max, height) {
  'worklet';
  if (animatedValue) {
    animatedValue.value = interpolate(value, [min, max], [0, 1]);
  }
  animatedWidth.value = height - ((value - min) / max) * height;
}

const Slider: FunctionComponent<ComponentType> = ({
  containerStyle,
  innerStyle,
  maskStyle,
  onChange,
  value = 0,
  step = 1,
  min = 0,
  max = 100,
  animatedValue,
}) => {
  const $gesture = useSharedValue(false);
  const $size = useSharedValue(0);
  const $min = useSharedValue(min);
  const $step = useSharedValue(step);
  const $max = useSharedValue(max);
  const animatedHeight = useSharedValue(Number.MAX_SAFE_INTEGER);

  const [size, onLayout] = useMeasure((initialSize) => {
    $size.value = initialSize.height;
    animatedHeight.value = interpolate(
      value,
      [$min.value, $max.value],
      [initialSize.height, 0]
    );
    animatedValue.value = interpolate(value, [$min.value, $max.value], [0, 1]);
  });

  useEffect(() => {
    if (size.height) {
      if (!$gesture.value) {
        runOnUI(updateValue)(
          animatedHeight,
          animatedValue,
          value,
          min,
          max,
          size.height
        );
      }
    }
  }, [animatedHeight, $gesture.value, animatedValue, value, min, max, size]);

  const throttledOnChange = useRef(throttle(onChange, 20));

  const animatedHeightStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animatedHeight.value }],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.offsetY = animatedHeight.value;
      $gesture.value = true;
    },
    onActive: (event, ctx) => {
      const val = clamp(ctx.offsetY + event.translationY, 0, $size.value);
      //
      animatedHeight.value = val;
      const value = interpolate(
        val,
        [0, $size.value],
        [$max.value, $min.value]
      );
      const rounded = toNearest(value, $step.value);
      if (animatedValue) {
        animatedValue.value = interpolate(
          value,
          [$min.value, $max.value],
          [0, 1]
        );
      }
      throttledOnChange.current(rounded);
    },
    onEnd: () => {
      $gesture.value = false;
    },
  });
  return (
    <MaskedView
      style={{ flex: 1, height: '100%' }}
      maskElement={<View style={[styles.mask, maskStyle]} />}
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View
          onLayout={onLayout}
          style={[styles.outer, containerStyle]}
        >
          <Animated.View
            style={[styles.inner, innerStyle, animatedHeightStyle]}
          />
        </Animated.View>
      </PanGestureHandler>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white', // can't be transparent
  },
  inner: {
    width: '100%',
    height: '100%',
  },
});

export default Slider;
