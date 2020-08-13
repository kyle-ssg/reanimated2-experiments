import { FunctionComponent, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'; // we need this to make JSX compile
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { modalConfig } from '../reanimations';

type ComponentType = {};
export type ModalType = {
  animatedValue?: Animated.SharedValue<number>;
  fadeContent?: boolean;
  visible: boolean;
  style: ReactNative.ViewStyle;
  onDismissPress?: () => void;
  preventDismiss?: boolean;
};

export type ModalInnerType = {
  fadeContent?: boolean;
  style: ReactNative.ViewStyle;
  onDismissPress?: () => void;
  children: React.ReactNode;
  opacityStyle: ReactNative.ViewStyle;
};

const ModalInner = gestureHandlerRootHOC(function GestureExample({
  style,
  onDismissPress,
  fadeContent,
  children,
  opacityStyle,
}: ModalInnerType) {
  // We do this in order to support gestures within the modal
  return (
    <View style={[style, StyleSheet.absoluteFill]}>
      <TouchableOpacity
        onPress={onDismissPress}
        activeOpacity={1}
        style={[StyleSheet.absoluteFill]}
      />
      {fadeContent ? (
        <Animated.View style={[style, opacityStyle]}>{children}</Animated.View>
      ) : (
        children
      )}
    </View>
  );
});
const CustomModal: FunctionComponent<ModalType> = ({
  animatedValue: _animatedValue,
  children,
  fadeContent = true,
  onDismissPress,
  preventDismiss,
  style,
  visible,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animationValue = _animatedValue || useSharedValue(0);

  useEffect(() => {
    if (!_animatedValue) {
      visible && setModalVisible(true);
      animationValue.value = withTiming(visible ? 1 : 0, modalConfig, () => {
        !visible && setModalVisible(false);
      });
    }
  }, [visible, _animatedValue, animationValue]);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: animationValue.value,
  }));
  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: animationValue.value,
  }));

  return (
    <Modal
      visible={_animatedValue ? visible : modalVisible}
      transparent={true}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.backdrop, opacityStyle2]} />
      <ModalInner
        onDismissPress={preventDismiss ? null : onDismissPress}
        opacityStyle={opacityStyle}
        style={style}
        fadeContent={fadeContent}
      >
        {children}
      </ModalInner>
    </Modal>
  );
};

type AppType = {};

export default CustomModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.25)',
  },
});
