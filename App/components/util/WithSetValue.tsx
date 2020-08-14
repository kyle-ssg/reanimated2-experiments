import { FunctionComponent, useState } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated'; // we need this to make JSX compile
type RenderProps = {
  value: any;
  setValue: (any) => void;
  animatedValue: Animated.SharedValue<number>;
};

type ComponentType = {
  defaultValue: any;
  children: (props: RenderProps) => any;
};

const WithSetValue: FunctionComponent<ComponentType> = ({
  defaultValue,
  children,
}) => {
  const [value, setValue] = useState<any>(defaultValue);
  const animatedValue = useSharedValue(0);

  return children({
    value,
    setValue,
    animatedValue,
  });
};

export default WithSetValue;
