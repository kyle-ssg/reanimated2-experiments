import '@storybook/addon-ondevice-knobs/register';
import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

// import stories
export function setup(cb) {
  configure(() => {
    cb();
  }, module);
}

export const withSafeArea = (story) => (
  <SafeAreaView style={{ flex: 1, marginBottom: 80 }}>{story()}</SafeAreaView>
);

export const withPaddedContainer = (story) => (
  <Flex style={Styles.p5}>{story()}</Flex>
);

export const withScrollView = (story) => (
  <Flex style={[Styles.pt10]}>
    <ScrollView style={{ overflow: 'visible' }}>{story()}</ScrollView>
  </Flex>
);

export const getStory = (name) =>
  storiesOf(name, module).addDecorator(withKnobs).addDecorator(withSafeArea);

export default StorybookUIRoot;

const styles = ReactNative.StyleSheet.create({
  p5: {
    padding: 8,
  },
  p10: {
    padding: 16,
  },
});
