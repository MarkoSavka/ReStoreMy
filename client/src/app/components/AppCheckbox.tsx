import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
}

const AppCheckbox: React.FC<Props> = ({ label, ...props }) => {
  const {
    field: { onChange, value, ref },
  } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => {
            onChange(e);
          }}
          inputRef={ref}
        />
      }
      label={label}
    />
  );
};

export default AppCheckbox;