# React Native Reanimated 2 Experiments

Thanks to the library [React Native Reanimated V2](https://github.com/software-mansion/react-native-reanimated)

The aim of this repository is to create a set of animated / interactive components that conform to the following rules:

- Run on the UI layout without JS blocking
- Expose a configurable animationValue from 0 to 1 to support interpolation with your other components
- Fully customisable stylistically
- Interuptable, meaning that values can be set during an animation
- Any full screen takeovers must be wrapped in React's Modal to support native navigation bars
- Have 100% Android Parity without exception.
- Typescript props.
- Examples added via storybook.

Long term the aim is to release this as an NPM module, however React Native Reanimated 2 is still new and in beta.

# The components

- [x] Blur - animating the blur radius / amount from 0-20 based on an Animated shared value between 0 and 1
- [x] Swiper - A more modern version of https://github.com/leecade/react-native-swiper with animated progress
- [x] Slider - A horizontal slider with configurable min,max and step
- [x] VerticalSlider - Slider but vertical
- [x] SegmentedControl - iOS13 style segmented control
- [x] BottomDrawer - Gesture enabled drawer
- [x] Modal - A react modal with animated backdrop
- [ ] Drawer - A full screen left/right drawer that overlays the content
- [ ] Image - An image with a source controlled via an animation value
- [ ] Gradient - A gradient with animated colours
