import { FunctionComponent } from 'react'; // we need this to make JSX compile

import { Image, ImageProps, ImageStyle, StyleSheet } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

type ComponentType = {
  imageProps?: ImageProps;
  style?: ImageStyle;
  animatedValue: Animated.SharedValue<number>;
};
const AnimatedImage = Animated.createAnimatedComponent(Image);

const AnimatedOnOffImage: FunctionComponent<ComponentType> = ({
  imageProps,
  style,
  animatedValue,
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      source: {
        uri:
          animatedValue.value >= 0.5
            ? 'https://via.placeholder.com/350x150'
            : 'https://via.placeholder.com/100x100',
      },
    };
  });
  return (
    <AnimatedImage
      {...imageProps}
      style={[style, styles.image]}
      animatedProps={animatedProps}
    />
  );
};

export default AnimatedOnOffImage;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
