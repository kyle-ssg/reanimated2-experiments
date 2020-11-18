import React, { Component } from 'react';
import 'react-native-globals';
import StorybookUIRoot, { getStory, setup } from './setup';
import WithSetValue from '../components/util/WithSetValue';
import BottomDrawer from '../components/BottomDrawer';
import Modal from '../components/Modal';
import FastImage from 'react-native-fast-image';

import SegmentedControl from '../components/SegmentedControl';
import { Styles } from '../styles/styles';
import Button from '../components/molecules/Button';
import { View, Text, Dimensions, Image, ImageBackground } from 'react-native';
import VerticalSlider from '../components/VerticalSlider';
import AnimationTester from '../components/molecules/AnimationTester';
import Slider from '../components/Slider';
import Swiper from '../components/Swiper';
import AnimatedGradient from '../components/AnimatedGradient';
import { AnimatedBlur, AnimatedVibrancy } from '../components/AnimatedBlur';
import AnimatedOnOffImage from '../components/AnimatedOnOffImage';
import AnimatedBackground from '../components/AnimatedBackground';
const DeviceHeight = Dimensions.get('screen').height;
const items = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
];
setup(() => {
  getStory('Animated Gradient').add('all', () => {
    return (
      <View
        style={[{ flex: 1, backgroundColor: '#333' }, Styles.centeredContainer]}
      >
        <WithSetValue defaultValue={90}>
          {({ value, setValue, animatedValue }) => (
            <AnimatedGradient
              animatedValue={animatedValue}
              inputRange={[0, 0.5, 1]}
              outputRange={[
                ['#00349d', '#20e3b2', '#29ffc6'],
                ['#29ffc6', '#00349d', '#20e3b2'],
                ['#20e3b2', '#29ffc6', '#00349d'],
              ]}
              style={[
                { flex: 1, backgroundColor: '#333' },
                Styles.centeredContainer,
              ]}
            >
              <View style={{ height: 200, width: 60 }}>
                <VerticalSlider
                  min={0}
                  animatedValue={animatedValue}
                  max={100}
                  onChange={setValue}
                  step={10}
                  value={value}
                  innerStyle={{
                    backgroundColor: 'white',
                    width: 60,
                  }}
                  maskStyle={{ height: 200, width: 60, borderRadius: 16 }}
                  containerStyle={{
                    backgroundColor: 'black',
                  }}
                />
              </View>
            </AnimatedGradient>
          )}
        </WithSetValue>
      </View>
    );
  });
  getStory('Animated Background').add('all', () => {
    return (
      <View
        style={[{ flex: 1, backgroundColor: '#333' }, Styles.centeredContainer]}
      >
        <WithSetValue defaultValue={90}>
          {({ value, setValue, animatedValue }) => (
            <AnimatedBackground
              animatedValue={animatedValue}
              inputRange={[0, 0.5, 1]}
              outputRange={['#61a07a', '#fbd786', '#f7797d']}
              style={[
                ReactNative.StyleSheet.absoluteFillObject,
                Styles.centeredContainer,
              ]}
            >
              <View style={{ height: 200, width: 60 }}>
                <VerticalSlider
                  min={0}
                  animatedValue={animatedValue}
                  max={100}
                  onChange={setValue}
                  step={10}
                  value={value}
                  innerStyle={{
                    backgroundColor: 'white',
                    width: 60,
                  }}
                  maskStyle={{ height: 200, width: 60, borderRadius: 16 }}
                  containerStyle={{
                    backgroundColor: 'black',
                  }}
                />
              </View>

              <AnimationTester animatedValue={animatedValue} />
              <Text>{value}</Text>
            </AnimatedBackground>
          )}
        </WithSetValue>
      </View>
    );
  });
  getStory('Vibrancy').add('all', () => {
    return (
      <WithSetValue defaultValue={50}>
        {({ value, setValue, animatedValue }) => (
          <View style={StyleSheet.absoluteFill}>
            <View style={{ flex: 1 }}>
              <ImageBackground
                source={{
                  uri:
                    'https://kecbio.com/wallpaper/galaxy-space-iphone-background.jpg',
                }}
                style={StyleSheet.absoluteFill}
              >
                <AnimatedVibrancy
                  blurProps={{ blurType: 'light' }}
                  animatedValue={animatedValue}
                >
                  <Text>Hi, I am some vibrant text.</Text>
                </AnimatedVibrancy>
              </ImageBackground>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 10,
                alignSelf: 'center',
                width: 200,
              }}
            >
              <Slider
                min={0}
                max={100}
                step={10}
                animatedValue={animatedValue}
                onChange={setValue}
                value={value}
                innerStyle={{
                  backgroundColor: '#aaa',
                  width: 200,
                }}
                maskStyle={{
                  height: 10,
                  width: 200,
                  borderRadius: 16,
                }}
                containerStyle={{
                  borderWidth: StyleSheet.hairlineWidth,
                  padding: 1,
                  borderRadius: 16,
                  borderColor: '#eaeaea',
                  backgroundColor: '#f1f1f1',
                }}
              />
            </View>
          </View>
        )}
      </WithSetValue>
    );
  });
  getStory('Blur').add('all', () => {
    return (
      <WithSetValue defaultValue={50}>
        {({ value, setValue, animatedValue }) => (
          <View style={StyleSheet.absoluteFill}>
            <View style={{ flex: 1 }}>
              <Image
                source={{
                  uri:
                    'https://kecbio.com/wallpaper/galaxy-space-iphone-background.jpg',
                }}
                style={{
                  flex: 1,
                }}
              />
              <AnimatedBlur
                blurProps={{ blurType: 'light' }}
                animatedValue={animatedValue}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                height: 10,
                alignSelf: 'center',
                width: 200,
              }}
            >
              <Slider
                min={0}
                max={100}
                step={10}
                animatedValue={animatedValue}
                onChange={setValue}
                value={value}
                innerStyle={{
                  backgroundColor: '#aaa',
                  width: 200,
                }}
                maskStyle={{
                  height: 10,
                  width: 200,
                  borderRadius: 16,
                }}
                containerStyle={{
                  borderWidth: StyleSheet.hairlineWidth,
                  padding: 1,
                  borderRadius: 16,
                  borderColor: '#eaeaea',
                  backgroundColor: '#f1f1f1',
                }}
              />
            </View>
          </View>
        )}
      </WithSetValue>
    );
  });
  getStory('AnimatedOnOffImage').add('all', () => {
    return (
      <WithSetValue defaultValue={0}>
        {({ value, setValue, animatedValue }) => (
          <>
            <AnimatedOnOffImage animatedValue={animatedValue} />
            <View
              style={{
                marginTop: 10,
                height: 10,
                alignSelf: 'center',
                width: 200,
              }}
            >
              <Slider
                min={0}
                max={100}
                step={10}
                animatedValue={animatedValue}
                onChange={setValue}
                value={value}
                innerStyle={{
                  backgroundColor: '#aaa',
                  width: 200,
                }}
                maskStyle={{
                  height: 10,
                  width: 200,
                  borderRadius: 16,
                }}
                containerStyle={{
                  borderWidth: StyleSheet.hairlineWidth,
                  padding: 1,
                  borderRadius: 16,
                  borderColor: '#eaeaea',
                  backgroundColor: '#f1f1f1',
                }}
              />
            </View>
          </>
        )}
      </WithSetValue>
    );
  });
  getStory('Swiper').add('all', () => {
    return (
      <WithSetValue defaultValue={1}>
        {({ value, setValue, animatedValue }) => (
          <>
            <AnimatedGradient
              colors={[
                ['#ef32d9', '#e96443'],
                ['#89fffd', '#904e95'],
              ]}
              animatedValue={animatedValue}
            />
            <Swiper
              index={value}
              animatedValue={animatedValue}
              onChange={setValue}
              slideStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              style={{
                ...StyleSheet.absoluteFill,
              }}
            >
              <View style={Styles.centeredContainer}>
                <Button style={{ width: 100 }} onPress={() => setValue(1)}>
                  Next
                </Button>
              </View>
              <Text>1</Text>
              <Text>2</Text>
            </Swiper>
            <AnimationTester min={0} max={2} animatedValue={animatedValue} />
          </>
        )}
      </WithSetValue>
    );
  });
  getStory('Slider').add('all', () => {
    return (
      <View
        style={[{ flex: 1, backgroundColor: '#333' }, Styles.centeredContainer]}
      >
        <WithSetValue defaultValue={90}>
          {({ value, setValue, animatedValue }) => (
            <>
              <View style={{ height: 60, width: 200 }}>
                <Slider
                  min={0}
                  animatedValue={animatedValue}
                  max={100}
                  onChange={setValue}
                  step={10}
                  value={value}
                  innerStyle={{
                    backgroundColor: 'white',
                    width: 200,
                  }}
                  maskStyle={{ height: 60, width: 200, borderRadius: 16 }}
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
  getStory('Vertical Slider').add('all', () => {
    return (
      <View
        style={[{ flex: 1, backgroundColor: '#333' }, Styles.centeredContainer]}
      >
        <WithSetValue defaultValue={90}>
          {({ value, setValue, animatedValue }) => (
            <>
              <View style={{ height: 200, width: 60 }}>
                <VerticalSlider
                  min={0}
                  animatedValue={animatedValue}
                  max={100}
                  onChange={setValue}
                  step={10}
                  value={value}
                  innerStyle={{
                    backgroundColor: 'white',
                    width: 60,
                  }}
                  maskStyle={{ height: 200, width: 60, borderRadius: 16 }}
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
              <AnimatedGradient
                animatedValue={animatedValue}
                inputRange={[0, 1]}
                outputRange={[
                  ['#000', '#000'],
                  ['#333', '#000'],
                ]}
                style={[
                  { flex: 1, backgroundColor: '#333' },
                  Styles.centeredContainer,
                ]}
              />
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
