import React, { Component } from 'react';
import 'react-native-globals';
import StorybookUIRoot, { getStory, setup } from './setup';
import WithSetValue from '../components/util/WithSetValue';
import BottomDrawer from '../components/BottomDrawer';
import Modal from '../components/Modal';
import SegmentedControl from '../components/SegmentedControl';
import { Styles } from '../styles/styles';
import Button from '../components/molecules/Button';
import { View, Text, Dimensions } from 'react-native';
import VerticalSlider from '../components/VerticalSlider';
import AnimationTester from '../components/molecules/AnimationTester';
const DeviceHeight = Dimensions.get('screen').height;
const items = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
];
setup(() => {
  getStory('Slider').add('all', () => {
    return (
      <View
        style={[{ flex: 1, backgroundColor: '#333' }, Styles.centeredContainer]}
      >
        <WithSetValue defaultValue={90}>
          {({ value, setValue, animatedValue }) => (
            <>
              <View style={{ height: 200, width: 80 }}>
                <VerticalSlider
                  min={0}
                  animatedValue={animatedValue}
                  max={100}
                  onChange={setValue}
                  step={10}
                  value={value}
                  innerStyle={{
                    backgroundColor: 'white',
                    width: 80,
                  }}
                  maskStyle={{ height: 200, width: 80, borderRadius: 16 }}
                  containerStyle={{
                    backgroundColor: 'black',
                  }}
                />
              </View>
              <AnimationTester animatedValue={animatedValue} />
              <Text>{value}</Text>
            </>
          )}
        </WithSetValue>
      </View>
    );
  });
  getStory('SegmentedControl').add('all', () => {
    return (
      <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
        <WithSetValue defaultValue={items[1]}>
          {({ value, setValue, animatedValue }) => (
            <>
              <SegmentedControl
                animatedValue={animatedValue}
                onChange={setValue}
                value={value}
                items={items}
              />
              <AnimationTester animatedValue={animatedValue} />
            </>
          )}
        </WithSetValue>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <WithSetValue defaultValue={items[2]}>
            {({ value, setValue }) => (
              <SegmentedControl
                paddingX={20}
                trackStyle={{
                  paddingHorizontal: 20,
                  backgroundColor: '#222',
                  height: 64,
                  paddingVertical: 10,
                }}
                textStyle={{ color: '#ccc' }}
                textPressedStyle={{ color: 'white' }}
                textActiveStyle={{ color: 'white' }}
                barStyle={{ backgroundColor: '#333' }}
                onChange={setValue}
                value={value}
                items={items}
              />
            )}
          </WithSetValue>
        </View>
        <SegmentedControl disabled items={items} value={items[1]} />
      </View>
    );
  });
  getStory('Bottom Drawer')
    .add('default', () => (
      <WithSetValue defaultValue={false}>
        {({ value, setValue, animatedValue }) => (
          <View style={Styles.p10}>
            <BottomDrawer
              animatedValue={animatedValue}
              height={DeviceHeight / 2}
              style={Styles.centeredContainer}
              onDismissPress={() => setValue(false)}
              visible={value}
            >
              <Text>Content</Text>
            </BottomDrawer>
            <Button onPress={() => setValue(true)}>
              {`Toggle Modal(${value})`}
            </Button>
            <AnimationTester animatedValue={animatedValue} />
          </View>
        )}
      </WithSetValue>
    ))
    .add('disable manual dismissing', () => (
      <WithSetValue defaultValue={false}>
        {({ value, setValue, animatedValue }) => (
          <View style={Styles.p10}>
            <BottomDrawer
              preventDismiss
              animatedValue={animatedValue}
              height={DeviceHeight / 2}
              style={Styles.centeredContainer}
              onDismissPress={() => setValue(false)}
              visible={value}
            >
              <Text>Content</Text>
              <Button onPress={() => setValue(false)}>{'Dismiss'}</Button>
            </BottomDrawer>
            <Button onPress={() => setValue(true)}>
              {`Toggle Modal(${value})`}
            </Button>
            <AnimationTester animatedValue={animatedValue} />
          </View>
        )}
      </WithSetValue>
    ));
  getStory('Modal')
    .add('default', () => (
      <WithSetValue defaultValue={false}>
        {({ value, setValue, animatedValue }) => (
          <View style={Styles.p10}>
            <Modal
              dark
              animatedValue={animatedValue}
              style={Styles.centeredContainer}
              onDismissPress={() => setValue(false)}
              visible={value}
            >
              <View
                style={[
                  { width: 200, height: 100, backgroundColor: 'white' },
                  Styles.centeredContainer,
                ]}
              >
                <Text>Modal content</Text>
              </View>
            </Modal>
            <AnimationTester animatedValue={animatedValue} />
            <Button onPress={() => setValue(true)}>
              {`Toggle Modal(${value})`}
            </Button>
          </View>
        )}
      </WithSetValue>
    ))
    .add('dont fade children with backdrop', () => (
      <WithSetValue defaultValue={false}>
        {({ value, setValue, animatedValue }) => (
          <View style={Styles.p10}>
            <Modal
              animatedValue={animatedValue}
              fadeContent={false}
              dark
              style={Styles.centeredContainer}
              onDismissPress={() => setValue(false)}
              visible={value}
            >
              <View
                style={{ width: 200, height: 100, backgroundColor: 'white' }}
              >
                <Text>Modal content</Text>
              </View>
            </Modal>
            <AnimationTester animatedValue={animatedValue} />
            <Button onPress={() => setValue(true)}>
              {`Toggle Modal(${value})`}
            </Button>
          </View>
        )}
      </WithSetValue>
    ));
});

export default StorybookUIRoot;
