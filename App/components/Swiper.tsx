import {
  ReactNode,
  FunctionComponent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import {
  ScrollView,
  View,
  ScrollViewProps,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'; // we need this to make JSX compile
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useMeasure } from './util/useMeasure';
import { floorToNearest, toNearest } from './util/toNearest';
import AnimationTester from './molecules/AnimationTester';
type ComponentType = {
  style?: ViewStyle;
  slideStyle?: ViewStyle;
  scrollProps?: ScrollViewProps;
  index: number;
  children: ReactNode[];
  animatedValue?: Animated.SharedValue<number>;
  onChange: (value: number) => void;
};

const Swiper: FunctionComponent<ComponentType> = ({
  style,
  slideStyle,
  children,
  scrollProps = {},
  animatedValue,
  index,
  onChange,
}) => {
  const [size, onLayout] = useMeasure();
  const $size = useSharedValue(0);
  const $slideProgress = useSharedValue(0);
  const [initialised, setInitialised] = useState(false);
  const scrollViewRef = useRef<ScrollView>();
  useEffect(() => {
    if (size.width) {
      scrollViewRef.current.scrollTo({
        x: index * size.width,
        animated: initialised,
      });
      if (!initialised) {
        $size.value = size.width;
        setInitialised(true);
      }
    }
  }, [index, initialised, size]);
  const onEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const newIndex = event.nativeEvent.contentOffset.x / size.width;
      if (newIndex !== index) {
        onChange(newIndex);
      }
    },
    [onChange, size, index]
  );
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const max = event.contentSize.width - $size.value;
    const clampedOffset = Math.min(Math.max(0, event.contentOffset.x), max);
    const closestOffset = clampedOffset % $size.value;
    const progress = closestOffset ? closestOffset / $size.value : 0;
    $slideProgress.value = interpolate(progress, [0, 0.5, 1], [0, 1, 0]);
    if (animatedValue) {
      animatedValue.value = clampedOffset / max;
    }
  });
  return (
    <View onLayout={onLayout} style={[style]}>
      <Animated.ScrollView
        // @ts-ignore
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onEnd}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={size.width}
        pagingEnabled
        horizontal
        style={StyleSheet.absoluteFillObject}
        {...scrollProps}
      >
        {children.map((child, i) => (
          <View key={i} style={[styles.slide, { width: size.width }]}>
            <View
              style={[
                StyleSheet.absoluteFillObject,
                slideStyle,
                !initialised && styles.none,
              ]}
            >
              {child}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  none: {
    display: 'none',
  },
  slide: {
    backgroundColor: 'red',
    height: '100%',
  },
});
export default Swiper;
