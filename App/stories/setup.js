import '@storybook/addon-ondevice-knobs/register';
import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { SafeAreaView } from 'react-native';

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

export const getStory = (name) =>
  storiesOf(name, module).addDecorator(withKnobs).addDecorator(withSafeArea);

export default StorybookUIRoot;
