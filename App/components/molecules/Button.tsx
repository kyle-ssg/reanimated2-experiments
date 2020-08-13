import { Pressable, View, Text, TextStyle } from 'react-native';

import { FunctionComponent, useMemo } from 'react';

import { Styles } from '../../styles/styles';
type ComponentType = ReactNative.PressableProps & {
  children: string;
  textStyle: ReactNative.TextStyle;
  pressedStyle: ReactNative.ViewStyle;
};

const darkAndroidRipple: ReactNative.PressableAndroidRippleConfig = {
  color: 'rgba(0,0,0,.15)',
  borderless: false,
};

const Button: FunctionComponent<ComponentType> = ({
  disabled,
  android_ripple,
  children,
  style,
  pressedStyle,
  textStyle,
  ...rest
}) => {
  const groupStyles = useMemo(
    () => (style ? [Styles.buttonGroup, style] : Styles.buttonGroup),
    [style]
  );

  const pressedStyles = useMemo(
    () => [Styles.buttonGroup, Styles.buttonGroupPressed, style, pressedStyle],
    [pressedStyle, style]
  );

  const textStyles = useMemo(() => {
    // @ts-ignore
    const additionalTextStyles: TextStyle[] = textStyle?.length
      ? textStyle
      : [textStyle];
    return textStyle
      ? [Styles.buttonText, ...additionalTextStyles]
      : Styles.buttonText;
  }, [textStyle]);

  return (
    <View style={{ overflow: 'hidden' }}>
      <Pressable
        {...rest}
        // @ts-ignore
        style={({ pressed }) => (pressed ? pressedStyles : groupStyles)}
        disabled={disabled}
        android_ripple={android_ripple || darkAndroidRipple}
      >
        {typeof children === 'string' ? (
          <Text style={textStyles}>
            {children.length === 1 ? children[0] : children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
};

export default Button;
