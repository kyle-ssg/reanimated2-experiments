import React, { FunctionComponent, useState, useCallback } from 'react'; // we need this to make JSX compile
type RenderProps = {
  value: any;
  setValue: (any) => void;
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
  const render = useCallback(() => {
    return children({
      value,
      setValue,
    });
  }, [children, value, setValue]);
  return render();
};

export default WithSetValue;
