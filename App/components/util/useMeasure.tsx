import { useCallback, useState } from 'react';

export const useMeasure = (initialCb?: (size) => void): any => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback(
    (event) => {
      const newSize = event.nativeEvent.layout;
      if (size.width === 0) {
        initialCb && initialCb(newSize);
      }
      setSize(newSize);
    },
    [initialCb, size.width]
  );

  return [size, onLayout];
};
