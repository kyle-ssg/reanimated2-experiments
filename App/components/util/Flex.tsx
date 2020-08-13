import React, { FunctionComponent } from 'react';
import { View } from 'react-native'; // we need this to make JSX compile

type ComponentType = {};

const TheComponent: FunctionComponent<ComponentType> = ({}) => {
  return (
    <View
      accessible={this.props.accessible}
      accessibilityLabel={this.props.accessibilityLabel}
      style={[
        this.props.style,
        { flex: this.props.value },
        this.props.space && { justifyContent: 'space-between' },
      ]}
      testID={this.props.testID}
    >
      {this.props.children}
    </View>
  );
};

export default TheComponent;
