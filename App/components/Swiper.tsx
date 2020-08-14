import { ReactNode, FunctionComponent, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  ScrollViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native'; // we need this to make JSX compile
import Animated from 'react-native-reanimated';
import { useMeasure } from './util/useMeasure';
type ComponentType = {
  style?: ViewStyle;
  slideStyle?: ViewStyle;
  scrollProps?: ScrollViewProps;
  index: number;
  children: ReactNode[];
  animatedValue?: Animated.SharedValue<number>;
};

const Swiper: FunctionComponent<ComponentType> = ({
  style,
  slideStyle,
  children,
  scrollProps = {},
  index,
}) => {
  const [size, onLayout] = useMeasure();
  const initialised = useRef(false);
  const scrollViewRef = useRef<ScrollView>();
  useEffect(() => {
    const animated = !initialised.current;
    initialised.current = true;
    scrollViewRef.current.scrollTo({ x: index * size.width, animated });
  }, [index, size]);
  return (
    <View onLayout={onLayout} style={[style, styles.container]}>
      <Animated.ScrollView
        // @ts-ignore
        ref={scrollViewRef}
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
          <View
            key={i}
            style={[styles.slide, { width: size.width }, slideStyle]}
          >
            {child}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  slide: {
    backgroundColor: 'red',
    height: '100%',
  },
});
export default Swiper;
