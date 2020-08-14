import { FunctionComponent, useCallback, useEffect, useRef } from 'react'; // we need this to make JSX compile
import { useMeasure } from './util/useMeasure';
import {
  Pressable,
  Text,
  TextStyle,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { easingConfigSlide } from './util/reanimations';
import { palette } from '../styles/palette';
import { clamp } from './util/clamp';

const CONTAINER_PADDING_Y = 6;
const CONTAINER_PADDING_X = 6;
const CONTAINER_HEIGHT = 44;
const CONTAINER_RADIUS = 8;

const SegmentText: FunctionComponent<SegmentItemType> = ({
  isActive,
  disabled,
  onChange,
  item,
  textStyle,
  textPressedStyle,
  textActiveStyle,
}) => {
  const onPress = useCallback(() => {
    onChange(item);
  }, [onChange, item]);

  return (
    <View style={styles.labelContainer}>
      <Pressable
        pointerEvents={isActive ? 'none' : 'auto'}
        disabled={disabled}
        onPress={onPress}
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.label,
              textStyle,
              pressed && styles.labelPressed,
              pressed && textPressedStyle,
              isActive && styles.labelActive,
              isActive && textActiveStyle,
            ]}
          >
            {item.label}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const SegmentedControl: FunctionComponent<SegmentControlType> = ({
  items,
  disabled,
  textStyle,
  textPressedStyle,
  textActiveStyle,
  animatedValue,
  barStyle,
  trackStyle,
  paddingX = CONTAINER_PADDING_X,
  paddingY = CONTAINER_PADDING_Y,
  value,
  onChange,
}) => {
  const initialised = useRef(false);
  const $containerWidth = useSharedValue(0);
  const $itemsLength = useSharedValue(0);
  const $sliderWidth = useSharedValue(0);
  const [size, onLayout] = useMeasure((initialSize) => {
    const initialWidth =
      size && (initialSize.width - paddingX * 2) * (1 / items.length);
    const index = items.findIndex((item) => item.value === value.value);
    const safeIndex = index === -1 ? 0 : index;
    sliderPosition.value = initialWidth * safeIndex;
    if (animatedValue) {
      animatedValue.value = interpolate(
        safeIndex,
        [0, items.length - 1],
        [0, 1]
      );
    }
    initialised.current = true;
    $containerWidth.value = initialSize.width;
    $itemsLength.value = items.length;
    $sliderWidth.value =
      initialSize && (initialSize.width - paddingX * 2) * (1 / items.length);
  });
  const sliderPosition = useSharedValue(-1);
  const sliderWidth = size && (size.width - paddingX * 2) * (1 / items.length);
  const index = items.findIndex((item) => item.value === value.value);
  useEffect(() => {
    const safeIndex = index === -1 ? 0 : index;
    const pos = sliderWidth * safeIndex;

    if (!sliderWidth) {
      return;
    }

    if (initialised.current) {
      sliderPosition.value = withTiming(pos, easingConfigSlide);
      if (animatedValue) {
        animatedValue.value = withTiming(
          interpolate(safeIndex, [0, items.length - 1], [0, 1]),
          easingConfigSlide
        );
      }
    } else {
      initialised.current = true;
      sliderPosition.value = pos;
    }
  }, [index, animatedValue, initialised, sliderPosition, sliderWidth]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderPosition.value }],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      const calculatedIndex = clamp(
        Math.floor((event.x / $containerWidth.value) * $itemsLength.value),
        0,
        $itemsLength.value - 1
      );

      const pos =
        $sliderWidth.value * (calculatedIndex === -1 ? 0 : calculatedIndex);
      if (pos !== sliderPosition.value) {
        onChange(items[calculatedIndex]);
      }
    },
  });

  return (
    <View
      style={[
        styles.track,
        disabled && styles.disabled,
        trackStyle,
        { paddingHorizontal: paddingX, paddingVertical: paddingY },
      ]}
      onLayout={onLayout}
    >
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={styles.flex}>
          {!!sliderWidth && (
            <View style={styles.barContainer}>
              <>
                <Animated.View
                  style={[
                    styles.bar,
                    barStyle,
                    {
                      width: sliderWidth,
                    },
                    slideStyle,
                  ]}
                />
                {items.map((item, i) => (
                  <SegmentText
                    disabled={disabled}
                    isActive={index === i}
                    item={item}
                    key={i}
                    onChange={onChange}
                    textActiveStyle={textActiveStyle}
                    textPressedStyle={textPressedStyle}
                    textStyle={textStyle}
                    value={value}
                  />
                ))}
              </>
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  track: {
    height: CONTAINER_HEIGHT,
    borderRadius: 8,
    paddingHorizontal: CONTAINER_PADDING_X,
    paddingVertical: CONTAINER_PADDING_Y,
    backgroundColor: palette.controlGrey,
    position: 'relative',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelContainer: {
    elevation: 11, // This is needed for android to place the labels above the bar
    flex: 1,
  },
  bar: {
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: CONTAINER_RADIUS,
    height: '100%',
    shadowColor: '#201C26',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  label: {
    lineHeight: 33,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: palette.text,
    opacity: 0.65,
  },
  labelActive: {
    color: palette.textHighlight,
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  labelPressed: {
    color: palette.textHighlight,
    opacity: 1,
  },
});

export default SegmentedControl;

type SegmentOption = { value: any; label: string };
type SegmentItemType = {
  isActive: boolean;
  value: any;
  item: any;
  disabled: boolean;
  textStyle?: TextStyle;
  textActiveStyle?: TextStyle;
  textPressedStyle?: TextStyle;
  onChange: (item: any) => any;
};
type BaseType = {
  value: any;
  onChange: (item: any) => void;
  disabled?: boolean;
  trackStyle?: ViewStyle;
  barStyle?: ViewStyle;
  textStyle?: TextStyle;
  textActiveStyle?: TextStyle;
  textPressedStyle?: TextStyle;
  paddingX?: number;
  paddingY?: number;
};
type SegmentLabelType = BaseType & { item: SegmentOption };
type SegmentControlType = BaseType & {
  items: SegmentOption[];
  animatedValue?: Animated.SharedValue<number>;
};
