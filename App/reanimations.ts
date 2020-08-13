// @ts-ignore
import { Easing } from 'react-native-reanimated';

export const modalConfig = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const drawerSlideInConfig = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

export const drawerSlideOutConfig = {
  duration: 300,
  easing: Easing.ease,
};
